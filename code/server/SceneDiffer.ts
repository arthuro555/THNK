import { Builder, GameStateDiff, CreatedObject } from "t-h-n-k";

export const diffScene = (
  builder: Builder,
  runtimeScene: gdjs.RuntimeScene
): number => {
  if (!runtimeScene.thnkServer) return -1;

  const { syncedVariable, objectsRegistery } = runtimeScene.thnkServer;
  const variablesOffset = syncedVariable.isDirty()
    ? syncedVariable.serialize(builder)
    : null;

  const objectsDiffs = objectsRegistery.diffObjects(builder);
  const objectsDiffsOffset = objectsDiffs.length
    ? GameStateDiff.createObjectsVector(builder, objectsDiffs)
    : null;

  const createdObjects = objectsRegistery.getCreatedObjects();
  const createdObjectsOffset = createdObjects.length
    ? GameStateDiff.createCreatedObjectsVector(
        builder,
        createdObjects.map(([id, name]) => {
          const nameOffset = builder.createSharedString(name);
          return CreatedObject.createCreatedObject(builder, id, nameOffset);
        })
      )
    : null;

  const deletedObjects = objectsRegistery.getDeletedObjects();
  const deletedObjectsOffset = deletedObjects.length
    ? GameStateDiff.createDeletedObjectsVector(builder, deletedObjects)
    : null;

  GameStateDiff.startGameStateDiff(builder);
  if (variablesOffset) GameStateDiff.addVariables(builder, variablesOffset);
  if (objectsDiffsOffset) GameStateDiff.addObjects(builder, objectsDiffsOffset);
  if (createdObjectsOffset)
    GameStateDiff.addCreatedObjects(builder, createdObjectsOffset);
  if (deletedObjectsOffset)
    GameStateDiff.addDeletedObjects(builder, deletedObjectsOffset);
  return GameStateDiff.endGameStateDiff(builder);
};
