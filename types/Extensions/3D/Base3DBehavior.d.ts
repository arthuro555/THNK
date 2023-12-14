declare namespace gdjs {
    interface Base3DHandler {
        /**
         * Set the object position on the Z axis.
         */
        setZ(z: float): void;
        /**
         * Get the object position on the Z axis.
         */
        getZ(): float;
        /**
         * Return the Z position of the object center, **relative to the scene origin**.
         */
        getCenterZInScene(): float;
        /**
         * Change the object center Z position in the scene.
         * @param z The new Z position of the center in the scene.
         */
        setCenterZInScene(z: float): void;
        /**
         * Set the object rotation on the X axis.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         *
         * @param angle the rotation angle on the X axis in degree
         */
        setRotationX(angle: float): void;
        /**
         * Set the object rotation on the Y axis.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         *
         * @param angle the rotation angle on the Y axis in degree
         */
        setRotationY(angle: float): void;
        /**
         * Get the object rotation on the X axis in degree.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         */
        getRotationX(): float;
        /**
         * Get the object rotation on the Y axis in degree.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         */
        getRotationY(): float;
        /**
         * Turn the object around the scene X axis at its center.
         * @param deltaAngle the rotation angle in degree
         */
        turnAroundX(deltaAngle: float): void;
        /**
         * Turn the object around the scene Y axis at its center.
         * @param deltaAngle the rotation angle in degree
         */
        turnAroundY(deltaAngle: float): void;
        /**
         * Turn the object around the scene Z axis at its center.
         * @param deltaAngle the rotation angle in degree
         */
        turnAroundZ(deltaAngle: float): void;
        /**
         * Get the object size on the Z axis (called "depth").
         */
        getDepth(): float;
        /**
         * Set the object size on the Z axis (called "depth").
         */
        setDepth(depth: float): void;
        /**
         * Change the scale on Z axis of the object (changing its depth).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleZ(newScale: number): void;
        /**
         * Get the scale of the object on Z axis.
         *
         * @return the scale of the object on Z axis
         */
        getScaleZ(): float;
        flipZ(enable: boolean): void;
        isFlippedZ(): boolean;
    }
    /**
     * A behavior that forwards the Base3D interface to its object.
     */
    class Base3DBehavior extends gdjs.RuntimeBehavior implements Base3DHandler {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & Base3DHandler);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        setZ(z: float): void;
        getZ(): float;
        getCenterZInScene(): number;
        setCenterZInScene(z: number): void;
        setRotationX(angle: float): void;
        setRotationY(angle: float): void;
        getRotationX(): float;
        getRotationY(): float;
        turnAroundX(deltaAngle: float): void;
        turnAroundY(deltaAngle: float): void;
        turnAroundZ(deltaAngle: float): void;
        getDepth(): float;
        setDepth(depth: float): void;
        setScaleZ(newScale: number): void;
        getScaleZ(): float;
        flipZ(enable: boolean): void;
        isFlippedZ(): boolean;
    }
}
