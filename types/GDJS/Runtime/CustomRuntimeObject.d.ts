declare namespace gdjs {
    type ObjectConfiguration = {
        content: any;
    };
    type CustomObjectConfiguration = ObjectConfiguration & {
        childrenContent: {
            [objectName: string]: ObjectConfiguration & any;
        };
    };
    /**
     * An object that contains other object.
     *
     * This is the base class for objects generated from EventsBasedObject.
     *
     * @see gdjs.CustomRuntimeObjectInstanceContainer
     */
    class CustomRuntimeObject extends gdjs.RuntimeObject implements gdjs.Resizable, gdjs.Scalable, gdjs.Flippable, gdjs.OpacityHandler {
        /** It contains the children of this object. */
        _instanceContainer: gdjs.CustomRuntimeObjectInstanceContainer;
        _isUntransformedHitBoxesDirty: boolean;
        /** It contains shallow copies of the children hitboxes */
        _untransformedHitBoxes: gdjs.Polygon[];
        /** The dimension of this object is calculated from its children AABBs. */
        _unrotatedAABB: AABB;
        _scaleX: float;
        _scaleY: float;
        _flippedX: boolean;
        _flippedY: boolean;
        opacity: float;
        _customCenter: FloatPoint | null;
        _localTransformation: gdjs.AffineTransformation;
        _localInverseTransformation: gdjs.AffineTransformation;
        _isLocalTransformationDirty: boolean;
        /**
         * @param parent The container the object belongs to
         * @param objectData The object data used to initialize the object
         */
        constructor(parent: gdjs.RuntimeInstanceContainer, objectData: ObjectData & CustomObjectConfiguration);
        reinitialize(objectData: ObjectData & CustomObjectConfiguration): void;
        updateFromObjectData(oldObjectData: ObjectData & CustomObjectConfiguration, newObjectData: ObjectData & CustomObjectConfiguration): boolean;
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        onDeletedFromScene(parent: gdjs.RuntimeInstanceContainer): void;
        update(parent: gdjs.RuntimeInstanceContainer): void;
        /**
         * This method is called when the preview is being hot-reloaded.
         */
        onHotReloading(parent: gdjs.RuntimeInstanceContainer): void;
        doStepPreEvents(parent: gdjs.RuntimeInstanceContainer): void;
        /**
         * This method is called each tick after events are done.
         * @param parent The instanceContainer owning the object
         */
        doStepPostEvents(parent: gdjs.RuntimeInstanceContainer): void;
        /**
         * This method is called when the object is being removed from its parent
         * container and is about to be destroyed/reused later.
         */
        onDestroy(parent: gdjs.RuntimeInstanceContainer): void;
        updatePreRender(parent: gdjs.RuntimeInstanceContainer): void;
        getRendererObject(): import("pixi.js").Container<import("pixi.js").DisplayObject>;
        getRenderer(): CustomObjectPixiRenderer;
        onChildrenLocationChanged(): void;
        updateHitBoxes(): void;
        /**
         * Merge the hitboxes of the children.
         */
        _updateUntransformedHitBoxes(): void;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in parent coordinate coordinates (as opposed to the object local coordinates).
         *
         * All transformations (flipping, scale, rotation) are supported.
         *
         * @param x The X position of the point, in object coordinates.
         * @param y The Y position of the point, in object coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in parent coordinates).
         */
        applyObjectTransformation(x: float, y: float, destination: FloatPoint): void;
        /**
         * Return the affine transformation that represents
         * flipping, scale, rotation and translation of the object.
         * @returns the affine transformation.
         */
        getLocalTransformation(): gdjs.AffineTransformation;
        getLocalInverseTransformation(): gdjs.AffineTransformation;
        _updateLocalTransformation(): void;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in object local coordinates (as opposed to the parent coordinate coordinates).
         *
         * All transformations (flipping, scale, rotation) are supported.
         *
         * @param x The X position of the point, in parent coordinates.
         * @param y The Y position of the point, in parent coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in object coordinates).
         */
        applyObjectInverseTransformation(x: float, y: float, destination: FloatPoint): void;
        getDrawableX(): float;
        getDrawableY(): float;
        /**
         * @return the internal width of the object according to its children.
         */
        getUnscaledWidth(): float;
        /**
         * @return the internal height of the object according to its children.
         */
        getUnscaledHeight(): float;
        /**
         * @returns the center X from the local origin (0;0).
         */
        getUnscaledCenterX(): float;
        /**
         * @returns the center Y from the local origin (0;0).
         */
        getUnscaledCenterY(): float;
        /**
         * The center of rotation is defined relatively to the origin (the object
         * position).
         * This avoids the center to move when children push the bounds.
         *
         * When no custom center is defined, it will move
         * to stay at the center of the children bounds.
         *
         * @param x coordinate of the custom center
         * @param y coordinate of the custom center
         */
        setRotationCenter(x: float, y: float): void;
        getCenterX(): float;
        getCenterY(): float;
        getWidth(): float;
        getHeight(): float;
        setWidth(newWidth: float): void;
        setHeight(newHeight: float): void;
        /**
         * Change the size of the object.
         *
         * @param newWidth The new width of the object, in pixels.
         * @param newHeight The new height of the object, in pixels.
         */
        setSize(newWidth: float, newHeight: float): void;
        setX(x: float): void;
        setY(y: float): void;
        setAngle(angle: float): void;
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
         * Get the scale of the object (or the arithmetic mean of the X and Y scale in case they are different).
         *
         * @return the scale of the object (or the arithmetic mean of the X and Y scale in case they are different).
         * @deprecated Use `getScale` instead.
         */
        getScaleMean(): float;
        /**
         * Get the scale of the object (or the geometric mean of the X and Y scale in case they are different).
         *
         * @return the scale of the object (or the geometric mean of the X and Y scale in case they are different).
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
        setOpacity(opacity: float): void;
        getOpacity(): number;
        /**
         * Hide (or show) the object
         * @param enable true to hide the object, false to show it again.
         */
        hide(enable: boolean): void;
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
    }
}
