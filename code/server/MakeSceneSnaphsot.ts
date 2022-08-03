import { Builder, GameStateSnapshot } from "../t-h-n-k";
import { CreatedObject } from "../t-h-n-k/created-object";
import { packVariable } from "../VariablePacker";

export const makeSceneSnapshot = (
  builder: Builder,
  runtimeScene: gdjs.RuntimeScene
): number => {
  if (!runtimeScene.thnkServer) return -1;

  const { syncedVariable, objectsRegistery } = runtimeScene.thnkServer;
  const variablesOffset =
    syncedVariable.getChildrenCount() !== 0
      ? GameStateSnapshot.createVariablesVector(
          builder,
          packVariable(syncedVariable)
        )
      : null;

  const objectsSnapshots = objectsRegistery.createObjectsSnapshot(builder);
  const objectsSnapshotsOffset = objectsSnapshots.length
    ? GameStateSnapshot.createObjectsVector(builder, objectsSnapshots)
    : null;

  GameStateSnapshot.startGameStateSnapshot(builder);
  if (variablesOffset) GameStateSnapshot.addVariables(builder, variablesOffset);
  if (objectsSnapshotsOffset)
    GameStateSnapshot.addObjects(builder, objectsSnapshotsOffset);
  return GameStateSnapshot.endGameStateSnapshot(builder);
};
