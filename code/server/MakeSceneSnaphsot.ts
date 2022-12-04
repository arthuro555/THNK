import { Builder, GameStateSnapshot } from "t-h-n-k";
import { packVariable } from "utils/VariablePacker";

export const makeSceneSnapshot = (
  builder: Builder,
  runtimeScene: gdjs.RuntimeScene,
  forPlayer: string
): number => {
  if (!runtimeScene.thnkServer) return -1;

  const { stateVariables, objectsRegistery } = runtimeScene.thnkServer;
  const { publicStateVariable, privateStateVariable } = stateVariables;

  const publicStateVariableOffset =
    publicStateVariable.getChildrenCount() !== 0
      ? GameStateSnapshot.createPublicStatePackedVector(
          builder,
          packVariable(publicStateVariable)
        )
      : null;

  const playerPrivateStateVariable = privateStateVariable.getChild(forPlayer);
  const privateStateVariableOffset =
    playerPrivateStateVariable.getChildrenCount() !== 0
      ? GameStateSnapshot.createPrivateStatePackedVector(
          builder,
          packVariable(playerPrivateStateVariable)
        )
      : null;

  const objectsSnapshots = objectsRegistery.createObjectsSnapshot(
    builder,
    forPlayer
  );
  const objectsSnapshotsOffset = objectsSnapshots.length
    ? GameStateSnapshot.createObjectsVector(builder, objectsSnapshots)
    : null;

  GameStateSnapshot.startGameStateSnapshot(builder);
  if (publicStateVariableOffset)
    GameStateSnapshot.addPublicStatePacked(builder, publicStateVariableOffset);
  if (privateStateVariableOffset) {
    GameStateSnapshot.addPrivateStatePacked(
      builder,
      privateStateVariableOffset
    );
  }
  if (objectsSnapshotsOffset)
    GameStateSnapshot.addObjects(builder, objectsSnapshotsOffset);
  return GameStateSnapshot.endGameStateSnapshot(builder);
};
