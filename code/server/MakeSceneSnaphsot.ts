import { Builder, GameStateSnapshot } from "t-h-n-k";
import { packVariable } from "utils/VariablePacker";
import { _getAllIDsOfObjectsOfPlayer as getAllIDsOfObjectsOfPlayer } from "server/PlayerBehavior";

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

  const playerIDs = getAllIDsOfObjectsOfPlayer(forPlayer);
  const playerIDsOffset = playerIDs
    ? GameStateSnapshot.createOwnedObjectsVector(builder, playerIDs)
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
  if (playerIDsOffset)
    GameStateSnapshot.addOwnedObjects(builder, playerIDsOffset);
  return GameStateSnapshot.endGameStateSnapshot(builder);
};
