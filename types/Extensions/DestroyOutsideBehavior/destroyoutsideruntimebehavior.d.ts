declare namespace gdjs {
    /**
     * The DestroyOutsideRuntimeBehavior represents a behavior allowing objects to be
     * moved using the mouse.
     */
    class DestroyOutsideRuntimeBehavior extends gdjs.RuntimeBehavior {
        _extraBorder: any;
        constructor(runtimeScene: any, behaviorData: any, owner: any);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        doStepPostEvents(runtimeScene: any): void;
        /**
         * Set an additional border to the camera viewport as a buffer before the object gets destroyed.
         * @param val Border in pixels.
         */
        setExtraBorder(val: number): void;
        /**
         * Get the additional border of the camera viewport buffer which triggers the destruction of an object.
         * @return The additional border around the camera viewport in pixels
         */
        getExtraBorder(): number;
    }
}
