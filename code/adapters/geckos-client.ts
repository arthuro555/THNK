/// <reference path="../global.d.ts"/>
import { geckos, type ClientChannel } from "@geckos.io/client";

const logger = new gdjs.Logger("THNK - Geckos.io Adapter");

export class GeckosClientAdapter extends THNK.ClientAdapter {
  ip: string;
  port: number;
  connection: ClientChannel | null = null;
  constructor(ip: string, port: number) {
    super();
    this.ip = ip;
    this.port = port;
  }

  async prepare(): Promise<void> {
    this.connection = geckos({ url: this.ip, port: this.port, label: "THNK" });
    await new Promise<void>((resolve, reject) =>
      this.connection!.onConnect((error) => {
        if (error) return reject(error.message);
        this.connection!.onRaw((message) =>
          this.onMessage(message as Uint8Array)
        );
        this.connection!.onDisconnect(() => this.onDisconnection());
        resolve();
      })
    );
  }

  close() {
    if (this.connection) this.connection.close();
  }

  protected doSendMessage(message: Uint8Array): void {
    if (!this.connection) {
      return logger.error(
        "Tried to send a message on an unestablished connection!"
      );
    }
    this.connection.raw.emit(
      message.buffer.slice(message.buffer.byteLength - message.byteLength)
    );
  }
}
