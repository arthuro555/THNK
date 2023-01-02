import { geckos, ServerChannel } from "@geckos.io/server";

interface Room {
  roomID: string;
  server: ServerChannel;
  clients: Set<ServerChannel>;
}

type Rooms = Map<string, Room>;

interface UserData {
  roomsForCurrentGame: Rooms;
  currentRoom?: Room;
}

interface AuthHeader {
  // The game ID is used to make each game have their own set of rooms (game 1 cannot connect to a room of game 2).
  gameID: string;
  // Currently unused, but will be used to add presence and social features in the future.
  liluoToken: string;
}

const roomsPerGame = new Map<string, Rooms>();

function closeRoom(room: Room) {
  // Disconnect all clients...
  for (const _clientConnection of room.clients.values()) {
    const clientConnection: Omit<ServerChannel, "userData"> & {
      userData: UserData;
    } = _clientConnection;

    delete clientConnection.userData.currentRoom;
  }

  // Disconnect the server...
  const serverConnection: Omit<ServerChannel, "userData"> & {
    userData: UserData;
  } = room.server;

  delete serverConnection.userData.currentRoom;

  // ...and finally, unclaim the room.
  serverConnection.userData.roomsForCurrentGame.delete(room.roomID);
}

const server = geckos({
  // We use a different label then the normal geckos adapter to prevent connection with the geckos client adapter.
  // The protocol is different and they are NOT compatible, despite using the same transport layer.
  label: "THNK-Relay",
  // This port range should still allow for multiple connections through node-datachannel multiplexing.
  portRange: { min: 9696, max: 9696 },
  // We obtain the game ID in advance, to know to what game rooms from that connection will belong.
  async authorization(auth): Promise<UserData | false> {
    if (!auth) return false;
    try {
      var { gameID } = JSON.parse(auth) as AuthHeader;
    } catch (e) {
      console.error(
        "A connection has been blocked: Auth header is invalid JSON."
      );
      return false;
    }

    let roomsForCurrentGame = roomsPerGame.get(gameID);
    // If this game doesn't has a rooms map already, create one.
    if (!roomsForCurrentGame)
      roomsPerGame.set(gameID, (roomsForCurrentGame = new Map()));

    // We persist the rooms map of the current game to user data to get rid of costly map lookups when connecting to a room
    return { roomsForCurrentGame };
  },
});

server.onConnection((_connection) => {
  // Override type information to contain the correct user data type
  const connection: Omit<ServerChannel, "userData"> & { userData: UserData } =
    _connection;

  connection.on("claim", (roomID) => {
    if (typeof roomID !== "string") return;
    if (connection.userData.roomsForCurrentGame.has(roomID)) {
      connection.emit(
        "error",
        "The requested room ID has already been claimed!"
      );
      return;
    }

    if (connection.userData.currentRoom)
      closeRoom(connection.userData.currentRoom);

    const newRoom: Room = {
      roomID,
      // Use the unmodified connection type here to workaround bad typings
      server: _connection,
      clients: new Set(),
    };

    connection.userData.roomsForCurrentGame.set(roomID, newRoom);
    connection.userData.currentRoom = newRoom;
  });

  connection.on("join", (roomID) => {
    if (typeof roomID !== "string") return;
    const room = connection.userData.roomsForCurrentGame.get(roomID);
    if (!room) return;
    if (connection.userData.currentRoom)
      closeRoom(connection.userData.currentRoom);

    // Use the unmodified connection type here to workaround bad typings
    room.clients.add(_connection);
    connection.userData.currentRoom = room;
  });

  connection.onRaw((rawMessage) => {
    const room = connection.userData.currentRoom;
    if (!room) return;
    if (room.server === connection) {
      // The message comes from the registered host: forward to all clients directly.
      for (const client of room.clients.values()) {
        client.raw.emit(rawMessage);
      }
    } else {
      // The message came from a client. We must sadly add the source of the message, hence why we do not use a raw message.
      // TODO: invetigate cost of doing this vs cost of copying the message to a new buffer of length n + 1
      //       to get an extra slot where to store the connection ID + the cost of slicing the message back
      //       into connection ID and message.
      server.emit("msg", { from: connection.id, message: rawMessage });
    }
  });

  connection.onDisconnect(() => {
    // If this client had a claimed room, unclaim it.
    if (connection.userData.currentRoom)
      closeRoom(connection.userData.currentRoom);
  });
});

// The signaling server must run on port 6969, per convention.
server.listen(6969);
