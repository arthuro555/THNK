declare namespace gdjs {
    namespace physics2 {
        const objectsCollide: (objectsLists1: Hashtable<Array<gdjs.RuntimeObject>>, behaviorName: string, objectsLists2: Hashtable<Array<gdjs.RuntimeObject>>, inverted: boolean) => boolean;
        const haveObjectsStartedColliding: (objectsLists1: Hashtable<Array<gdjs.RuntimeObject>>, behaviorName: string, objectsLists2: Hashtable<Array<gdjs.RuntimeObject>>, inverted: boolean) => boolean;
        const haveObjectsStoppedColliding: (objectsLists1: Hashtable<Array<gdjs.RuntimeObject>>, behaviorName: string, objectsLists2: Hashtable<Array<gdjs.RuntimeObject>>, inverted: boolean) => boolean;
        const setTimeScale: (objectsLists: any, behavior: any, timeScale: any) => void;
    }
}
