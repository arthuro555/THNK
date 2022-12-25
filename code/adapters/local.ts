/// <reference path="../types/global.d.ts"/>
namespace THNK {
  const logger = new gdjs.Logger("THNK - Local Testing Adapter");
  if (!globalThis.BroadcastChannel)
    logger.error(
      "This browser does not support the local adapter - please try using another adapter! (Prepare for an error)"
    );
  const bc = new BroadcastChannel("thnk-local-server");
  bc.addEventListener("messageerror", (e) =>
    logger.error("An error occured while sending a message!", e)
  );
  const ownID = "" + Date.now() + Math.random() * 1000;

  type MessageTypes =
    | {
        message: "msg-for-client";
        data: Uint8Array;
        for: string;
      }
    | { message: "msg-for-server"; data: Uint8Array; from: string }
    | { message: "disconnect"; from: string }
    | { message: "connect"; from: string };

  export class LocalClientAdapter extends THNK.ClientAdapter {
    private onBCMessage({ data }: MessageEvent<MessageTypes>) {
      if (data.message === "msg-for-client" && data.for === ownID)
        this.onMessage(data.data);
    }
    private boundOnBCMessage = this.onBCMessage.bind(this);

    async prepare(runtimeScene: gdjs.RuntimeScene): Promise<void> {
      bc.addEventListener("message", this.boundOnBCMessage);
      bc.postMessage({ message: "connect", from: ownID } as MessageTypes);
      window.addEventListener("beforeunload", () => this.close());
    }

    close() {
      bc.postMessage({ message: "disconnect", from: ownID } as MessageTypes);
      bc.removeEventListener("message", this.boundOnBCMessage);
    }

    protected doSendMessage(message: Uint8Array): void {
      bc.postMessage({
        message: "msg-for-server",
        data: message,
        from: ownID,
      } as MessageTypes);
    }
  }

  export class LocalServerAdapter extends THNK.ServerAdapter {
    private onBCMessage({ data }: MessageEvent<MessageTypes>) {
      if (data.message === "msg-for-server")
        this.onMessage(data.from, data.data);
      else if (data.message === "connect") this.onConnection(data.from);
      else if (data.message === "disconnect") this.onDisconnection(data.from);
    }
    private boundOnBCMessage = this.onBCMessage.bind(this);

    async prepare(): Promise<void> {
      bc.addEventListener("message", this.boundOnBCMessage);
      window.addEventListener("beforeunload", () => this.close());
    }

    close() {
      bc.removeEventListener("message", this.boundOnBCMessage);
    }

    protected doSendMessageTo(userID: string, message: Uint8Array): void {
      bc.postMessage({
        message: "msg-for-client",
        data: message.buffer.slice(
          message.buffer.byteLength - message.byteLength
        ),
        for: userID,
      } as MessageTypes);
    }

    getServerID(): string {
      return ownID;
    }
  }
}
