import type { Builder } from "../t-h-n-k";
import { makeObjectSnapshot } from "./MakeObjectSnapshot";
import { diffObject } from "./ObjectDiffer";
import { SyncedVariable } from "./SyncedVariable";

const logger = new gdjs.Logger("THNK - Objects replication");

/**
 * The manager of all objects with the sync behavior, that takes care of
 * making diffs and snapshots of all game objects when required.
 */
export class ServerObjectsRegistery {
  // We heavily recycle IDs to keep using a short as the ID without consuming all the available ones at once.
  private readonly recycledIDs: number[] = [];
  // But we may still generate a brand new one if none of the already generated ones are available.
  private currentNewID = 1; // IDs start by 1, so that an invalid or missing ID doesn't touch the object with ID 0.

  private generateNewID = () => {
    const id = this.recycledIDs.pop() ?? this.currentNewID++;

    // The value will be serialized as a short, so there can only be 65_535 different assigned IDs.
    if (id > 65_535) {
      logger.error(
        "Maximum amount of simultaneously replicated objects reached! Weird stuff is going to happen..."
      );
      return id % 65_535;
    }

    return id;
  };

  private readonly registeredObjects = new Map<number, gdjs.RuntimeObject>();

  registerObject(obj: gdjs.RuntimeObject) {
    obj.thnkID = this.generateNewID();
    this.registeredObjects.set(obj.thnkID, obj);
    this.createdObjects.set(obj.thnkID, obj.getName());

    obj.stateVariable = new SyncedVariable();
    obj.getVariables().add("State", obj.stateVariable);
  }

  unregisterObject(obj: gdjs.RuntimeObject) {
    this.recycledIDs.push(obj.thnkID);
    this.registeredObjects.delete(obj.thnkID);
    this.deletedObjects.add(obj.thnkID);
    // Delete the object from created objects in case it was created the same frame so that no ghost object is created.
    this.createdObjects.delete(obj.thnkID);
  }

  diffObjects(builder: Builder): number[] {
    const diffs: number[] = [];

    for (const obj of this.registeredObjects.values()) {
      const diff = diffObject(builder, obj);
      if (diff) diffs.push(diff);
    }

    return diffs;
  }

  createObjectsSnapshot(builder: Builder): number[] {
    const snapshots: number[] = [];

    for (const obj of this.registeredObjects.values()) {
      snapshots.push(makeObjectSnapshot(builder, obj));
    }

    return snapshots;
  }

  private readonly createdObjects = new Map<number, string>();
  private readonly deletedObjects = new Set<number>();

  getCreatedObjects() {
    const array = [...this.createdObjects.entries()];
    this.createdObjects.clear();
    return array;
  }

  getDeletedObjects() {
    const array = Uint16Array.from(this.deletedObjects.values());
    this.deletedObjects.clear();
    return array;
  }
}
