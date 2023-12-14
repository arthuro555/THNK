declare namespace gdjs {
    interface OpacityHandler {
        /**
         * Change the transparency of the object.
         * @param opacity The new opacity, between 0 (transparent) and 255 (opaque).
         */
        setOpacity(opacity: float): void;
        /**
         * Get the transparency of the object.
         * @return The opacity, between 0 (transparent) and 255 (opaque).
         */
        getOpacity(): float;
    }
    /**
     * A behavior that forwards the Opacity interface to its object.
     */
    class OpacityBehavior extends gdjs.RuntimeBehavior implements OpacityHandler {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & OpacityHandler);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        setOpacity(opacity: float): void;
        getOpacity(): float;
    }
}
