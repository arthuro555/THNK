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
        constructor(runtimeScene: any, behaviorData: any, owner: any);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        _endDrag(): void;
        _dismissDrag(): void;
        _tryBeginDrag(runtimeScene: any): boolean;
        _shouldEndDrag(runtimeScene: any): boolean;
        _updateObjectPosition(runtimeScene: any): boolean;
        doStepPreEvents(runtimeScene: any): void;
        doStepPostEvents(runtimeScene: any): void;
        isDragged(runtimeScene: any): boolean;
    }
    /**
     * Handle the dragging
     */
    abstract class DraggableManager {
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
        constructor(runtimeScene: gdjs.RuntimeScene);
        /**
         * Get the platforms manager of a scene.
         */
        static getMouseManager(runtimeScene: gdjs.RuntimeScene): MouseDraggableManager;
        /**
         * Get the platforms manager of a scene.
         */
        static getTouchManager(runtimeScene: gdjs.RuntimeScene, touchId: integer): DraggableManager;
        tryAndTakeDragging(runtimeScene: gdjs.RuntimeScene, draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
        updateObjectPosition(runtimeScene: gdjs.RuntimeScene, draggableRuntimeBehavior: DraggableRuntimeBehavior): void;
        endDrag(): void;
        abstract isDragging(draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
        abstract shouldEndDrag(runtimeScene: gdjs.RuntimeScene, draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
        abstract getPosition(runtimeScene: gdjs.RuntimeScene, draggableRuntimeBehavior: DraggableRuntimeBehavior): FloatPoint;
    }
    /**
     * Handle the dragging by mouse
     */
    class MouseDraggableManager extends DraggableManager {
        /** Used to only start dragging when clicking. */
        leftPressedLastFrame: boolean;
        constructor(runtimeScene: gdjs.RuntimeScene);
        isDragging(draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
        getPosition(runtimeScene: gdjs.RuntimeScene, draggableRuntimeBehavior: DraggableRuntimeBehavior): FloatPoint;
        shouldEndDrag(runtimeScene: gdjs.RuntimeScene, draggableRuntimeBehavior: DraggableRuntimeBehavior): boolean;
    }
    export {};
}
