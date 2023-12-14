declare namespace gdjs {
    /**
     * Manages the links between objects.
     */
    class LinksManager {
        private _links;
        /**
         * Get the links manager of a scene.
         */
        static getManager(instanceContainer: gdjs.RuntimeInstanceContainer): gdjs.LinksManager;
        /**
         * This function is for internal use and could disappear in next versions.
         * Prefer using:
         * * {@link LinksManager.getObjectsLinkedWithAndNamed}
         * * {@link LinksManager.getObjectsLinkedWith}
         * * {@link evtTools.linkedObjects.quickPickObjectsLinkedTo}
         *
         * @param objA
         * @returns the linked objects by name
         */
        _getMapOfObjectsLinkedWith(objA: gdjs.RuntimeObject): Map<string, gdjs.RuntimeObject[]>;
        /**
         * @returns an iterable on every object linked with objA.
         */
        getObjectsLinkedWith(objA: gdjs.RuntimeObject): Iterable<gdjs.RuntimeObject>;
        /**
         * @returns an iterable of the objects with the given name that are linked with objA.
         */
        getObjectsLinkedWithAndNamed(objA: gdjs.RuntimeObject, objectName: string): Iterable<gdjs.RuntimeObject>;
        linkObjects(objA: gdjs.RuntimeObject, objB: gdjs.RuntimeObject): void;
        removeAllLinksOf(removedObject: gdjs.RuntimeObject): void;
        removeLinkBetween(objA: gdjs.RuntimeObject, objB: gdjs.RuntimeObject): void;
    }
    namespace evtTools {
        namespace linkedObjects {
            const linkObjects: (instanceContainer: gdjs.RuntimeInstanceContainer, objA: gdjs.RuntimeObject | null, objB: gdjs.RuntimeObject | null) => void;
            const removeLinkBetween: (instanceContainer: gdjs.RuntimeInstanceContainer, objA: gdjs.RuntimeObject | null, objB: gdjs.RuntimeObject | null) => void;
            const removeAllLinksOf: (instanceContainer: gdjs.RuntimeInstanceContainer, objA: gdjs.RuntimeObject) => void;
            const pickObjectsLinkedTo: (instanceContainer: gdjs.RuntimeInstanceContainer, objectsLists: Hashtable<gdjs.RuntimeObject[]>, obj: gdjs.RuntimeObject | null, eventsFunctionContext: EventsFunctionContext | undefined) => boolean;
        }
    }
}
