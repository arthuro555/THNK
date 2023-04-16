import { GameStateSnapshot } from "t-h-n-k";
import { deserializeObject } from "client/ObjectDeserializer";
import { unpackVariable } from "utils/VariablePacker";
import { _reinitializePBLinks } from "./PlayerBehavior";

export const applyGameStateSnapshotToScene = (
  gameState: GameStateSnapshot,
  runtimeScene: gdjs.RuntimeScene
) => {
  if (!runtimeScene.thnkClient) return;
  const { objectsRegistery } = runtimeScene.thnkClient;

  const publicStatePacked = gameState.publicStatePackedArray();
  if (publicStatePacked) {
    unpackVariable(runtimeScene.getVariables().get("State"), publicStatePacked);
  }

  const privateStatePacked = gameState.privateStatePackedArray();
  if (privateStatePacked) {
    unpackVariable(
      runtimeScene.getVariables().get("PlayerState"),
      privateStatePacked
    );
  }

  // Delete previous objects, as the snapshot expects to be applied to a blank state.
  objectsRegistery.clear();

  if (gameState.objectsLength() > 0) {
    for (
      let len = gameState.objectsLength(),
        i = 0,
        gameObject = gameState.objects(0)!;
      i < len;
      gameObject = gameState.objects(++i)!
    ) {
      const name = gameObject.name();
      if (!name) continue;
      const obj = runtimeScene.createObject(name)!;
      deserializeObject(gameObject, obj);
      objectsRegistery.registerObject(gameObject.id(), obj);
    }
  }

  _reinitializePBLinks(runtimeScene, gameState.ownedObjectsArray());
};
