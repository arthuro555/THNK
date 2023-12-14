declare namespace gdjs {
    /**
     * Manages the common objects shared by objects having a
     * platform behavior: in particular, the platforms behaviors are required to
     * declare themselves (see PlatformObjectsManager.addPlatform) to the manager
     * of their associated container (see PlatformRuntimeBehavior.getManager).
     */
    class PlatformObjectsManager {
        private _platformRBush;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer);
        /**
         * Get the platforms manager of an instance container.
         */
        static getManager(instanceContainer: gdjs.RuntimeInstanceContainer): any;
        /**
         * Add a platform to the list of existing platforms.
         */
        addPlatform(platformBehavior: gdjs.PlatformRuntimeBehavior): void;
        /**
         * Remove a platform from the list of existing platforms. Be sure that the platform was
         * added before.
         */
        removePlatform(platformBehavior: gdjs.PlatformRuntimeBehavior): void;
        /**
         * Returns all the platforms around the specified object.
         * @param maxMovementLength The maximum distance, in pixels, the object is going to do.
         * @return An array with all platforms near the object.
         */
        getAllPlatformsAround(object: gdjs.RuntimeObject, maxMovementLength: number, result: PlatformRuntimeBehavior[]): any;
    }
    /**
     * PlatformRuntimeBehavior represents a behavior allowing objects to be
     * considered as a platform by objects having PlatformerObject Behavior.
     */
    class PlatformRuntimeBehavior extends gdjs.RuntimeBehavior {
        _platformType: integer;
        _canBeGrabbed: boolean;
        _yGrabOffset: float;
        _oldX: float;
        _oldY: float;
        _oldWidth: float;
        _oldHeight: float;
        _oldAngle: float;
        currentRBushAABB: gdjs.BehaviorRBushAABB<PlatformRuntimeBehavior> | null;
        _manager: gdjs.PlatformObjectsManager;
        _registeredInManager: boolean;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        onActivate(): void;
        onDeActivate(): void;
        changePlatformType(platformType: string): void;
        getPlatformType(): number;
        canBeGrabbed(): boolean;
        getYGrabOffset(): number;
        static NORMALPLATFORM: number;
        /** @deprecated Use NORMALPLATFORM instead. */
        static NORMALPLAFTORM: number;
        static JUMPTHRU: number;
        static LADDER: number;
        static isOnPlatformTest(object1: gdjs.RuntimeObject, object2: gdjs.RuntimeObject, behaviorName: string): boolean;
    }
}
