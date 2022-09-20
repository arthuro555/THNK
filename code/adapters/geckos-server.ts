/// <reference path="../global.d.ts"/>
import type {
  geckos as GeckosType,
  GeckosServer,
  ServerChannel,
} from "@geckos.io/server";
import { async as StreamZip } from "node-stream-zip";
import { FollowResponse, wrap } from "follow-redirects";

const getSomeNums = () =>
  Math.random()
    .toFixed(Math.ceil(Math.random() * 6) + 2)
    .slice(2);

THNK.GeckosServerAdapter = class GeckosServerAdapter extends (
  THNK.ServerAdapter
) {
  ip: string;
  port: number;
  id = 0;
  server: GeckosServer | null = null;
  httpServer: import("http").Server | null = null;
  channels = new Map<string, ServerChannel>();
  constructor(ip: string, port: number) {
    super();
    this.ip = ip;
    this.port = port;
  }

  async prepare(runtimeScene: gdjs.RuntimeScene): Promise<void> {
    const electronRemote = runtimeScene
      .getGame()
      .getRenderer()
      .getElectronRemote();

    if (!electronRemote) {
      throw new Error(
        "The game does not seem to be running on a desktop, impossible to launch geckos server!"
      );
    }

    const electronRequire = electronRemote.require as (
      moduleNameOrPath: string
    ) => any;

    let geckos: typeof GeckosType | undefined;
    if (!runtimeScene.getGame().isPreview()) {
      geckos = electronRequire("@geckos.io/server").geckos as typeof GeckosType;
    } else {
      // On previews we need to download a prebuilt version of the module as it is not pre-installed
      const fs = electronRequire("fs") as typeof import("fs");
      if (!fs.existsSync("./geckos-server")) {
        console.info(`Geckos server not found, downloading it now!`);

        const {
          https: { get },
        } = wrap({ https: electronRequire("https") as typeof import("https") });
        const { pipeline } = electronRequire(
          "stream/promises"
        ) as typeof import("stream/promises");

        const response = (await new Promise((r) =>
          get(
            "https://s3.arthuro555.com/geckos-server-electron.zip",
            (response) => r(response as FollowResponse & NodeJS.ReadStream)
          )
        )) as NodeJS.ReadStream;

        await pipeline(response, fs.createWriteStream("./geckos-server.zip"));

        const zip = new StreamZip({ file: "./geckos-server.zip" });

        fs.mkdirSync("./geckos-server");
        await zip.extract(null, "./geckos-server");

        await zip.close();
      }
      geckos = electronRequire(
        process.cwd() + "/geckos-server/index.js"
      ).geckos;
    }
    if (!geckos) throw new Error("Geckos not found!");

    this.server = geckos({ label: "THNK" });

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

    this.httpServer = (
      electronRequire("http") as typeof import("http")
    ).createServer();
    this.server.addServer(this.httpServer);
    this.httpServer.listen(this.port);

    // Force close the server when closing the preview window
    const close = (e: BeforeUnloadEvent) => {
      e.returnValue = "false";
      this.close();
      window.removeEventListener("beforeunload", close);
      window.close();
    };
    window.addEventListener("beforeunload", close);
  }

  close() {
    if (this.server && this.httpServer) {
      this.httpServer.close();
      if (this.httpServer.closeAllConnections)
        this.httpServer.closeAllConnections();
      // Close current connections
      for (const connection of this.channels.values()) connection.close();
      // Clear everything out for GC
      this.channels.clear();
      // Close the HTTP server
      this.httpServer = null;
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
};
