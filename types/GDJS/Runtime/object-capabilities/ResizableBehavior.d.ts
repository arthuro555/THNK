declare namespace gdjs {
    interface Resizable {
        /**
         * Change the width of the object. This changes the scale on X axis of the object.
         *
         * @param newWidth The new width of the object, in pixels.
         */
        setWidth(newWidth: float): void;
        /**
         * Change the height of the object. This changes the scale on Y axis of the object.
         *
         * @param newHeight The new height of the object, in pixels.
         */
        setHeight(newHeight: float): void;
        /**
         * Change the size of the object.
         *
         * @param newWidth The new width of the object, in pixels.
         * @param newHeight The new height of the object, in pixels.
         */
        setSize(newWidth: float, newHeight: float): void;
        /**
         * Return the width of the object.
         * @return The width of the object
         */
        getWidth(): float;
        /**
         * Return the width of the object.
         * @return The height of the object
         */
        getHeight(): float;
    }
    /**
     * A behavior that forwards the Resizable interface to its object.
     */
    class ResizableBehavior extends gdjs.RuntimeBehavior implements Resizable {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & Resizable);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        setWidth(newWidth: float): void;
        setHeight(newHeight: float): void;
        setSize(newWidth: float, newHeight: float): void;
        getWidth(): float;
        getHeight(): float;
    }
}
