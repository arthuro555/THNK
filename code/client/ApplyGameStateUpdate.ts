import { GameStateDiff } from "t-h-n-k";
import { deserializeObject } from "client/ObjectDeserializer";
import { deserializeVariable } from "client/VariableDeserializer";

export const applyGameStateUpdateToScene = (
  gameState: GameStateDiff,
  runtimeScene: gdjs.RuntimeScene
) => {
  if (!runtimeScene.thnkClient) return;
  const { objectsRegistery } = runtimeScene.thnkClient;

  const rootVariable = gameState.variables();
  if (rootVariable)
    deserializeVariable(runtimeScene.getVariables().get("State"), rootVariable);

  const deletedObjects = gameState.deletedObjectsArray();
  if (deletedObjects)
    for (const id of deletedObjects) {
      objectsRegistery.deleteObject(id);
    }

  if (gameState.createdObjectsLength() !== 0)
    for (
      let len = gameState.createdObjectsLength(),
        i = 0,
        createdObject = gameState.createdObjects(0)!;
      i < len;
      createdObject = gameState.createdObjects(++i)!
    ) {
      const name = createdObject.name();
      if (!name) continue;
      const obj = runtimeScene.createObject(name)!;
      objectsRegistery.registerObject(createdObject.id(), obj);
    }

  if (gameState.objectsLength() !== 0)
    for (
      let len = gameState.objectsLength(),
        i = 0,
        gameObject = gameState.objects(0)!;
      i < len;
      gameObject = gameState.objects(++i)!
    ) {
      let obj = objectsRegistery.getObject(gameObject.id());

      if (!obj) {
        const name = gameObject.name();
        if (name) {
          obj = runtimeScene.createObject(name)!;
          objectsRegistery.registerObject(gameObject.id(), obj);
        }
      }

      if (obj) deserializeObject(gameObject, obj);
    }
};
