/// <reference path="../global.d.ts"/>
import {
  geckos,
  iceServers,
  type GeckosServer,
  type ServerChannel,
} from "@geckos.io/server";

const getSomeNums = () =>
  Math.random()
    .toFixed(Math.ceil(Math.random() * 6) + 2)
    .slice(2);

export class GeckosClientAdapter extends THNK.ServerAdapter {
  ip: string;
  port: number;
  id = 0;
  server: GeckosServer | null = null;
  channels = new Map<string, ServerChannel>();
  constructor(ip: string, port: number) {
    super();
    this.ip = ip;
    this.port = port;
  }

  async prepare(): Promise<void> {
    this.server = geckos({ iceServers, label: "THNK" });

    this.server.onConnection((channel) => {
      // Generate a simple ID that is certainly unique,
      // yet not easily guessable (as that can open up
      // an attack vector in some cases)
      const id = `${getSomeNums()}-${this.id++}-${getSomeNums()}`;
      this.onConnection(id);
      this.channels.set(id, channel);

      channel.onRaw((message) => this.onMessage(id, message as Uint8Array));
      channel.onDisconnect(() => this.onDisconnection(id));
    });

    this.server.listen(this.port);
  }

  close() {
    if (this.server) {
      // Close the HTTP server
      this.server.server.close();
      // Close current connections
      for (const connection of this.channels.values()) connection.close();
      // Clear everything out for GC
      this.channels.clear();
      this.server = null;
    }
  }

  protected doSendMessageTo(userID: string, message: Uint8Array): void {
    const connection = this.channels.get(userID);
    if (connection) {
      connection.raw.emit(
        message.buffer.slice(message.buffer.byteLength - message.byteLength)
      );
    }
  }

  getServerID(): string {
    return `${getSomeNums()}-server-${getSomeNums()}`;
  }
}
