import { GameStateSnapshot } from "../t-h-n-k";
import { deserializeObject } from "./ObjectDeserializer";
import { clientObjectsRegistery } from "./ClientObjectsRegistery";
import { unpackVariable } from "../VariablePacker";

export const applyGameStateSnapshotToScene = (
  gameState: GameStateSnapshot,
  runtimeScene: gdjs.RuntimeScene
) => {
  if (!runtimeScene.thnkClient) return;

  const rootVariable = gameState.variablesArray();
  if (rootVariable)
    unpackVariable(runtimeScene.getVariables().get("State"), rootVariable);

  // Delete previous objects, as the snapshot expects to be applied to a blank state.
  clientObjectsRegistery.forEach((runtimeObject) =>
    runtimeObject.deleteFromScene(runtimeScene)
  );
  clientObjectsRegistery.clear();

  if (gameState.objectsLength() !== 0) {
    for (
      let len = gameState.objectsLength(),
        i = 0,
        gameObject = gameState.objects(0)!;
      i < len;
      gameObject = gameState.objects(++i)!
    ) {
      const name = gameObject.name();
      if (!name) continue;
      const obj = runtimeScene.createObject(name)!;console.log(obj);
      deserializeObject(gameObject, obj);
      clientObjectsRegistery.set(gameObject.id(), obj);
    }
  }
};
