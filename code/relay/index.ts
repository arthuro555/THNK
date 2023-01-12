import { geckos, ServerChannel as _ServerChannel } from "@geckos.io/server";
import * as z from "zod";

interface Room {
  gameID: string;
  roomID: string;
  server?: ServerChannel;
  clients: Map<string, ServerChannel>;
}

type Rooms = Map<string, Room>;

interface UserData {
  room: Room;
  server: boolean;
}

interface ServerChannel extends _ServerChannel {
  userData: UserData;
}

const authHeaderValidator = z.object({
  type: z.union([z.literal("server"), z.literal("client")]),
  gameID: z.string(),
  roomID: z.string(),
});

export type AuthHeader = z.infer<typeof authHeaderValidator>;

const roomsPerGame = new Map<string, Rooms>();
function getRoomsForGame(gameID: string) {
  let rooms = roomsPerGame.get(gameID);
  if (!rooms) roomsPerGame.set(gameID, (rooms = new Map()));
  return rooms;
}

function claimRoom(gameID: string, roomID: string): UserData {
  const rooms = getRoomsForGame(gameID);

  if (rooms.has(roomID)) {
    throw "The requested room ID has already been claimed!";
  }

  const newRoom: Room = {
    gameID,
    roomID,
    clients: new Map(),
  };

  rooms.set(roomID, newRoom);

  return { room: newRoom, server: true };
}

function joinRoom(gameID: string, roomID: string): UserData {
  const rooms = getRoomsForGame(gameID);
  const room = rooms.get(roomID);

  if (!room) {
    throw "The requested room does not exist!";
  }

  return { room, server: false };
}

function setupServer(server: ServerChannel) {
  const { room } = server.userData;
  room.server = server;

  server.on("msg", ({ to, data }: any) => {
    room.clients.get(to)?.raw.emit(data);
  });

  server.onDisconnect(() => closeRoom(room));
}

function setupClient(client: ServerChannel) {
  const { room } = client.userData;

  room.clients.set(client.id!, client);
  room.server?.emit("connect", { userID: client.id! });

  client.onRaw((rawMessage) => {
    // The message came from a client. We must sadly add the source of the message, hence why we do not use a raw message.
    // TODO: invetigate cost of doing this vs cost of copying the message to a new buffer of length n + 1
    //       to get an extra slot where to store the connection ID + the cost of slicing the message back
    //       into connection ID and message.
    room.server?.emit("msg", { from: client.id!, data: rawMessage });
  });

  client.onDisconnect(() => {
    room.server?.emit("disconnect", { userID: client.id! });
    leaveRoom(room, client);
  });
}

function leaveRoom(room: Room, client: ServerChannel): void {
  room.clients.delete(client.id!);
  client.close();
}

function closeRoom(room: Room): void {
  for (const clientConnection of room.clients.values())
    clientConnection.close();

  room.server?.close();

  // Unclaim the room.
  const gameRooms = roomsPerGame.get(room.gameID);
  if (gameRooms) gameRooms.delete(room.roomID);
}

const server = geckos({
  // We use a different label then the normal geckos adapter to prevent connection with the geckos client adapter.
  // The protocol is different and they are NOT compatible, despite using the same transport layer.
  label: "THNK-Relay",
  // This port range should still allow for multiple connections through node-datachannel multiplexing.
  portRange: { min: 9696, max: 9696 },
  // We obtain the game ID in advance, to know to what game rooms from that connection will belong.
  async authorization(auth): Promise<UserData | false> {
    const { type, gameID, roomID } = authHeaderValidator.parse(auth);
    if (type === "server") return claimRoom(gameID, roomID);
    if (type === "client") return joinRoom(gameID, roomID);

    // Should never happen thanks to zod, but
    return false;
  },
});

server.onConnection((_connection) => {
  // Override type information to contain the correct userData type
  const connection = _connection as ServerChannel;

  if (connection.userData.server) {
    setupServer(connection);
  } else {
    setupClient(connection);
  }
});

// The signaling server must run on port 6969, per convention.
server.listen(6969);
