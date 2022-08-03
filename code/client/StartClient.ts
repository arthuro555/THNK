import { type ClientAdapter } from "../Adapter";
import { ServerMessage, ServerMessageContent } from "../t-h-n-k";
import { ConnectionStartMessage } from "../t-h-n-k/connection-start-message";
import { applyGameStateSnapshotToScene } from "./ApplyGameStateSnapshot";
import { sendConnectionRequest } from "./ClientMessageSender";
import { setConnectionState } from "./ClientConnectionState";

const logger = new gdjs.Logger("THNK - Client");
const fail = (reason: string) => {
  setConnectionState("failed");
  logger.error("Connection failed: " + reason);
};

export const startClient = async (
  runtimeScene: gdjs.RuntimeScene,
  adapter: ClientAdapter
) => {
  setConnectionState("connecting");
  const sceneStack = runtimeScene.getGame().getSceneStack();
  try {
    await adapter.prepare(runtimeScene);
  } catch {
    fail("Adapter crashed while starting server!");
    // Abort server startup
    return;
  }

  setConnectionState("loading");
  sendConnectionRequest(adapter);

  const intervalID = setInterval(() => {
    const message = (adapter.getPendingMessages() as ServerMessage[]).shift();
    if (!message) return;
    const messageType = message.contentType();
    if (messageType === ServerMessageContent.ConnectionStartMessage) {
      clearInterval(intervalID);
      const connectionStartMessage = message.content(
        new ConnectionStartMessage()
      ) as ConnectionStartMessage;

      const sceneName = connectionStartMessage.sceneName();
      const sceneSnapshot = connectionStartMessage.sceneSnapshot();
      if (!sceneName || !sceneSnapshot) {
        fail(
          "Server Connection Start Message was invalid, couldn't finish setting up the connection."
        );
        return;
      }

      const newScene = sceneStack.replace(sceneName, true);
      newScene.thnkClient = {
        adapter,
      };

      applyGameStateSnapshotToScene(sceneSnapshot, newScene);

      setConnectionState("connected");
    }
  }, 200);
};
