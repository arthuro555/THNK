/// <reference path="../types/global.d.ts"/>
import type {
  geckos as GeckosType,
  GeckosServer,
  ServerChannel,
} from "@geckos.io/server";
import type { FollowResponse } from "follow-redirects";

const getSomeNums = () =>
  Math.random()
    .toFixed(Math.ceil(Math.random() * 6) + 2)
    .slice(2);

const logger = new gdjs.Logger("THNK - Geckos adapter");

THNK.GeckosServerAdapter = class GeckosServerAdapter extends (
  THNK.ServerAdapter
) {
  port: number;
  id = 0;
  server: GeckosServer | null = null;
  httpServer: import("http").Server | null = null;
  channels = new Map<string, ServerChannel>();
  serverID = `${getSomeNums()}-server-${getSomeNums()}`;
  constructor(port: number) {
    super();
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

    const electronRequire = electronRemote.require as <T>(
      moduleNameOrPath: string
    ) => T;

    let geckos: typeof GeckosType | undefined;
    if (!runtimeScene.getGame().isPreview()) {
      geckos = electronRequire<{ geckos: typeof GeckosType }>(
        "@geckos.io/server"
      ).geckos;
    } else {
      // On previews we need to download a prebuilt version of the module as it is not pre-installed
      const fs = electronRequire<typeof import("fs")>("fs");
      const path = electronRequire<typeof import("path")>("path");
      const { app } = electronRequire<{
        app: { getPath: (type: "userData" | "temp") => string };
      }>("electron");
      //@ts-ignore
      const { async: StreamZip } = await import("node-stream-zip");
      //@ts-ignore
      const { wrap } = await import("follow-redirects");

      const geckosFolderPath = path.join(
        app.getPath("userData"),
        "geckos-server"
      );
      const geckosIndexPath = path.join(geckosFolderPath, "index.js");
      if (!fs.existsSync(geckosIndexPath)) {
        const https = electronRequire("https") as typeof import("https");
        const {
          https: { get },
        } = wrap({ https });
        const { pipeline } = electronRequire(
          "stream/promises"
        ) as typeof import("stream/promises");

        logger.info(`Geckos server not found, downloading it now!`);

        const geckosDownloadPath = path.join(
          app.getPath("temp"),
          "geckos-server.zip"
        );

        const response = (await new Promise((r) =>
          get(
            "https://s3.arthuro555.com/geckos-server-electron.zip",
            (response) => r(response as FollowResponse & NodeJS.ReadStream)
          )
        )) as NodeJS.ReadStream;

        await pipeline(response, fs.createWriteStream(geckosDownloadPath));

        const zip = new StreamZip({ file: geckosDownloadPath });

        fs.mkdirSync(geckosFolderPath, { recursive: true });
        await zip.extract(null, geckosFolderPath);

        await zip.close();
      }

      geckos = electronRequire<{ geckos: typeof GeckosType }>(
        geckosIndexPath
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

      channel.on("error", (err) => logger.error("Channel error! ", err));
      channel.webrtcConnection.on("error", (err) =>
        logger.error("WebRTC error! ", err)
      );
      channel.dataChannel.onError((err) =>
        logger.error("Datachannel error! ", err)
      );
      channel.onRaw((message) => this.onMessage(id, message as Uint8Array));
      channel.onDisconnect(() => {
        this.onDisconnection(id);
        this.channels.delete(id);
      });
    });

    this.httpServer = (
      electronRequire("http") as typeof import("http")
    ).createServer();
    this.httpServer.on("error", (err) =>
      logger.error("HTTP server error! ", err)
    );
    this.httpServer.on("clientError", (err) =>
      logger.error("HTTP server client-error! ", err)
    );
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
    return this.serverID;
  }

  getServerIP() {
    const address = this.httpServer?.address();
    return typeof address === "string"
      ? address
      : address?.address ?? "unknown ip";
  }

  getServerPort() {
    const address = this.httpServer?.address();

    return (typeof address !== "string" && address?.port) || this.port;
  }
};
