/// <reference path="../types/global.d.ts"/>
namespace THNK {
  const logger = new gdjs.Logger("THNK - P2P Adapter");
  class P2PConnectionAwaiter extends gdjs.AsyncTask {
    peerID: string;
    constructor(peerID: string) {
      super();
      this.peerID = peerID;
    }
    update(): boolean {
      return !!gdjs.evtTools.p2p.getConnectionInstance(this.peerID);
    }
  }

  export class P2PClientAdapter extends THNK.ClientAdapter {
    peerID: string;
    connection: Peer.DataConnection<ArrayBuffer> | null = null;
    constructor(peerID: string) {
      super();
      this.peerID = peerID;
    }

    boundPreEventsCallback = () => this.preEventsCallback();

    preEventsCallback() {
      if (!gdjs.evtTools.p2p.getConnectionInstance(this.peerID)) {
        this.onDisconnection();
      }
    }

    async prepare(runtimeScene: gdjs.RuntimeScene): Promise<void> {
      this.connection = gdjs.evtTools.p2p.getConnectionInstance(
        this.peerID
      ) as Peer.DataConnection<ArrayBuffer> | null;

      if (!this.connection) {
        gdjs.evtTools.p2p.connect(this.peerID);

        this.connection = await new Promise<Peer.DataConnection<ArrayBuffer>>(
          (resolve) => {
            runtimeScene
              .getAsyncTasksManager()
              .addTask(new P2PConnectionAwaiter(this.peerID), () =>
                resolve(
                  gdjs.evtTools.p2p.getConnectionInstance(
                    this.peerID
                  ) as Peer.DataConnection<ArrayBuffer>
                )
              );
          }
        );
      }

      this.connection.on("data", (data) =>
        this.onMessage(new Uint8Array(data))
      );

      gdjs.registerRuntimeScenePreEventsCallback(this.boundPreEventsCallback);
    }

    close() {
      gdjs.evtTools.p2p.disconnectFromPeer(this.peerID);
      gdjs._unregisterCallback(this.boundPreEventsCallback);
    }

    protected doSendMessage(message: Uint8Array): void {
      if (!this.connection) {
        return logger.error(
          "Tried to send a message on an unestablished connection!"
        );
      }
      this.connection.send(
        message.buffer.slice(message.buffer.byteLength - message.byteLength)
      );
    }
  }

  export class P2PServerAdapter extends THNK.ServerAdapter {
    boundPreEventsCallback = () => this.preEventsCallback();

    preEventsCallback() {
      if (gdjs.evtTools.p2p.onConnection()) {
        const connectedPeer = gdjs.evtTools.p2p.getConnectedPeer();
        this.onConnection(connectedPeer);

        const connectionInstance = gdjs.evtTools.p2p.getConnectionInstance(
          connectedPeer
        ) as Peer.DataConnection<ArrayBuffer>;
        connectionInstance.on("data", (data: ArrayBuffer) => {
          this.onMessage(connectedPeer, new Uint8Array(data));
        });
      }

      if (gdjs.evtTools.p2p.onDisconnect()) {
        const disconnectedPeer = gdjs.evtTools.p2p.getDisconnectedPeer();
        this.onDisconnection(disconnectedPeer);
      }
    }

    async prepare(): Promise<void> {
      gdjs.registerRuntimeScenePreEventsCallback(this.boundPreEventsCallback);
    }

    close() {
      gdjs._unregisterCallback(this.boundPreEventsCallback);
    }

    protected doSendMessageTo(userID: string, message: Uint8Array): void {
      const connection = gdjs.evtTools.p2p.getConnectionInstance(userID);
      if (connection) {
        connection.send(
          message.buffer.slice(message.buffer.byteLength - message.byteLength)
        );
      }
    }

    getServerID(): string {
      return gdjs.evtTools.p2p.getCurrentId();
    }
  }
}
