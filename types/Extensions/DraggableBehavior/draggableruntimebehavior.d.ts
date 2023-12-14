declare namespace gdjs {
    /**
     * The DraggableRuntimeBehavior represents a behavior allowing objects to be
     * moved using the mouse.
     */
    export class DraggableRuntimeBehavior extends gdjs.RuntimeBehavior {
        /**
         * The manager that currently handles the dragging of the owner if any.
         * When the owner is being dragged, no other manager can start dragging it.
         */
        _draggedByDraggableManager: DraggableManager | null;
        _checkCollisionMask: boolean;
        _justDropped: boolean;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: any);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        _endDrag(): void;
        _dismissDrag(): void;
        _tryBeginDrag(instanceContainer: gdjs.RuntimeInstanceContainer): boolean;
        _shouldEndDrag(instanceContainer: gdjs.RuntimeInstanceContainer): boolean;
        _updateObjectPosition(instanceContainer: gdjs.RuntimeInstanceContainer): boolean;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        isDragged(): boolean;
        wasJustDropped(): boolean;
    }
    /**
     * Handle the dragging
     */
    class DraggableManager {
        private _touchId;
        /**
         * The object has left its original position.
         * When true, the search for the best object to drag has ended.
         */
        protected _draggingSomething: boolean;
        /**
         * The behavior of the object that is being dragged and that is the best one (i.e: highest Z order) found.
         */
        protected _draggableBehavior: gdjs.DraggableRuntimeBehavior | null;
        protected _xOffset: number;
        protected _yOffset: number;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, touchId: integer);
        /**
         * Get the platforms manager of an instance container.
         */
        static getTouchManager(instanceContainer: gdjs.RuntimeInstanceContainer, touchId: integer): DraggableManager;
        tryAndTakeDragging(instanceContainer: gdjs.RuntimeInstanceContainer, draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
        updateObjectPosition(instanceContainer: gdjs.RuntimeInstanceContainer, draggableRuntimeBehavior: DraggableRuntimeBehavior): void;
        endDrag(): void;
        isDragging(draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
        getPosition(instanceContainer: gdjs.RuntimeInstanceContainer, draggableRuntimeBehavior: DraggableRuntimeBehavior): FloatPoint;
        shouldEndDrag(instanceContainer: gdjs.RuntimeInstanceContainer, draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
    }
    export {};
}
