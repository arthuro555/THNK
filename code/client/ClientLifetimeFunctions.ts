import {
  GameStateUpdateMessage,
  ResumePreviousSceneMessage,
  SceneSwitchMessage,
  ServerMessageContent,
} from "t-h-n-k";
import { applyGameStateSnapshotToScene } from "client/ApplyGameStateSnapshot";
import { applySceneUpdateToScene } from "client/ApplySceneUpdate";
import { THNKClientContext } from "./THNKClientContext";

const logger = new gdjs.Logger("THNK - Client");
const runClientTickPreEvent = (runtimeScene: gdjs.RuntimeScene) => {
  if (!runtimeScene.thnkClient) return;
  const { adapter } = runtimeScene.thnkClient;
  for (const message of adapter.getPendingMessages()) {
    const messageType = message.contentType();
    switch (messageType) {
      case ServerMessageContent.ConnectionStartMessage:
        logger.warn(
          "A second ConnectionStartMessage was received from the server. This is likely a bug, please open an issue on the THNK GitHub!"
        );
        continue;
      case ServerMessageContent.GameStateUpdateMessage:
        const gameStateUpdateMessage = message.content(
          new GameStateUpdateMessage()
        ) as GameStateUpdateMessage;
        const scene = gameStateUpdateMessage.scene();
        if (scene) applySceneUpdateToScene(scene, runtimeScene);
        continue;
      case ServerMessageContent.SceneSwitchMessage:
        const sceneSwitchMessage = message.content(
          new SceneSwitchMessage()
        ) as SceneSwitchMessage;
        const sceneName = sceneSwitchMessage.sceneName();
        if (!sceneName) {
          console.error(
            "Server requested scene switch, but no scene name was sent! This is likely a bug, please open an issue on the THNK GitHub!"
          );
          continue;
        }
        const newScene = sceneSwitchMessage.isPause()
          ? runtimeScene.getGame().getSceneStack().push(sceneName)
          : runtimeScene.getGame().getSceneStack().replace(sceneName, true);

        //newScene.thnkClient = runtimeScene.thnkClient; //runtimeScene.thnkClient holds the old scene
        newScene.thnkClient = new THNKClientContext(runtimeScene.thnkClient!.adapter, newScene);

        // Make sure next messages are applied to the new scene.
        runtimeScene = newScene;

        continue;
      case ServerMessageContent.ResumePreviousSceneMessage:
        const resumedSceneMessage = message.content(
          new ResumePreviousSceneMessage()
        ) as ResumePreviousSceneMessage;

        const resumedSceneName = resumedSceneMessage.name();

        let resumedScene: gdjs.RuntimeScene | null = null;
        try {
          resumedScene = resumedSceneName
            ? runtimeScene
                .getGame()
                .getSceneStack()
                .replace(resumedSceneName, true)
            : runtimeScene.getGame().getSceneStack().pop();
        } catch (e) {
          console.info("Error spotted!");
        }

        if (!resumedScene) continue;

        const resumedSceneSnapshot = resumedSceneMessage.snapshot();
        if (resumedSceneSnapshot) {
          applyGameStateSnapshotToScene(resumedSceneSnapshot, resumedScene);
        }

        // In the case the scene was just created it is necessary to keep it in client mode.
        //resumedScene.thnkClient = runtimeScene.thnkClient; //runtimeScene.thnkClient holds the old scene
        resumedScene.thnkClient = new THNKClientContext(runtimeScene.thnkClient!.adapter, resumedScene);

        // Make sure next messages are applied to the new scene.
        runtimeScene = resumedScene;

        continue;
      default:
        logger.error(
          `Received message with unknown type '${message.contentType()}'`
        );
    }
  }

  adapter.markPendingMessagesAsRead();
};

gdjs.registerRuntimeScenePreEventsCallback(runClientTickPreEvent);
