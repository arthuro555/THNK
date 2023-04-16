import { getCurrentPlayerID, setPickedPlayer } from "server/PickedPlayer";

const objectsToCreateOnConnection: Record<
  string,
  Map<string, [number, number]>
> = {};
const objectsToDeleteOnDisconnection: Record<string, Set<string>> = {};

gdjs.registerFirstRuntimeSceneLoadedCallback(
  (runtimeScene: gdjs.RuntimeScene) => {
    const { layouts: scenes, objects: globalObjects } = runtimeScene
      .getGame()
      .getGameData();

    for (const scene of scenes) {
      objectsToCreateOnConnection[scene.name] = new Map();
      objectsToDeleteOnDisconnection[scene.name] = new Set();
      for (const object of scene.objects) {
        const syncedBehavior = object.behaviors.find(
          (behavior) => behavior.type === "THNK::Player"
        ) as any;

        if (!syncedBehavior) continue;

        if (syncedBehavior.CreateOnConnect) {
          objectsToCreateOnConnection[scene.name].set(object.name, [
            syncedBehavior.CreateOnConnectX,
            syncedBehavior.CreateOnConnectY,
          ]);
        }

        if (syncedBehavior.DeleteOnDisconnect) {
          objectsToDeleteOnDisconnection[scene.name].add(object.name);
        }
      }
    }

    for (const object of globalObjects) {
      const syncedBehavior = object.behaviors.find(
        (behavior) => behavior.type === "THNK::Player"
      ) as any;

      if (syncedBehavior && syncedBehavior.CreateOnConnect) {
        for (const objectsToCreateForScene of Object.values(
          objectsToCreateOnConnection
        )) {
          objectsToCreateForScene.set(object.name, [
            syncedBehavior.CreateOnConnectX,
            syncedBehavior.CreateOnConnectY,
          ]);
        }
      }

      if (syncedBehavior && syncedBehavior.DeleteOnDisconnect) {
        for (const objectsToDeleteForScene of Object.values(
          objectsToDeleteOnDisconnection
        )) {
          objectsToDeleteForScene.add(object.name);
        }
      }
    }
  }
);

export const onPlayerConnection = (runtimeScene: gdjs.RuntimeScene) => {
  for (const [objectName, [x, y]] of objectsToCreateOnConnection[
    runtimeScene.getName()
  ]) {
    runtimeScene.createObject(objectName)!.setPosition(x, y);
  }
};

const playerObjectsLists = new Map<string, gdjs.LongLivedObjectsList>();
const playerObjectsIDs = new Map<string, Set<number>>();
const objectOwners = new Map<number, string>();

let playersNewlyOwnedObjects = new Map<string, Set<number>>();
let playersPreviouslyOwnedObjects = new Map<string, Set<number>>();

export const _getNewPlayerObjects = () => {
  const _ = playersNewlyOwnedObjects;
  playersNewlyOwnedObjects = new Map();
  return _;
};
export const _getOldPlayerObjects = () => {
  const _ = playersPreviouslyOwnedObjects;
  playersPreviouslyOwnedObjects = new Map();
  return _;
};

export const onObjectCreated = (object: gdjs.RuntimeObject) => {
  const owner = getCurrentPlayerID();

  let lists = playerObjectsLists.get(owner);
  if (!lists)
    playerObjectsLists.set(owner, (lists = new gdjs.LongLivedObjectsList()));

  let newlyOwnedObjects = playersNewlyOwnedObjects.get(owner);
  if (!newlyOwnedObjects)
    playersNewlyOwnedObjects.set(owner, (newlyOwnedObjects = new Set()));

  let playerOwnedObjects = playerObjectsIDs.get(owner);
  if (!playerOwnedObjects)
    playerObjectsIDs.set(owner, (playerOwnedObjects = new Set()));

  lists.addObject(object.getName(), object);
  setTimeout(() => {
    console.log(object.thnkID);
    // hacky af way to await the thnkID to be assigned
    // its fucking 8am i have not sletp for a night aaaaaaaaa
    // future me: fuck you and also please fix dis thank yoooou xoxo
    newlyOwnedObjects!.add(object.thnkID);
    playerOwnedObjects!.add(object.thnkID);
    objectOwners.set(object.thnkID, owner);
  },10);

  object.registerDestroyCallback(() => onObjectDeleted(object));
};

const onObjectDeleted = (object: gdjs.RuntimeObject) => {
  const owner = getCurrentPlayerID();

  const lists = playerObjectsLists.get(owner);
  const newlyOwnedObjects = playersNewlyOwnedObjects.get(owner);
  const previouslyOwnedObjects = playersPreviouslyOwnedObjects.get(owner);
  const playerOwnedObjects = playerObjectsIDs.get(owner);

  if (lists) lists.removeObject(object.getName(), object);
  if (newlyOwnedObjects) newlyOwnedObjects.delete(object.thnkID);
  if (previouslyOwnedObjects) previouslyOwnedObjects.delete(object.thnkID);
  if (playerOwnedObjects) playerOwnedObjects.delete(object.thnkID);
  objectOwners.delete(object.thnkID);
};

export const onPlayerDisconnection = (
  runtimeScene: gdjs.RuntimeScene,
  playerID: string
) => {
  const playerObjects = playerObjectsLists.get(playerID);
  if (!playerObjects) return;

  for (const objectName of objectsToDeleteOnDisconnection[
    runtimeScene.getName()
  ]) {
    for (const object of playerObjects.getObjects(objectName)) {
      object.deleteFromScene(runtimeScene);
    }
  }

  playerObjectsLists.delete(playerID);
  playersNewlyOwnedObjects.delete(playerID);
  playersPreviouslyOwnedObjects.delete(playerID);
  playerObjectsIDs.delete(playerID);
  for (const [object, user] of objectOwners) {
    if (user === playerID) objectOwners.delete(object);
  }
};

export const changeObjectOwnerToPickedPlayer = (object: gdjs.RuntimeObject) => {
  const newOwner = getCurrentPlayerID();
  const previousOwner = objectOwners.get(object.thnkID)!;

  if (newOwner === previousOwner) return;

  let newOwnersObjectsLists = playerObjectsLists.get(newOwner);
  if (!newOwnersObjectsLists) {
    playerObjectsLists.set(
      newOwner,
      (newOwnersObjectsLists = new gdjs.LongLivedObjectsList())
    );
  }

  let newOwnersNewlyOwnedObjects = playersNewlyOwnedObjects.get(newOwner);
  if (!newOwnersNewlyOwnedObjects) {
    playersNewlyOwnedObjects.set(
      newOwner,
      (newOwnersNewlyOwnedObjects = new Set())
    );
  }

  let newOwnersObjects = playerObjectsIDs.get(newOwner);
  if (!newOwnersObjects) {
    playerObjectsIDs.set(newOwner, (newOwnersObjects = new Set()));
  }

  let previousOwnersPreviouslyOwnedObjects =
    playersNewlyOwnedObjects.get(previousOwner);
  if (!previousOwnersPreviouslyOwnedObjects) {
    playersPreviouslyOwnedObjects.set(
      previousOwner,
      (previousOwnersPreviouslyOwnedObjects = new Set())
    );
  }

  const previousOwnersObjects = playerObjectsIDs.get(previousOwner);

  const previousOwnersNewlyOwnedObjects =
    playersNewlyOwnedObjects.get(previousOwner);

  playerObjectsLists.get(previousOwner)?.removeObject(object.getName(), object);
  newOwnersObjectsLists.addObject(object.getName(), object);

  newOwnersNewlyOwnedObjects.add(object.thnkID);
  newOwnersObjects.add(object.thnkID);
  previousOwnersPreviouslyOwnedObjects.add(object.thnkID);
  if (previousOwnersObjects) previousOwnersObjects.delete(object.thnkID);
  if (previousOwnersNewlyOwnedObjects)
    previousOwnersNewlyOwnedObjects.delete(object.thnkID);

  objectOwners.set(object.thnkID, newOwner);
};

export const pickPlayerOfObject = (object: gdjs.RuntimeObject) => {
  if (objectOwners.has(object.thnkID)) {
    setPickedPlayer(objectOwners.get(object.thnkID)!);
  }
};

export const pickObjectsOfPlayer = (
  objectsListsHashtable: ObjectsLists
): boolean => {
  const playerLists = playerObjectsLists.get(getCurrentPlayerID());

  if (!playerLists) {
    // No objects lists exist for that player, don't pick any objects and return false.
    for (const objectList of Object.values(objectsListsHashtable.items))
      objectList.length = 0;
    return false;
  }

  let wereObjectsPicked = false;
  for (const [objectName, objectList] of Object.entries(
    objectsListsHashtable.items
  )) {
    const playerObjectsList = playerLists.getObjects(objectName);
    if (playerObjectsList.length) {
      gdjs.copyArray(playerObjectsList, objectList);
      wereObjectsPicked = true;
    }
  }

  return wereObjectsPicked;
};

export const _getAllIDsOfObjectsOfPlayer = (forPlayer: string) => {
  const ids = playerObjectsIDs.get(forPlayer);
  return ids && ids.size > 0 ? Array.from(ids.values()) : null;
};
