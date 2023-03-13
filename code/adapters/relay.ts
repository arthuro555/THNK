/// <reference path="../types/global.d.ts"/>
/// <reference path="./relay.d.ts"/>
import { MessagesForServer } from "relay/src/messages";

THNK.RELAY_SERVER_URL = "ws://relay.thnk.cloud:6969";

THNK.RelayClientAdapter = class RelayClientAdapter extends THNK.ClientAdapter {
  private connection: WebSocket;
  public readonly roomID: string;

  constructor(gameID: string, roomID: string) {
    super();
    this.roomID = roomID;
    this.connection = new WebSocket(
      `${THNK.RELAY_SERVER_URL}/${gameID}/${roomID}/join`
    );
  }

  async prepare(): Promise<void> {
    this.connection.onclose = () => this.onDisconnection();

    this.connection.onmessage = async ({ data }) =>
      this.onMessage(await data.arrayBuffer());

    await new Promise<void>((resolve) => {
      this.connection.onopen = () => resolve();
    });
  }

  close() {
    this.connection.close();
  }

  protected doSendMessage(message: Uint8Array): void {
    this.connection.send(
      message.buffer.slice(message.buffer.byteLength - message.byteLength)
    );
  }
};

THNK.RelayServerAdapter = class GeckosServerAdapter extends THNK.ServerAdapter {
  private connection: WebSocket;
  public readonly roomID: string;

  constructor(gameID: string, roomID: string) {
    super();
    this.roomID = roomID;
    this.connection = new WebSocket(
      `${THNK.RELAY_SERVER_URL}/${gameID}/${roomID}/claim`
    );

    this.connection.onmessage = async ({ data }) => {
      console.log(data);
      if (!(data instanceof Blob))
        return console.error(data, " is not a Blob!");

      const message = new Uint8Array(await data.arrayBuffer());
      if (message.length < 2)
        return console.error("Message too small! ", message);

      const messageType = message[message.length - 1];
      switch (messageType) {
        case MessagesForServer.ClientMessage:
          if (message.length < 3)
            return console.error("Message too small! ", message);
          this.onMessage(
            message[message.length - 2].toString(),
            message.subarray(0, message.length - 2)
          );
          break;
        case MessagesForServer.Connection:
          this.onConnection(message[0].toString());
          break;
        case MessagesForServer.Disconnection:
          this.onDisconnection(message[0].toString());
          break;
        default:
          console.error("Unrecognized message type: ", messageType);
      }
    };
  }

  async prepare(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.connection.onopen = () => {
        this.connection.onopen = null;
        resolve();
      };
    });
  }

  close() {
    this.connection.close();
  }

  protected doSendMessageTo(userID: string, message: Uint8Array): void {
    const extendedMessage = new Uint8Array(message.byteLength + 1);

    extendedMessage.set(
      message,
      message.buffer.byteLength - message.byteLength
    );
    extendedMessage[message.byteLength] = parseInt(userID, 10);

    this.connection.send(extendedMessage);
  }

  getServerID(): string {
    return "-1";
  }
};
