/// <reference path="../types/global.d.ts"/>
import { geckos, type ClientChannel } from "@geckos.io/client";
import type { AuthHeader } from "relay";

const SERVER_URL = "https://vps.arthuro555.com";
//const SERVER_URL = "http://localhost";

THNK.RelayClientAdapter = class RelayClientAdapter extends THNK.ClientAdapter {
  connection: ClientChannel;

  connected: boolean = false;
  error?: Error;

  constructor(gameID: string, roomID: string) {
    super();
    this.connection = geckos({
      url: SERVER_URL,
      port: 6969,
      label: "THNK-Relay",
      authorization: JSON.stringify({
        type: "client",
        gameID,
        roomID,
      } as AuthHeader),
    });

    this.connection.onConnect((error) => {
      if (error) this.error = error;
      else this.connected = true;
    });
    this.connection.onDisconnect(() => this.onDisconnection());

    this.connection.onRaw((message) => this.onMessage(message as Uint8Array));
  }

  async prepare(): Promise<void> {
    if (this.error) throw this.error;
    if (this.connected) return;

    await new Promise<void>((resolve) => {
      let checkIfConnected: () => void;
      (checkIfConnected = () => {
        if (this.error) throw this.error;
        if (this.connected) return resolve();
        setTimeout(checkIfConnected, 500);
      })();
    });
  }

  close() {
    this.connection.close();
  }

  protected doSendMessage(message: Uint8Array): void {
    this.connection.raw.emit(
      message.buffer.slice(message.buffer.byteLength - message.byteLength)
    );
  }
};

THNK.RelayServerAdapter = class GeckosServerAdapter extends THNK.ServerAdapter {
  connection: ClientChannel;

  connected: boolean = false;
  error?: Error;

  constructor(gameID: string, roomID: string) {
    super();
    this.connection = geckos({
      url: SERVER_URL,
      port: 6969,
      label: "THNK-Relay",
      authorization: JSON.stringify({
        type: "server",
        gameID,
        roomID,
      } as AuthHeader),
    });

    this.connection.onConnect((error) => {
      if (error) this.error = error;
      else this.connected = true;
    });

    this.connection.on("msg", ({ from, data }: any) =>
      this.onMessage(from, data)
    );
    this.connection.on("connect", ({ userID }: any) =>
      this.onConnection(userID)
    );
    this.connection.on("disconnect", ({ userID }: any) =>
      this.onDisconnection(userID)
    );
  }

  async prepare(): Promise<void> {
    if (this.error) throw this.error;
    if (this.connected) return;

    await new Promise<void>((resolve) => {
      let checkIfConnected: () => void;
      (checkIfConnected = () => {
        if (this.error) throw this.error;
        if (this.connected) return resolve();
        setTimeout(checkIfConnected, 500);
      })();
    });
  }

  close() {
    this.connection.close();
  }

  protected doSendMessageTo(userID: string, message: Uint8Array): void {
    this.connection.emit("msg", {
      to: userID,
      data: message.buffer.slice(
        message.buffer.byteLength - message.byteLength
      ),
    });
  }

  getServerID(): string {
    return this.connection.id!;
  }
};
