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

export const pickOwnedObjects = (objectsListsHashtable: ObjectsLists) => {
  const playerLists = playerObjectsLists.get(currentPlayerID);
  if (!playerLists) return;

  for (const [objectName, objectList] of Object.entries(
    objectsListsHashtable.items
  )) {
    gdjs.copyArray(playerLists.getObjects(objectName), objectList);
  }
};
