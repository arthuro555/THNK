import type { ServerAdapter } from "../Adapter";
import {
  Builder,
  GameStateUpdateMessage,
  ServerMessage,
  ServerMessageContent,
  ConnectionStartMessage,
  SceneSwitchMessage,
  ResumePreviousSceneMessage,
} from "../t-h-n-k";
import { makeSceneSnapshot } from "./MakeSceneSnaphsot";
import { diffScene } from "./SceneDiffer";

export const sendConnectionStartMessageTo = (
  userID: string,
  adapter: ServerAdapter,
  runtimeScene: gdjs.RuntimeScene
) => {
  const builder = new Builder(512);

  const sceneNameOffset = builder.createString(runtimeScene.getName());
  const sceneSnapshotOffset = makeSceneSnapshot(builder, runtimeScene);

  ConnectionStartMessage.startConnectionStartMessage(builder);
  ConnectionStartMessage.addSceneName(builder, sceneNameOffset);
  ConnectionStartMessage.addSceneSnapshot(builder, sceneSnapshotOffset);

  adapter.sendServerMessageTo(
    userID,
    builder,
    ServerMessage.createServerMessage(
      builder,
      ServerMessageContent.ConnectionStartMessage,
      ConnectionStartMessage.endConnectionStartMessage(builder)
    )
  );
};

export const sendGameStateUpdateMessageToAll = (
  adapter: ServerAdapter,
  runtimeScene: gdjs.RuntimeScene
) => {
  const builder = new Builder(256);
  const gameStateDiffOffset = diffScene(builder, runtimeScene);
  adapter.sendServerMessageToAll(
    builder,
    ServerMessage.createServerMessage(
      builder,
      ServerMessageContent.GameStateUpdateMessage,
      GameStateUpdateMessage.createGameStateUpdateMessage(
        builder,
        gameStateDiffOffset
      )
    )
  );
};

export const sendSceneSwitchMessageToAll = (
  adapter: ServerAdapter,
  newScene: string,
  isPause: boolean
) => {
  const builder = new Builder(512);

  const sceneNameOffset = builder.createString(newScene);

  SceneSwitchMessage.startSceneSwitchMessage(builder);
  SceneSwitchMessage.addSceneName(builder, sceneNameOffset);
  SceneSwitchMessage.addIsPause(builder, isPause);

  adapter.sendServerMessageToAll(
    builder,
    ServerMessage.createServerMessage(
      builder,
      ServerMessageContent.SceneSwitchMessage,
      SceneSwitchMessage.endSceneSwitchMessage(builder)
    )
  );
};

export const sendSceneResumeMessageToSome = (
  userIDs: string[],
  adapter: ServerAdapter,
  sceneToResume?: gdjs.RuntimeScene
) => {
  const builder = new Builder(512);

  const sceneNameOffset = sceneToResume
    ? builder.createString(sceneToResume.getName())
    : null;
  const sceneSnapshot = sceneToResume
    ? makeSceneSnapshot(builder, sceneToResume)
    : null;

  ResumePreviousSceneMessage.startResumePreviousSceneMessage(builder);

  if (sceneSnapshot && sceneNameOffset) {
    ResumePreviousSceneMessage.addSnapshot(builder, sceneSnapshot);
    ResumePreviousSceneMessage.addName(builder, sceneNameOffset);
  }

  const serverMessage = ServerMessage.createServerMessage(
    builder,
    ServerMessageContent.ResumePreviousSceneMessage,
    ResumePreviousSceneMessage.endResumePreviousSceneMessage(builder)
  );

  for (const userID of userIDs) {
    adapter.sendServerMessageTo(userID, builder, serverMessage);
  }
};
