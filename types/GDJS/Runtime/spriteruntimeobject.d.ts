declare namespace gdjs {
    /** Represents a point in a coordinate system. */
    type SpritePoint = {
        /** X position of the point. */
        x: number;
        /** Y position of the point. */
        y: number;
    };
    /** Represents a custom point in a frame. */
    type SpriteCustomPointData = {
        /** Name of the point. */
        name: string;
        /** X position of the point. */
        x: number;
        /** Y position of the point. */
        y: number;
    };
    /** Represents the center point in a frame. */
    type SpriteCenterPointData = {
        /** Name of the point. */
        name: string;
        /** Is the center automatically computed? */
        automatic: boolean;
        /** X position of the point. */
        x: number;
        /** Y position of the point. */
        y: number;
    };
    /** Represents a {@link gdjs.SpriteAnimationFrame}. */
    type SpriteFrameData = {
        /** The resource name of the image used in this frame. */
        image: string;
        /** The points of the frame. */
        points: Array<SpriteCustomPointData>;
        /** The origin point. */
        originPoint: SpriteCustomPointData;
        /** The center of the frame. */
        centerPoint: SpriteCenterPointData;
        /** Is The collision mask custom? */
        hasCustomCollisionMask: boolean;
        /** The collision mask if it is custom. */
        customCollisionMask: Array<Array<SpritePoint>>;
    };
    /** Represents the data of a {@link gdjs.SpriteAnimationDirection}. */
    type SpriteDirectionData = {
        /** Time between each frame, in seconds. */
        timeBetweenFrames: number;
        /** Is the animation looping? */
        looping: boolean;
        /** The list of frames. */
        sprites: Array<SpriteFrameData>;
    };
    /** Represents the data of a {@link gdjs.SpriteAnimation}. */
    type SpriteAnimationData = {
        /** The name of the animation. */
        name: string;
        /** Does the animation use multiple {@link gdjs.SpriteAnimationDirection}? */
        useMultipleDirections: boolean;
        /** The list of {@link SpriteDirectionData} representing {@link gdjs.SpriteAnimationDirection} instances. */
        directions: Array<SpriteDirectionData>;
    };
    /** Represents the data of a {@link gdjs.SpriteRuntimeObject}. */
    type SpriteObjectDataType = {
        /** Update the object even if he is not visible?. */
        updateIfNotVisible: boolean;
        /** The list of {@link SpriteAnimationData} representing {@link gdjs.SpriteAnimation} instances. */
        animations: Array<SpriteAnimationData>;
    };
    type SpriteObjectData = ObjectData & SpriteObjectDataType;
    /**
     * A frame used by a SpriteAnimation in a {@link gdjs.SpriteRuntimeObject}.
     *
     * It contains the texture displayed as well as information like the points position
     * or the collision mask.
     */
    class SpriteAnimationFrame {
        image: string;
        texture: any;
        center: SpritePoint;
        origin: SpritePoint;
        hasCustomHitBoxes: boolean;
        customHitBoxes: gdjs.Polygon[];
        points: Hashtable<SpritePoint>;
        /**
         * @param imageManager The game image manager
         * @param frameData The frame data used to initialize the frame
         */
        constructor(imageManager: gdjs.ImageManager, frameData: SpriteFrameData);
        /**
         * @param imageManager The game image manager
         * @param frameData The frame data used to initialize the frame
         */
        reinitialize(imageManager: gdjs.ImageManager, frameData: SpriteFrameData): void;
        /**
         * Get a point of the frame.<br>
         * If the point does not exist, the origin is returned.
         * @param name The point's name
         * @return The requested point. If it doesn't exists returns the origin point.
         */
        getPoint(name: string): SpritePoint;
    }
    /**
     * Represents a direction of an animation of a {@link gdjs.SpriteRuntimeObject}.
     *
     * @param imageManager The game image manager
     * @param directionData The direction data used to initialize the direction
     */
    class SpriteAnimationDirection {
        timeBetweenFrames: number;
        loop: boolean;
        frames: SpriteAnimationFrame[];
        constructor(imageManager: gdjs.PixiImageManager, directionData: SpriteDirectionData);
        /**
         * @param imageManager The game image manager
         * @param directionData The direction data used to initialize the direction
         */
        reinitialize(imageManager: gdjs.ImageManager, directionData: SpriteDirectionData): void;
    }
    /**
     * Represents an animation of a {@link SpriteRuntimeObject}.
     *
     * @param imageManager The game image manager
     * @param animData The animation data used to initialize the animation
     */
    class SpriteAnimation {
        hasMultipleDirections: boolean;
        name: string;
        directions: gdjs.SpriteAnimationDirection[];
        constructor(imageManager: gdjs.PixiImageManager, animData: SpriteAnimationData);
        /**
         * @param imageManager The game image manager
         * @param animData The animation data used to initialize the animation
         */
        reinitialize(imageManager: gdjs.ImageManager, animData: SpriteAnimationData): void;
    }
    /**
     * The SpriteRuntimeObject represents an object that can display images.
     */
    class SpriteRuntimeObject extends gdjs.RuntimeObject implements gdjs.Resizable, gdjs.Scalable, gdjs.Flippable, gdjs.Animatable, gdjs.OpacityHandler {
        _currentAnimation: number;
        _currentDirection: number;
        _currentFrame: number;
        /** In seconds */
        _animationElapsedTime: float;
        _animationSpeedScale: number;
        _animationPaused: boolean;
        _scaleX: number;
        _scaleY: number;
        _blendMode: number;
        _flippedX: boolean;
        _flippedY: boolean;
        opacity: float;
        _updateIfNotVisible: boolean;
        _animations: gdjs.SpriteAnimation[];
        /**
         * Reference to the current SpriteAnimationFrame that is displayed.
         * Verify is `this._animationFrameDirty === true` before using it, and if so
         * call `this._updateAnimationFrame()`.
         * Can be null, so ensure that this case is handled properly.
         */
        _animationFrame: gdjs.SpriteAnimationFrame | null;
        _renderer: gdjs.SpriteRuntimeObjectRenderer;
        _animationFrameDirty: boolean;
        /**
         * @param instanceContainer The container the object belongs to
         * @param spriteObjectData The object data used to initialize the object
         */
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, spriteObjectData: ObjectData & SpriteObjectDataType);
        reinitialize(spriteObjectData: SpriteObjectData): void;
        updateFromObjectData(oldObjectData: SpriteObjectData, newObjectData: SpriteObjectData): boolean;
        /**
         * Initialize the extra parameters that could be set for an instance.
         * @param initialInstanceData The extra parameters
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        /**
         * Update the current frame of the object according to the elapsed time on the scene.
         */
        update(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * Ensure the sprite is ready to be displayed: the proper animation frame
         * is set and the renderer is up to date (position, angle, alpha, flip, blend mode...).
         */
        updatePreRender(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * Update `this._animationFrame` according to the current animation/direction/frame values
         * (`this._currentAnimation`, `this._currentDirection`, `this._currentFrame`) and set
         * `this._animationFrameDirty` back to false.
         *
         * Trigger a call to the renderer to change the texture being shown (if the animation/direction/frame
         * is valid).
         * If invalid, `this._animationFrame` will be `null` after calling this function.
         */
        _updateAnimationFrame(): void;
        getRendererObject(): import("pixi.js").Sprite;
        /**
         * Update the hit boxes for the object.
         * Fallback to the default implementation (rotated bounding box) if there is no custom
         * hitboxes defined for the current animation frame.
         */
        updateHitBoxes(): void;
        /**
         * Change the animation being played.
         * @param newAnimation The index of the new animation to be played
         * @deprecated Use `setAnimationIndex` instead
         */
        setAnimation(newAnimation: number): void;
        setAnimationIndex(newAnimation: number): void;
        setAnimationName(newAnimationName: string): void;
        /**
         * Get the index of the animation being played.
         * @return The index of the new animation being played
         * @deprecated Use `getAnimationIndex` instead
         */
        getAnimation(): number;
        getAnimationIndex(): number;
        getAnimationName(): string;
        isCurrentAnimationName(name: string): boolean;
        /**
         * Change the angle (or direction index) of the object
         * @param The new angle (or direction index) to be applied
         */
        setDirectionOrAngle(newValue: any): void;
        getDirectionOrAngle(): float;
        /**
         * Change the current frame displayed by the animation
         * @param newFrame The index of the frame to be displayed
         */
        setAnimationFrame(newFrame: number): void;
        /**
         * Get the index of the current frame displayed by the animation
         * @return newFrame The index of the frame being displayed
         */
        getAnimationFrame(): number;
        getAnimationElapsedTime(): float;
        setAnimationElapsedTime(time: float): void;
        getAnimationDuration(): number;
        getAnimationFrameCount(): number;
        /**
         * @deprecated
         * Return true if animation has ended.
         * Prefer using `hasAnimationEnded2`. This method returns true as soon as
         * the animation enters the last frame, not at the end of the last frame.
         */
        hasAnimationEndedLegacy(): boolean;
        /**
         * Return true if animation has ended.
         * The animation had ended if:
         * - it's not configured as a loop;
         * - the current frame is the last frame;
         * - the last frame has been displayed long enough.
         *
         * @deprecated Use `hasAnimationEnded` instead.
         */
        hasAnimationEnded2(): boolean;
        hasAnimationEnded(): boolean;
        /**
         * @deprecated Use `isAnimationPaused` instead.
         */
        animationPaused(): boolean;
        isAnimationPaused(): boolean;
        pauseAnimation(): void;
        /**
         * @deprecated Use `resumeAnimation` instead.
         */
        playAnimation(): void;
        resumeAnimation(): void;
        getAnimationSpeedScale(): number;
        setAnimationSpeedScale(ratio: float): void;
        /**
         * Get the position on X axis on the scene of the given point.
         * @param name The point name
         * @return the position on X axis on the scene of the given point.
         */
        getPointX(name: string): float;
        /**
         * Get the position on Y axis on the scene of the given point.
         * @param name The point name
         * @return the position on Y axis on the scene of the given point.
         */
        getPointY(name: string): float;
        /**
         * Get the positions on X and Y axis on the scene of the given point.
         * @param name The point name
         * @return An array of the position on X and Y axis on the scene of the given point.
         */
        getPointPosition(name: string): [x: float, y: float];
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in world coordinates (as opposed to the object local coordinates).
         *
         * Beware: this._animationFrame and this._sprite must *not* be null!
         *
         * All transformations (flipping, scale, rotation) are supported.
         *
         * @param x The X position of the point, in object coordinates.
         * @param y The Y position of the point, in object coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in global coordinates).
         */
        private _transformToGlobal;
        /**
         * Get the X position, on the scene, of the origin of the texture of the object.
         * @return the X position, on the scene, of the origin of the texture of the object.
         */
        getDrawableX(): float;
        /**
         * Get the Y position, on the scene, of the origin of the texture of the object.
         * @return the Y position, on the scene, of the origin of the texture of the object.
         */
        getDrawableY(): float;
        /**
         * Get the X position of the center of the object, relative to top-left of the texture of the object (`getDrawableX`).
         * @return X position of the center of the object, relative to `getDrawableX()`.
         */
        getCenterX(): float;
        /**
         * Get the Y position of the center of the object, relative to top-left of the texture of the object (`getDrawableY`).
         * @return Y position of the center of the object, relative to `getDrawableY()`.
         */
        getCenterY(): float;
        /**
         * Set the X position of the (origin of the) object.
         * @param x The new X position.
         */
        setX(x: float): void;
        /**
         * Set the Y position of the (origin of the) object.
         * @param y The new Y position.
         */
        setY(y: float): void;
        /**
         * Set the angle of the object.
         * @param angle The new angle, in degrees.
         */
        setAngle(angle: float): void;
        /**
         * Get the angle of the object.
         * @return The angle, in degrees.
         */
        getAngle(): float;
        setBlendMode(newMode: any): void;
        getBlendMode(): number;
        setOpacity(opacity: float): void;
        getOpacity(): number;
        /**
         * Hide (or show) the object
         * @param enable true to hide the object, false to show it again.
         */
        hide(enable: boolean): void;
        /**
         * Change the tint of the sprite object.
         *
         * @param rgbColor The color, in RGB format ("128;200;255").
         */
        setColor(rgbColor: string): void;
        /**
         * Get the tint of the sprite object.
         *
         * @returns The color, in RGB format ("128;200;255").
         */
        getColor(): string;
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
        /**
         * Get the width of the object.
         *
         * @return The width of the object, in pixels.
         */
        getWidth(): float;
        /**
         * Get the height of the object.
         *
         * @return The height of the object, in pixels.
         */
        getHeight(): float;
        setWidth(newWidth: float): void;
        setHeight(newHeight: float): void;
        setSize(newWidth: float, newHeight: float): void;
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
        /**
         * @param obj The target object
         * @param scene The scene containing the object
         * @deprecated
         */
        turnTowardObject(obj: gdjs.RuntimeObject | null, scene: gdjs.RuntimeScene): void;
    }
}
