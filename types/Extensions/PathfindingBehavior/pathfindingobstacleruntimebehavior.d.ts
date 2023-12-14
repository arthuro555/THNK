declare namespace gdjs {
    interface RuntimeInstanceContainer {
        pathfindingObstaclesManager: gdjs.PathfindingObstaclesManager;
    }
    /**
     * PathfindingObstaclesManager manages the common objects shared by objects
     * having a pathfinding behavior: In particular, the obstacles behaviors are
     * required to declare themselves (see
     * `PathfindingObstaclesManager.addObstacle`) to the manager of their
     * associated container (see
     * `gdjs.PathfindingRuntimeBehavior.obstaclesManagers`).
     */
    class PathfindingObstaclesManager {
        _obstaclesRBush: any;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer);
        /**
         * Get the obstacles manager of an instance container.
         */
        static getManager(instanceContainer: gdjs.RuntimeInstanceContainer): PathfindingObstaclesManager;
        /**
         * Add a obstacle to the list of existing obstacles.
         */
        addObstacle(pathfindingObstacleBehavior: PathfindingObstacleRuntimeBehavior): void;
        /**
         * Remove a obstacle from the list of existing obstacles. Be sure that the obstacle was
         * added before.
         */
        removeObstacle(pathfindingObstacleBehavior: PathfindingObstacleRuntimeBehavior): void;
        /**
         * Returns all the platforms around the specified object.
         * @param maxMovementLength The maximum distance, in pixels, the object is going to do.
         * @return An array with all platforms near the object.
         */
        getAllObstaclesAround(x: float, y: float, radius: float, result: gdjs.PathfindingObstacleRuntimeBehavior[]): void;
    }
    /**
     * PathfindingObstacleRuntimeBehavior represents a behavior allowing objects to be
     * considered as a obstacle by objects having Pathfinding Behavior.
     */
    class PathfindingObstacleRuntimeBehavior extends gdjs.RuntimeBehavior {
        _impassable: boolean;
        _cost: float;
        _oldX: float;
        _oldY: float;
        _oldWidth: float;
        _oldHeight: float;
        _manager: PathfindingObstaclesManager;
        _registeredInManager: boolean;
        currentRBushAABB: gdjs.BehaviorRBushAABB<PathfindingObstacleRuntimeBehavior> | null;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getAABB(): AABB;
        onActivate(): void;
        onDeActivate(): void;
        getCost(): number;
        setCost(cost: float): void;
        isImpassable(): boolean;
        setImpassable(impassable: boolean): void;
    }
}
