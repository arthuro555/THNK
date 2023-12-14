declare namespace gdjs {
    namespace evtTools {
        namespace object {
            /**
             * Keep only the specified object in the lists of picked objects.
             *
             * @param objectsLists The lists of objects to trim
             * @param runtimeObject The object to keep in the lists
             */
            const pickOnly: (objectsLists: ObjectsLists, runtimeObject: gdjs.RuntimeObject) => void;
            /**
             * Do a test on two tables of objects so as to pick only the pair of objects for which the test is true.
             *
             * Note that the predicate method is not called strictly for each pair: When considering a pair of objects, if
             * these objects have already been marked as picked, the predicate method won't be called again.
             *
             * Cost (Worst case, predicate being always false):
             *    Cost(Setting property 'picked' of NbObjList1+NbObjList2 objects to false)
             *  + Cost(predicate)*NbObjList1*NbObjList2
             *  + Cost(Testing NbObjList1+NbObjList2 booleans)
             *  + Cost(Removing NbObjList1+NbObjList2 objects from all the lists)
             *
             * Cost (Best case, predicate being always true):
             *    Cost(Setting property 'picked' of NbObjList1+NbObjList2 objects to false)
             *  + Cost(predicate)*(NbObjList1+NbObjList2)
             *  + Cost(Testing NbObjList1+NbObjList2 booleans)
             *
             *
             * @param predicate The predicate function is called with the two objects to compare, and an optional argument `extraArg`
             * @param objectsLists1 The first lists of objects
             * @param objectsLists2 The second lists of objects
             * @param inverted If `inverted` == true, only the objects of the first table are filtered.
             * @param extraArg (optional) This argument should be used to avoid declaring the predicate as a closure that would be created and destroyed at each call to twoListsTest (potentially multiple time per frame).
             */
            const twoListsTest: (predicate: (object1: gdjs.RuntimeObject, object2: gdjs.RuntimeObject, extraArg: any) => boolean, objectsLists1: ObjectsLists, objectsLists2: ObjectsLists, inverted: boolean, extraArg: any) => boolean;
            /**
             * Filter objects to keep only the one that fullfil the predicate
             *
             * Objects that do not fullfil the predicate are removed from objects lists.
             *
             * @param predicate The function applied to each object: must return true if the object fulfill the predicate.
             * @param objectsLists The lists of objects to trim
             * @param negatePredicate If set to true, the result of the predicate is negated.
             * @param extraArg Argument passed to the predicate (along with the object). Useful for avoiding relying on temporary closures.
             * @return true if at least one object fulfill the predicate.
             */
            const pickObjectsIf: (predicate: Function, objectsLists: ObjectsLists, negatePredicate: boolean, extraArg: any) => boolean;
            /**
             * Filter in-place the specified array to remove objects for which
             * `pick` property is set to false.
             */
            const filterPickedObjectsList: (arr: gdjs.RuntimeObject[]) => void;
            const hitBoxesCollisionTest: (objectsLists1: ObjectsLists, objectsLists2: ObjectsLists, inverted: boolean, instanceContainer: gdjs.RuntimeInstanceContainer, ignoreTouchingEdges: boolean) => boolean;
            const _distanceBetweenObjects: (obj1: any, obj2: any, distance: any) => boolean;
            const distanceTest: (objectsLists1: ObjectsLists, objectsLists2: ObjectsLists, distance: float, inverted: boolean) => boolean;
            const _movesToward: (obj1: any, obj2: any, tolerance: any) => boolean;
            const movesTowardTest: (objectsLists1: ObjectsLists, objectsLists2: ObjectsLists, tolerance: float, inverted: boolean) => boolean;
            const _turnedToward: (obj1: any, obj2: any, tolerance: any) => boolean;
            const turnedTowardTest: (objectsLists1: any, objectsLists2: any, tolerance: any, inverted: any) => boolean;
            const pickAllObjects: (objectsContext: any, objectsLists: any) => boolean;
            const pickRandomObject: (instanceContainer: gdjs.RuntimeInstanceContainer, objectsLists: ObjectsLists) => boolean;
            const pickNearestObject: (objectsLists: any, x: any, y: any, inverted: any) => boolean;
            const raycastObject: (objectsLists: ObjectsLists, x: float, y: float, angle: float, dist: float, varX: gdjs.Variable, varY: gdjs.Variable, inverted: boolean) => boolean;
            const raycastObjectToPosition: (objectsLists: ObjectsLists, x: float, y: float, endX: float, endY: float, varX: gdjs.Variable, varY: gdjs.Variable, inverted: boolean) => boolean;
            /**
             * Do the work of creating a new object
             */
            const doCreateObjectOnScene: (objectsContext: EventsFunctionContext | gdjs.RuntimeScene, objectName: string, objectsLists: ObjectsLists, x: float, y: float, layerName: string) => gdjs.RuntimeObject | null;
            /**
             * Allows events to create a new object on a scene.
             */
            const createObjectOnScene: (objectsContext: EventsFunctionContext | gdjs.RuntimeScene, objectsLists: ObjectsLists, x: float, y: float, layerName: string) => gdjs.RuntimeObject | null;
            /**
             * Allows events to create a new object on a scene.
             */
            const createObjectFromGroupOnScene: (objectsContext: EventsFunctionContext | gdjs.RuntimeScene, objectsLists: ObjectsLists, objectName: string, x: float, y: float, layerName: string) => void;
            /**
             * Return the number of instances in the specified lists of objects.
             */
            const getPickedInstancesCount: (objectsLists: ObjectsLists) => number;
            /**
             * Return the number of instances of the specified objects living on the scene.
             */
            const getSceneInstancesCount: (objectsContext: EventsFunctionContext | gdjs.RuntimeScene, objectsLists: ObjectsLists) => number;
            /** @deprecated */
            const pickedObjectsCount: (objectsLists: ObjectsLists) => number;
        }
    }
    /**
     * A container for objects lists that should last more than the current frame.
     * It automatically removes objects that were destroyed from the objects lists.
     */
    class LongLivedObjectsList {
        private objectsLists;
        private callbacks;
        private parent;
        /**
         * Create a new container for objects lists, inheriting from another one. This is
         * useful should we get the objects that have not been saved in this context (using
         * `addObject`) but saved in a parent context.
         * This avoids to save all object lists every time we create a new `LongLivedObjectsList`,
         * despite not all objects lists being used.
         *
         * @param parent
         * @returns
         */
        static from(parent: LongLivedObjectsList): LongLivedObjectsList;
        private getOrCreateList;
        getObjects(objectName: string): RuntimeObject[];
        addObject(objectName: string, runtimeObject: gdjs.RuntimeObject): void;
        removeObject(objectName: string, runtimeObject: gdjs.RuntimeObject): void;
    }
}
