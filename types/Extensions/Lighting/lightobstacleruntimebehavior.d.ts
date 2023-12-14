declare namespace gdjs {
    class LightObstaclesManager {
        _obstacleRBush: any;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer);
        /**
         * Get the light obstacles manager of an instance container.
         */
        static getManager(instanceContainer: gdjs.RuntimeInstanceContainer): gdjs.LightObstaclesManager;
        /**
         * Add a light obstacle to the list of existing obstacles.
         */
        addObstacle(obstacle: gdjs.LightObstacleRuntimeBehavior): void;
        /**
         * Remove a light obstacle from the list of existing obstacles. Be sure that the obstacle was
         * added before.
         */
        removeObstacle(obstacle: gdjs.LightObstacleRuntimeBehavior): void;
        /**
         * Returns all the light obstacles around the specified object.
         * @param object The object
         * @param radius Radius of the area to be searched.
         * @param result An array with all obstacles near the object.
         */
        getAllObstaclesAround(object: gdjs.RuntimeObject, radius: number, result: gdjs.LightObstacleRuntimeBehavior[]): void;
    }
    class LightObstacleRuntimeBehavior extends gdjs.RuntimeBehavior {
        _oldX: float;
        _oldY: float;
        _oldWidth: float;
        _oldHeight: float;
        currentRBushAABB: gdjs.BehaviorRBushAABB<LightObstacleRuntimeBehavior> | null;
        _manager: any;
        _registeredInManager: boolean;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        onDestroy(): void;
        onActivate(): void;
        onDeActivate(): void;
    }
}
