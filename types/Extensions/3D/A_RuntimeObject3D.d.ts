declare namespace gdjs {
    interface Object3DDataContent {
        width: float;
        height: float;
        depth: float;
    }
    /** Base parameters for {@link gdjs.RuntimeObject3D} */
    interface Object3DData extends ObjectData {
        /** The base parameters of the RuntimeObject3D */
        content: Object3DDataContent;
    }
    /**
     * Base class for 3D objects.
     */
    abstract class RuntimeObject3D extends gdjs.RuntimeObject implements gdjs.Resizable, gdjs.Scalable, gdjs.Flippable, gdjs.Base3DHandler {
        /**
         * Position on the Z axis.
         */
        private _z;
        /**
         * `_width` takes this value when the scale equals 1.
         *
         * It can't be 0.
         */
        private _originalWidth;
        /**
         * `_height` takes this value when the scale equals 1.
         *
         * It can't be 0.
         */
        private _originalHeight;
        /**
         * `depth` takes this value when the scale equals 1.
         *
         * It can't be 0.
         */
        private _originalDepth;
        private _width;
        private _height;
        private _depth;
        private _flippedX;
        private _flippedY;
        private _flippedZ;
        /**
         * Euler angle with the `ZYX` order.
         *
         * Note that `_rotationZ` is `angle` from `gdjs.RuntimeObject`.
         */
        private _rotationX;
        /**
         * Euler angle with the `ZYX` order.
         *
         * Note that `_rotationZ` is `angle` from `gdjs.RuntimeObject`.
         */
        private _rotationY;
        private static _temporaryVector;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, objectData: Object3DData);
        abstract getRenderer(): gdjs.RuntimeObject3DRenderer;
        getRendererObject(): null;
        get3DRendererObject(): THREE.Object3D<THREE.Event>;
        updateFromObjectData(oldObjectData: Object3DData, newObjectData: Object3DData): boolean;
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        setX(x: float): void;
        setY(y: float): void;
        /**
         * Set the object position on the Z axis.
         */
        setZ(z: float): void;
        /**
         * Get the object position on the Z axis.
         */
        getZ(): float;
        /**
         * Get the Z position of the rendered object.
         *
         * For most objects, this will returns the same value as getZ(). But if the
         * object has an origin that is not the same as the point (0,0,0) of the
         * object displayed, getDrawableZ will differ.
         *
         * @return The Z position of the rendered object.
         */
        getDrawableZ(): float;
        /**
         * Return the Z position of the object center, **relative to the object Z
         * position** (`getDrawableX`).
         *
         * Use `getCenterZInScene` to get the position of the center in the scene.
         *
         * @return the Z position of the object center, relative to
         * `getDrawableZ()`.
         */
        getCenterZ(): float;
        getCenterZInScene(): float;
        setCenterZInScene(z: float): void;
        setAngle(angle: float): void;
        /**
         * Set the object rotation on the X axis.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         */
        setRotationX(angle: float): void;
        /**
         * Set the object rotation on the Y axis.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         */
        setRotationY(angle: float): void;
        /**
         * Get the object rotation on the X axis.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         */
        getRotationX(): float;
        /**
         * Get the object rotation on the Y axis.
         *
         * This is an Euler angle. Objects use the `ZYX` order.
         */
        getRotationY(): float;
        /**
         * Turn the object around the scene x axis at its center.
         * @param deltaAngle the rotation angle
         */
        turnAroundX(deltaAngle: float): void;
        /**
         * Turn the object around the scene y axis at its center.
         * @param deltaAngle the rotation angle
         */
        turnAroundY(deltaAngle: float): void;
        /**
         * Turn the object around the scene z axis at its center.
         * @param deltaAngle the rotation angle
         */
        turnAroundZ(deltaAngle: float): void;
        getWidth(): float;
        getHeight(): float;
        /**
         * Get the object size on the Z axis (called "depth").
         */
        getDepth(): float;
        setWidth(width: float): void;
        setHeight(height: float): void;
        setSize(newWidth: number, newHeight: number): void;
        /**
         * Set the object size on the Z axis (called "depth").
         */
        setDepth(depth: float): void;
        /**
         * Return the width of the object for a scale of 1.
         *
         * It can't be 0.
         */
        _getOriginalWidth(): float;
        /**
         * Return the height of the object for a scale of 1.
         *
         * It can't be 0.
         */
        _getOriginalHeight(): float;
        /**
         * Return the object size on the Z axis (called "depth") when the scale equals 1.
         */
        _getOriginalDepth(): float;
        /**
         * Set the width of the object for a scale of 1.
         */
        _setOriginalWidth(originalWidth: float): void;
        /**
         * Set the height of the object for a scale of 1.
         */
        _setOriginalHeight(originalHeight: float): void;
        /**
         * Set the object size on the Z axis (called "depth") when the scale equals 1.
         */
        _setOriginalDepth(originalDepth: float): void;
        /**
         * Change the scale on X, Y and Z axis of the object.
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScale(newScale: number): void;
        /**
         * Change the scale on X axis of the object (changing its width).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleX(newScale: number): void;
        /**
         * Change the scale on Y axis of the object (changing its height).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleY(newScale: number): void;
        /**
         * Change the scale on Z axis of the object (changing its height).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleZ(newScale: number): void;
        /**
         * Get the scale of the object (or the geometric average of X, Y and Z scale in case they are different).
         *
         * @return the scale of the object (or the geometric average of X, Y and Z scale in case they are different).
         */
        getScale(): number;
        /**
         * Get the scale of the object on X axis.
         *
         * @return the scale of the object on X axis
         */
        getScaleX(): float;
        /**
         * Get the scale of the object on Y axis.
         *
         * @return the scale of the object on Y axis
         */
        getScaleY(): float;
        /**
         * Get the scale of the object on Z axis.
         *
         * @return the scale of the object on Z axis
         */
        getScaleZ(): float;
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        flipZ(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
        isFlippedZ(): boolean;
        hide(enable: boolean): void;
    }
}
