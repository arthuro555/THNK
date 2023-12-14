declare namespace gdjs {
    /**
     * PathfindingRuntimeBehavior represents a behavior allowing objects to
     * follow a path computed to avoid obstacles.
     */
    class PathfindingRuntimeBehavior extends gdjs.RuntimeBehavior {
        _path: Array<FloatPoint>;
        /** Used by the path simplification algorithm */
        static _smoothingResultVertices: Array<FloatPoint>;
        /** Used by the path simplification algorithm */
        static _smoothingWorkingVertices: Array<FloatPoint>;
        _allowDiagonals: boolean;
        _acceleration: float;
        _maxSpeed: float;
        _angularMaxSpeed: float;
        _rotateObject: boolean;
        _angleOffset: float;
        _cellWidth: float;
        _cellHeight: float;
        _gridOffsetX: float;
        _gridOffsetY: float;
        _extraBorder: float;
        _smoothingMaxCellGap: float;
        _pathFound: boolean;
        _speed: float;
        _angularSpeed: float;
        _distanceOnSegment: float;
        _totalSegmentDistance: float;
        _currentSegment: integer;
        _reachedEnd: boolean;
        _manager: PathfindingObstaclesManager;
        _searchContext: PathfindingRuntimeBehavior.SearchContext;
        _movementAngle: float;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        setCellWidth(width: float): void;
        getCellWidth(): float;
        setCellHeight(height: float): void;
        getCellHeight(): float;
        setGridOffsetX(gridOffsetX: float): void;
        getGridOffsetX(): float;
        setGridOffsetY(gridOffsetY: float): void;
        getGridOffsetY(): float;
        setAcceleration(acceleration: float): void;
        getAcceleration(): number;
        setMaxSpeed(maxSpeed: float): void;
        getMaxSpeed(): number;
        setSpeed(speed: float): void;
        getSpeed(): number;
        getMovementAngle(): number;
        movementAngleIsAround(degreeAngle: float, tolerance: float): boolean;
        setAngularMaxSpeed(angularMaxSpeed: float): void;
        getAngularMaxSpeed(): number;
        setAngleOffset(angleOffset: float): void;
        getAngleOffset(): number;
        setExtraBorder(extraBorder: any): void;
        getExtraBorder(): number;
        allowDiagonals(allow: boolean): void;
        diagonalsAllowed(): boolean;
        setRotateObject(allow: boolean): void;
        isObjectRotated(): boolean;
        getNodeX(index: integer): float;
        getNodeY(index: integer): float;
        getNextNodeIndex(): number;
        getNodeCount(): integer;
        getNextNodeX(): float;
        getNextNodeY(): float;
        getLastNodeX(): float;
        getLastNodeY(): float;
        getDestinationX(): float;
        getDestinationY(): float;
        /**
         * Return true if the latest call to moveTo succeeded.
         */
        pathFound(): boolean;
        /**
         * Return true if the object reached its destination.
         */
        destinationReached(): boolean;
        /**
         * Compute and move on the path to the specified destination.
         */
        moveTo(instanceContainer: gdjs.RuntimeInstanceContainer, x: float, y: float): void;
        _enterSegment(segmentNumber: integer): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * Compute the euclidean distance between two positions.
         * @memberof gdjs.PathfindingRuntimeBehavior
         */
        static euclideanDistance(a: FloatPoint, b: FloatPoint): number;
        /**
         * Compute the taxi distance between two positions.
         * @memberof gdjs.PathfindingRuntimeBehavior
         */
        static manhattanDistance(a: FloatPoint, b: FloatPoint): number;
    }
    namespace PathfindingRuntimeBehavior {
        /**
         * Internal tool class representing a node when looking for a path
         */
        class Node {
            pos: FloatPoint;
            cost: integer;
            smallestCost: integer;
            estimateCost: integer;
            parent: Node | null;
            open: boolean;
            constructor(xPos: integer, yPos: integer);
            reinitialize(xPos: integer, yPos: integer): void;
        }
        /**
         * Internal tool class containing the structures used by A* and members functions related
         * to them.
         * @ignore
         */
        class SearchContext {
            _obstacles: PathfindingObstaclesManager;
            _finalNode: Node | null;
            _destination: FloatPoint;
            _start: FloatPoint;
            _startX: float;
            _startY: float;
            _allowDiagonals: boolean;
            _maxComplexityFactor: integer;
            _cellWidth: float;
            _cellHeight: float;
            _gridOffsetX: float;
            _gridOffsetY: float;
            _leftBorder: integer;
            _rightBorder: integer;
            _topBorder: integer;
            _bottomBorder: integer;
            _distanceFunction: (pt1: FloatPoint, pt2: FloatPoint) => float;
            _allNodes: Node[][];
            _openNodes: Node[];
            _closeObstacles: gdjs.PathfindingObstacleRuntimeBehavior[];
            _nodeCache: Node[];
            constructor(obstacles: PathfindingObstaclesManager);
            setObstacles(obstacles: PathfindingObstaclesManager): PathfindingRuntimeBehavior.SearchContext;
            getFinalNode(): Node | null;
            allowDiagonals(allowDiagonals: boolean): this;
            setStartPosition(x: float, y: float): PathfindingRuntimeBehavior.SearchContext;
            setObjectSize(leftBorder: integer, topBorder: integer, rightBorder: integer, bottomBorder: integer): PathfindingRuntimeBehavior.SearchContext;
            setCellSize(cellWidth: float, cellHeight: float): PathfindingRuntimeBehavior.SearchContext;
            setGridOffset(gridOffsetX: float, gridOffsetY: float): PathfindingRuntimeBehavior.SearchContext;
            computePathTo(targetX: float, targetY: float): boolean | undefined;
            _freeAllNodes(): void;
            /**
             * Insert the neighbors of the current node in the open list
             * (Only if they are not closed, and if the cost is better than the already existing smallest cost).
             */
            _insertNeighbors(currentNode: Node): void;
            /**
             * Get (or dynamically construct) a node.
             *
             * *All* nodes should be created using this method: The cost of the node is computed thanks
             * to the objects flagged as obstacles.
             */
            _getNode(xPos: integer, yPos: integer): Node;
            /**
             * Add a node to the openNodes (only if the cost to reach it is less than the existing cost, if any).
             */
            _addOrUpdateNode(newNodeX: integer, newNodeY: integer, currentNode: Node, factor: float): void;
        }
    }
}
