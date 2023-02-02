import { App, type WebSocket } from "uWebSockets.js";
import { pino } from "pino";
import {
  createClientMessage,
  createConnectionMessage,
  createDisconnectionMessage,
} from "./messages";

// Create a logging instance
const logger = pino({
  level: "info",
  name: "THNK Relay",
});

interface Room {
  gameID: string;
  roomID: string;
  server: WebSocket<UserData>;
  clients: (WebSocket<UserData> | null)[];
  invalidated?: boolean;
}

type Rooms = Map<string, Room>;

interface UserData {
  roomID: string;
  gameID: string;
  room: Room;
}

interface ClientUserData extends UserData {
  id: number;
}

const roomsPerGame = new Map<string, Rooms>();
function getRoomsForGame(gameID: string) {
  let rooms = roomsPerGame.get(gameID);
  if (!rooms) roomsPerGame.set(gameID, (rooms = new Map()));
  return rooms;
}

const app = App();

app.ws<UserData>("/:gameID/:roomID/claim", {
  upgrade: (res, req, context) => {
    const gameID = req.getParameter(0);
    const roomID = req.getParameter(1);

    if (getRoomsForGame(gameID).has(roomID)) {
      // Unauthorized to claim an already claimed room
      res.writeStatus("401");
      return res.end();
    }

    // TODO: race condition?
    res.upgrade(
      { gameID, roomID },
      req.getHeader("sec-websocket-key"),
      req.getHeader("sec-websocket-protocol"),
      req.getHeader("sec-websocket-extensions"),
      context
    );
  },
  open: (ws) => {
    const data = ws.getUserData();
    const { gameID, roomID } = data;

    const newRoom: Room = {
      gameID,
      roomID,
      clients: [],
      server: ws,
    };

    getRoomsForGame(gameID).set(roomID, newRoom);
    data.room = newRoom;
    logger.info(`Room '${roomID}' created for game '${gameID}'`);
  },
  close: (ws) => {
    const { room, roomID, gameID } = ws.getUserData();

    room.invalidated = true;

    for (const client of room.clients.values()) {
      client?.end(1001, "Server closed");
    }

    getRoomsForGame(gameID).delete(roomID);
    logger.info(`Room '${roomID}' closed for game '${gameID}'`);
  },
  message: (ws, message, isBinary) => {
    const { room } = ws.getUserData();

    if (!isBinary) {
      logger.error(`Non-binary message received!`);
      return;
    }

    const view = new Uint8Array(message);
    room.clients[view[view.length - 1]]?.send(
      view.subarray(0, view.length - 1),
      true,
      false
    );
  },
});

app.ws<ClientUserData>("/:gameID/:roomID/join", {
  upgrade: (res, req, context) => {
    const gameID = req.getParameter(0);
    const roomID = req.getParameter(1);

    const room = getRoomsForGame(gameID).get(roomID);
    if (!room) {
      // Room not found
      res.writeStatus("404");
      return res.end();
    }

    res.upgrade(
      { gameID, roomID, room },
      req.getHeader("sec-websocket-key"),
      req.getHeader("sec-websocket-protocol"),
      req.getHeader("sec-websocket-extensions"),
      context
    );
  },
  open: (ws) => {
    const data = ws.getUserData();
    const { gameID, roomID, room } = data;

    data.id = room.clients.length;

    room.clients.push(ws);
    room.server.send(createConnectionMessage(data.id), true, false);
    logger.info(`Room '${roomID}' of '${gameID}' joined by '${data.id}'`);
  },
  close: (ws) => {
    const { room, roomID, gameID, id } = ws.getUserData();
    // Free connection memory
    room.clients[id] = null;
    if (room.invalidated) return;
    room.server.send(createDisconnectionMessage(id), true, false);
    logger.info(`Room '${roomID}' of '${gameID}' left by '${id}'`);
  },
  message: (ws, message, isBinary) => {
    const { room, id } = ws.getUserData();

    if (!isBinary) {
      logger.error(`Non-binary message received! Rejected.`);
      return;
    }

    // TODO: Investigate using multiple websocket connections with the server instead of storing client ID within the message
    room.server.send(
      createClientMessage(id, new Uint8Array(message)),
      true,
      false
    );
  },
});

app.listen(6969, () => {
  logger.info(`Server started`);
});
