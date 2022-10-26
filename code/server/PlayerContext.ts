let currentPlayerID: string = "";
const playerObjectsLists = new Map<string, gdjs.LongLivedObjectsList>();

export const getCurrentPlayerID = () => currentPlayerID;
export const switchPlayerContext = (playerID: string) => {
  currentPlayerID = playerID;
};
export const markObjectAsOwned = (object: gdjs.RuntimeObject) => {
  let lists = playerObjectsLists.get(currentPlayerID);
  if (!lists)
    playerObjectsLists.set(
      currentPlayerID,
      (lists = new gdjs.LongLivedObjectsList())
    );

  lists.addObject(object.getName(), object);
};

export const pickOwnedObjects = (
  objectsListsHashtable: ObjectsLists
): boolean => {
  const playerLists = playerObjectsLists.get(currentPlayerID);
  if (!playerLists) {
    // No objects lists exist for that player, don't pick any objects and return false.
    for (const objectList of Object.values(objectsListsHashtable.items))
      objectList.length = 0;
    return false;
  }

  for (const [objectName, objectList] of Object.entries(
    objectsListsHashtable.items
  )) {
    gdjs.copyArray(playerLists.getObjects(objectName), objectList);
  }

  return true;
};
