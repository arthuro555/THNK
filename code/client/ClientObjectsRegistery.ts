export class ClientObjectsRegistery {
  private readonly objectsRegistery = new Map<number, gdjs.RuntimeObject>();
  private readonly runtimeScene: gdjs.RuntimeScene;

  constructor(runtimeScene: gdjs.RuntimeScene) {
    this.runtimeScene = runtimeScene;
  }

  registerObject(id: number, runtimeObject: gdjs.RuntimeObject) {
    runtimeObject.thnkID = id;
    this.objectsRegistery.set(id, runtimeObject);
  }

  getObject(id: number) {
    return this.objectsRegistery.get(id);
  }

  deleteObject(id: number) {
    const obj = this.objectsRegistery.get(id);
    if (!obj) return;
    obj.deleteFromScene(this.runtimeScene);
    this.objectsRegistery.delete(id);
  }

  clear() {
    this.objectsRegistery.forEach((runtimeObject) =>
      runtimeObject.deleteFromScene(this.runtimeScene)
    );
    this.objectsRegistery.clear();
  }
}
