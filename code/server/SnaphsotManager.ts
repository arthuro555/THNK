import {
  type Builder,
  Scene,
  ObjState,
  GameObject,
  CreatedObject,
} from "t-h-n-k";
import { getTickRate } from "utils/Settings";
import { serializeRGB } from "./SerializeRGB";

export class SnapshotsManager {
  /** The number of diffs to keep */
  diffsCount: number;
  /** The list of previous difs in case one gets missed by the client. */
  diffs: Array<Snapshot>;
  /** The index of the current diff. */
  currentDiff = 0;

  constructor() {
    // Store for up to 4 seconds a diff. Use a baseline of 30 in case the tick rate is weird.
    this.diffsCount = Math.min(30, getTickRate() * 4);
    this.diffs = new Array(this.diffsCount);
  }

  createSnapshot(runtimeScene: gdjs.RuntimeScene) {
    const snapshot = Snapshot.createDiff(runtimeScene);
    if (snapshot) this.diffs[++this.currentDiff % this.diffsCount] = snapshot;
    return snapshot;
  }

  getSnapshot(snapshotID: number) {
    // We already overrode the slot of that snapshot with another one 😔
    if (this.currentDiff - snapshotID > this.diffsCount) return null;
    return this.diffs[snapshotID % this.diffsCount];
  }
}

export class Snapshot {
  private sceneDiff?: SceneDiff;

  private constructor() {}
  static createDiff(runtimeScene: gdjs.RuntimeScene): Snapshot | null {
    const sceneDiff = SceneDiff.createDiff(runtimeScene);
    if (!sceneDiff) return null;
    const snapshot = new Snapshot();
    snapshot.sceneDiff = sceneDiff;
    return snapshot;
  }

  serialize(builder: Builder, forPlayer: string) {
    return this.sceneDiff?.serialize(builder, forPlayer);
  }
}

/**
 * Contains a snapshot of all changes in a scene since the last snapshot.
 */
export class SceneDiff {
  private publicStateVariableDiff?: Uint8Array;
  private privateStateVariablesDiffs = new Map<string, Uint8Array>();
  private teamStateVariablesDiffs = new Map<string, Uint8Array>();
  private readonly objectsDiff: Map<number, ObjectSnapshot> = new Map();
  private readonly deletedObjects = new Set<number>();
  private readonly createdObjects = new Map<number, string>();

  private constructor() {}
  static createDiff(runtimeScene: gdjs.RuntimeScene): SceneDiff {
    const { thnkServer } = runtimeScene;
    if (!thnkServer) {
      throw new Error(
        "Impossible to take a diff snapshot when not running a THNK server!"
      );
    }

    const { stateVariables, objectsRegistery } = thnkServer;
    const {
      publicStateVariable,
      privateStateVariable,
      teamStateVariable, // Not implemented yet
    } = stateVariables;

    const diff = new SceneDiff();

    if (publicStateVariable.isDirty()) {
      diff.publicStateVariableDiff = publicStateVariable.serializeToBinary();
    }

    {
      const children = privateStateVariable.getAllChildren();
      for (const child in children)
        if (children[child].isDirty())
          diff.privateStateVariablesDiffs.set(
            child,
            children[child].serializeToBinary()
          );
    }

    {
      const children = teamStateVariable.getAllChildren();
      for (const child in children)
        if (children[child].isDirty())
          diff.teamStateVariablesDiffs.set(
            child,
            children[child].serializeToBinary()
          );
    }

    objectsRegistery.forEach((obj) => {
      const objDiff = ObjectSnapshot.createDiff(obj);
      if (objDiff) diff.objectsDiff.set(obj.thnkID, objDiff);
    });
    for (const [id, objectName] of objectsRegistery.getCreatedObjects())
      diff.createdObjects.set(id, objectName);
    for (const id of objectsRegistery.getDeletedObjects())
      diff.deletedObjects.add(id);

    return diff;
  }

  serialize(builder: Builder, forPlayer: string) {
    const publicSceneVariable = this.publicStateVariableDiff
      ? Scene.createPublicStateDiffVector(builder, this.publicStateVariableDiff)
      : null;

    const playerStateVariable = this.privateStateVariablesDiffs.get(forPlayer);
    const privateSceneVariable = playerStateVariable
      ? Scene.createPrivateStateDiffVector(builder, playerStateVariable)
      : null;

    // TODO - Only serialize objects that the player can see
    // TODO - Replace with Uint8Array
    const objectsDiffs: number[] = [];
    for (const obj of this.objectsDiff.values()) {
      if (obj.needsToBeSerialized(forPlayer))
        objectsDiffs.push(obj.serialize(builder, forPlayer));
    }
    const objectsDiffsOffset = objectsDiffs.length
      ? Scene.createObjectsVector(builder, objectsDiffs)
      : null;

    let serializedObjectsToCreateOffset: number | null = null;
    if (this.createdObjects.size) {
      const serializedObjectsToCreate = new Uint16Array(
        this.createdObjects.size
      ) as unknown as number[]; // FlatBuffers accept Typed Arrays, the generated type information is wrong.

      let i = 0;
      for (const [createdObjectID, createdObjectName] of this.createdObjects) {
        const nameDiff = builder.createSharedString(createdObjectName);
        serializedObjectsToCreate[i++] = CreatedObject.createCreatedObject(
          builder,
          createdObjectID,
          nameDiff
        );
      }

      serializedObjectsToCreateOffset = Scene.createCreatedObjectsVector(
        builder,
        serializedObjectsToCreate
      );
    }

    const serializedObjectsToDeleteOffset = this.deletedObjects.size
      ? Scene.createDeletedObjectsVector(builder, [...this.deletedObjects])
      : null;

    Scene.startScene(builder);
    if (publicSceneVariable)
      Scene.addPublicStateDiff(builder, publicSceneVariable);
    if (privateSceneVariable)
      Scene.addPrivateStateDiff(builder, privateSceneVariable);
    if (objectsDiffsOffset) Scene.addObjects(builder, objectsDiffsOffset);
    if (serializedObjectsToCreateOffset)
      Scene.addCreatedObjects(builder, serializedObjectsToCreateOffset);
    if (serializedObjectsToDeleteOffset)
      Scene.addDeletedObjects(builder, serializedObjectsToDeleteOffset);
    return Scene.endScene(builder);
  }
}

class ObjectSnapshot {
  /** The THNK ID of the object getting snapped. */
  id: number;
  /** Regardless of changed values, an up-to-date AABB should always be present to check if the object is visible, as out of screen objects may not be synced. */
  aabb: gdjs.AABB;

  publicStateVariableDiff?: Uint8Array;
  privateStateVariablesDiffs = new Map<string, Uint8Array>();
  teamStateVariablesDiffs = new Map<string, Uint8Array>();

  propertyChanged = false;
  layer?: string;
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  angle?: number;
  zOrder?: number;
  hidden?: boolean;

  flippedX?: boolean;
  flippedY?: boolean;
  opacity?: number;
  animation?: number;
  string?: string;
  color?: string;

  private constructor(id: number, aabb: gdjs.AABB) {
    this.id = id;
    this.aabb = aabb;
  }
  static createDiff(obj: gdjs.RuntimeObject): ObjectSnapshot | null {
    const diff = new ObjectSnapshot(
      obj.thnkID,
      obj.getVisibilityAABB() || obj.getAABB()
    );

    if (obj.getLayer() !== obj.prevLayer) {
      obj.prevLayer = obj.getLayer();
      diff.propertyChanged = true;
      diff.layer = obj.getLayer();
    }

    if (obj.getX() !== obj.prevX) {
      obj.prevX = obj.getX();
      diff.propertyChanged = true;
      diff.x = obj.getX();
    }

    if (obj.getY() !== obj.prevY) {
      obj.prevY = obj.getY();
      diff.propertyChanged = true;
      diff.y = obj.getY();
    }

    if (obj.getHeight() !== obj.prevHeight) {
      obj.prevHeight = obj.getHeight();
      diff.propertyChanged = true;
      diff.height = obj.getHeight();
    }

    if (obj.getWidth() !== obj.prevWidth) {
      obj.prevWidth = obj.getWidth();
      diff.propertyChanged = true;
      diff.width = obj.getWidth();
    }

    if (obj.getAngle() !== obj.prevAngle) {
      obj.prevAngle = obj.getAngle();
      diff.propertyChanged = true;
      diff.angle = obj.getAngle();
    }

    if (obj.getZOrder() !== obj.prevZOrder) {
      obj.prevZOrder = obj.getZOrder();
      diff.propertyChanged = true;
      diff.zOrder = obj.getZOrder();
    }

    if (obj.isHidden() !== obj.prevVisibility) {
      obj.prevVisibility = obj.isHidden();
      diff.propertyChanged = true;
      diff.hidden = obj.isHidden();
    }

    if (obj.isFlippedX && obj.isFlippedX() !== obj.prevFlippedX) {
      obj.prevFlippedX = obj.isFlippedX();
      diff.propertyChanged = true;
      diff.flippedX = obj.isFlippedX();
    }

    if (obj.isFlippedY && obj.isFlippedY() !== obj.prevFlippedY) {
      obj.prevFlippedY = obj.isFlippedY();
      diff.propertyChanged = true;
      diff.flippedY = obj.isFlippedY();
    }

    if (obj.getOpacity && obj.getOpacity() !== obj.prevOpacity) {
      obj.prevOpacity = obj.getOpacity();
      diff.propertyChanged = true;
      diff.opacity = obj.getOpacity();
    }

    if (obj.getString && obj.getString() !== obj.prevText) {
      obj.prevText = obj.getString();
      diff.propertyChanged = true;
      diff.string = obj.getString();
    }

    if (obj.getColor && obj.getColor() !== obj.prevColor) {
      obj.prevColor = obj.getColor();
      diff.propertyChanged = true;
      diff.color = obj.getColor();
    }

    if (obj.getAnimation && obj.getAnimation() !== obj.prevAnimation) {
      obj.prevAnimation = obj.getAnimation();
      diff.propertyChanged = true;
      diff.animation = obj.getAnimation();
    }

    const {
      publicStateVariable,
      privateStateVariable,
      teamStateVariable, // Not implemented yet
    } = obj.stateVariables;

    if (publicStateVariable.isDirty()) {
      diff.publicStateVariableDiff = publicStateVariable.serializeToBinary();
    }

    {
      const children = privateStateVariable.getAllChildren();
      for (const child in children)
        if (children[child].isDirty())
          diff.privateStateVariablesDiffs.set(
            child,
            children[child].serializeToBinary()
          );
    }

    {
      const children = teamStateVariable.getAllChildren();
      for (const child in children)
        if (children[child].isDirty())
          diff.teamStateVariablesDiffs.set(
            child,
            children[child].serializeToBinary()
          );
    }

    // If it turns out nothing changed after all, return null to not store any diff.
    if (
      diff.propertyChanged ||
      diff.publicStateVariableDiff ||
      diff.privateStateVariablesDiffs.size ||
      diff.teamStateVariablesDiffs.size
    ) {
      return diff;
    } else return null;
  }

  needsToBeSerialized(forPlayer: string) {
    // Don't serialize an object if it has no notable change
    return (
      this.propertyChanged ||
      this.publicStateVariableDiff ||
      this.privateStateVariablesDiffs.has(forPlayer)
    );
  }

  serialize(builder: Builder, forPlayer: string): number {
    const str =
      this.string !== undefined
        ? builder.createSharedString(this.string)
        : null;
    const layer =
      this.layer !== undefined
        ? builder.createSharedString(this.layer)
        : null;

    if (this.propertyChanged) {
      ObjState.startObjState(builder);
      if (layer) ObjState.addLayer(builder, layer);

      if (this.x !== undefined) {
        if (this.x === 0) ObjState.addSetXTo0(builder, true);
        else ObjState.addX(builder, this.x);
      }

      if (this.y !== undefined) {
        if (this.y === 0) ObjState.addSetYTo0(builder, true);
        else ObjState.addY(builder, this.y);
      }

      if (this.height !== undefined) {
        if (this.height === 0) ObjState.addSetHeightTo0(builder, true);
        else ObjState.addHeight(builder, this.height);
      }

      if (this.width !== undefined) {
        if (this.width === 0) ObjState.addSetWidthTo0(builder, true);
        else ObjState.addWidth(builder, this.width);
      }

      if (this.angle !== undefined) {
        if (this.angle === 0) ObjState.addSetAngleTo0(builder, true);
        else ObjState.addAngle(builder, this.angle);
      }

      if (this.zOrder !== undefined) {
        // TODO: Remove 1 offset once optional scalars are fixed
        if (this.zOrder <= 65_535) ObjState.addZOrder(builder, this.zOrder + 1);
        else ObjState.addBigZOrder(builder, this.zOrder + 1);
      }

      if (this.hidden !== undefined)
        ObjState.addVisible(builder, this.hidden ? 1 : 2);

      if (this.flippedX !== undefined)
        ObjState.addFlippedX(builder, this.flippedX ? 1 : 2);

      if (this.flippedY !== undefined)
        ObjState.addFlippedY(builder, this.flippedY ? 1 : 2);

      if (this.opacity !== undefined) {
        if (this.opacity === 0) ObjState.addSetOpacityTo0(builder, true);
        else ObjState.addOpacity(builder, this.opacity);
      }

      if (this.animation !== undefined)
        ObjState.addAnimation(builder, this.animation + 1);

      if (str) ObjState.addText(builder, str);

      if (this.color !== undefined)
        ObjState.addTint(builder, serializeRGB(builder, this.color));
    }

    const objState = this.propertyChanged
      ? ObjState.endObjState(builder)
      : null;

    const publicStateDiff = this.publicStateVariableDiff
      ? GameObject.createPublicStateDiffVector(
          builder,
          this.publicStateVariableDiff
        )
      : null;

    const privateStateVariable = this.privateStateVariablesDiffs.get(forPlayer);
    const privateStateDiff = privateStateVariable
      ? GameObject.createPrivateStateDiffVector(builder, privateStateVariable)
      : null;

    GameObject.startGameObject(builder);
    GameObject.addId(builder, this.id);
    if (objState) GameObject.addObjState(builder, objState);
    if (publicStateDiff)
      GameObject.addPublicStateDiff(builder, publicStateDiff);
    if (privateStateDiff)
      GameObject.addPrivateStateDiff(builder, privateStateDiff);
    return GameObject.endGameObject(builder);
  }
}
