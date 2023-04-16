let ownedObjects = new gdjs.LongLivedObjectsList();

const _link = (object: gdjs.RuntimeObject) => {
  ownedObjects.addObject(object.getName(), object);
};

const _unlink = (object: gdjs.RuntimeObject) => {
  ownedObjects.removeObject(object.getName(), object);
};

export const _addNewPBLinks = (
  runtimeScene: gdjs.RuntimeScene,
  newObjects: Uint16Array
) => {
  if (!runtimeScene.thnkClient) throw new Error("Expected a THNK client!");

  for (const newObject of newObjects) {
    const object =
      runtimeScene.thnkClient.objectsRegistery.getObject(newObject);
    if (!object) {
      throw new Error(
        `Received link of invalid object "${newObject}" from server!`
      );
    }
    _link(object);
  }
};

export const _removeOldPBLinks = (
  runtimeScene: gdjs.RuntimeScene,
  oldObjects: Uint16Array
) => {
  if (!runtimeScene.thnkClient) throw new Error("Expected a THNK client!");

  for (const oldObject of oldObjects) {
    const object =
      runtimeScene.thnkClient.objectsRegistery.getObject(oldObject);
    if (!object) {
      throw new Error(
        `Received unlink of invalid object "${oldObject}" from server!`
      );
    }
    _unlink(object);
  }
};

export const _reinitializePBLinks = (
  runtimeScene: gdjs.RuntimeScene,
  links: Uint16Array | null
) => {
  if (!runtimeScene.thnkClient) throw new Error("Expected a THNK client!");

  ownedObjects = new gdjs.LongLivedObjectsList();

  if (!links) return; // No objects is a valid call: we only clear the objects list without repopulating it.

  for (const objectID of links) {
    const object = runtimeScene.thnkClient.objectsRegistery.getObject(objectID);
    if (!object) {
      throw new Error(
        `Received reference to invalid owned object "${objectID}" from server!`
      );
    }
    _link(object);
  }
};

export const pickObjectsOfPlayer = (
  objectsListsHashtable: ObjectsLists
): boolean => {
  let wereObjectsPicked = false;

  for (const [objectName, objectList] of Object.entries(
    objectsListsHashtable.items
  )) {
    const playerObjectsList = ownedObjects.getObjects(objectName);
    if (playerObjectsList.length) {
      gdjs.copyArray(playerObjectsList, objectList);
      wereObjectsPicked = true;
    }
  }

  return wereObjectsPicked;
};
