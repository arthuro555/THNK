declare namespace gdjs {
    interface Scalable {
        /**
         * Change the scale on X and Y axis of the object.
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScale(newScale: float): void;
        /**
         * Change the scale on X axis of the object (changing its width).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleX(newScale: float): void;
        /**
         * Change the scale on Y axis of the object (changing its height).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleY(newScale: float): void;
        /**
         * Get the scale of the object (or the geometric mean of the X and Y scale
         * in case they are different).
         *
         * @return the scale of the object (or the geometric mean of the X and
         * Y scale in case they are different).
         */
        getScale(): float;
        /**
         * Get the scale of the object on Y axis.
         *
         * @return the scale of the object on Y axis
         */
        getScaleY(): float;
        /**
         * Get the scale of the object on X axis.
         *
         * @return the scale of the object on X axis
         */
        getScaleX(): float;
    }
    /**
     * A behavior that forwards the Scalable interface to its object.
     */
    class ScalableBehavior extends gdjs.RuntimeBehavior implements Scalable {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & Scalable);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        setScale(newScale: float): void;
        setScaleX(newScale: float): void;
        setScaleY(newScale: float): void;
        getScale(): float;
        getScaleY(): float;
        getScaleX(): float;
    }
}
