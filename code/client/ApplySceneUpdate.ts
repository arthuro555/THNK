import { ByteBuffer, Variable } from "t-h-n-k";
import type { Scene } from "t-h-n-k";
import { deserializeObject } from "client/ObjectDeserializer";
import { deserializeVariable } from "client/VariableDeserializer";

export const applySceneUpdateToScene = (
  sceneUpdate: Scene,
  runtimeScene: gdjs.RuntimeScene
) => {
  if (!runtimeScene.thnkClient) return;
  const { objectsRegistery } = runtimeScene.thnkClient;

  const encodedPublicStateVariable = sceneUpdate.publicStateDiffArray();
  if (encodedPublicStateVariable) {
    deserializeVariable(
      runtimeScene.getVariables().get("State"),
      Variable.getRootAsVariable(new ByteBuffer(encodedPublicStateVariable))
    );
  }

  const encodedPrivateStateVariable = sceneUpdate.privateStateDiffArray();
  if (encodedPrivateStateVariable) {
    deserializeVariable(
      runtimeScene.getVariables().get("PlayerState"),
      Variable.getRootAsVariable(new ByteBuffer(encodedPrivateStateVariable))
    );
  }

  const deletedObjects = sceneUpdate.deletedObjectsArray();
  if (deletedObjects)
    for (const id of deletedObjects) {
      objectsRegistery.deleteObject(id);
    }

  if (sceneUpdate.createdObjectsLength() !== 0)
    for (
      let len = sceneUpdate.createdObjectsLength(),
        i = 0,
        createdObject = sceneUpdate.createdObjects(0)!;
      i < len;
      createdObject = sceneUpdate.createdObjects(++i)!
    ) {
      const name = createdObject.name();
      if (!name) continue;
      const obj = runtimeScene.createObject(name)!;
      objectsRegistery.registerObject(createdObject.id(), obj);
    }

  if (sceneUpdate.objectsLength() !== 0)
    for (
      let len = sceneUpdate.objectsLength(),
        i = 0,
        gameObject = sceneUpdate.objects(0)!;
      i < len;
      gameObject = sceneUpdate.objects(++i)!
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
