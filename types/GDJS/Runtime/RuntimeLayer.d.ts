declare namespace gdjs {
    enum RuntimeLayerRenderingType {
        TWO_D = 0,
        THREE_D = 1,
        TWO_D_PLUS_THREE_D = 2
    }
    /**
     * Represents a layer of a "container", used to display objects.
     * The container can be a scene (see gdjs.Layer)
     * or a custom object (see gdjs.RuntimeCustomObjectLayer).
     */
    abstract class RuntimeLayer implements EffectsTarget {
        _name: string;
        _renderingType: RuntimeLayerRenderingType;
        _timeScale: float;
        _defaultZOrder: integer;
        _hidden: boolean;
        _initialEffectsData: Array<EffectData>;
        _initialCamera3DFieldOfView: float;
        _initialCamera3DFarPlaneDistance: float;
        _initialCamera3DNearPlaneDistance: float;
        _runtimeScene: gdjs.RuntimeInstanceContainer;
        _effectsManager: gdjs.EffectsManager;
        _isLightingLayer: boolean;
        _followBaseLayerCamera: boolean;
        _clearColor: Array<integer>;
        _rendererEffects: Record<string, gdjs.PixiFiltersTools.Filter>;
        _renderer: gdjs.LayerRenderer;
        /**
         * @param layerData The data used to initialize the layer
         * @param instanceContainer The container in which the layer is used
         */
        constructor(layerData: LayerData, instanceContainer: gdjs.RuntimeInstanceContainer);
        getRenderer(): gdjs.LayerRenderer;
        getRendererObject(): import("pixi.js").Container<import("pixi.js").DisplayObject>;
        get3DRendererObject(): THREE.Scene | null;
        getRenderingType(): RuntimeLayerRenderingType;
        /**
         * Get the default Z order to be attributed to objects created on this layer
         * (usually from events generated code).
         */
        getDefaultZOrder(): float;
        /**
         * Set the default Z order to be attributed to objects created on this layer.
         * @param defaultZOrder The Z order to use when creating a new object from events.
         */
        setDefaultZOrder(defaultZOrder: integer): void;
        /**
         * Called by the RuntimeScene whenever the game resolution size is changed.
         * Updates the layer width/height and position.
         */
        abstract onGameResolutionResized(oldGameResolutionOriginX: float, oldGameResolutionOriginY: float): void;
        /**
         * Returns the scene the layer belongs to directly or indirectly
         * @returns the scene the layer belongs to directly or indirectly
         */
        getRuntimeScene(): gdjs.RuntimeScene;
        /**
         * Called at each frame, after events are run and before rendering.
         */
        updatePreRender(instanceContainer?: gdjs.RuntimeInstanceContainer): void;
        /**
         * Get the name of the layer
         * @return The name of the layer
         */
        getName(): string;
        /**
         * Change the camera center X position.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The x position of the camera
         */
        abstract getCameraX(cameraId?: integer): float;
        /**
         * Change the camera center Y position.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The y position of the camera
         */
        abstract getCameraY(cameraId?: integer): float;
        /**
         * Set the camera center X position.
         *
         * @param x The new x position
         * @param cameraId The camera number. Currently ignored.
         */
        abstract setCameraX(x: float, cameraId?: integer): void;
        /**
         * Set the camera center Y position.
         *
         * @param y The new y position
         * @param cameraId The camera number. Currently ignored.
         */
        abstract setCameraY(y: float, cameraId?: integer): void;
        /**
         * Get the camera width (which can be different than the game resolution width
         * if the camera is zoomed).
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The width of the camera
         */
        abstract getCameraWidth(cameraId?: integer): float;
        /**
         * Get the camera height (which can be different than the game resolution height
         * if the camera is zoomed).
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The height of the camera
         */
        abstract getCameraHeight(cameraId?: integer): float;
        /**
         * Show (or hide) the layer.
         * @param enable true to show the layer, false to hide it.
         */
        show(enable: boolean): void;
        /**
         * Check if the layer is visible.
         *
         * @return true if the layer is visible.
         */
        isVisible(): boolean;
        /**
         * Set the zoom of a camera.
         *
         * @param newZoom The new zoom. Must be superior to 0. 1 is the default zoom.
         * @param cameraId The camera number. Currently ignored.
         */
        abstract setCameraZoom(newZoom: float, cameraId?: integer): void;
        /**
         * Get the zoom of a camera.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The zoom.
         */
        abstract getCameraZoom(cameraId?: integer): float;
        /**
         * Set the camera center Z position.
         *
         * @param z The new y position.
         * @param fov The field of view.
         * @param cameraId The camera number. Currently ignored.
         */
        abstract setCameraZ(z: float, fov: float, cameraId?: integer): void;
        /**
         * Get the camera center Z position.
         *
         * @param fov The field of view.
         * @param cameraId The camera number. Currently ignored.
         * @return The z position of the camera
         */
        abstract getCameraZ(fov: float, cameraId?: integer): float;
        /**
         * Get the rotation of the camera, expressed in degrees.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The rotation, in degrees.
         */
        abstract getCameraRotation(cameraId?: integer): float;
        /**
         * Set the rotation of the camera, expressed in degrees.
         * The rotation is made around the camera center.
         *
         * @param rotation The new rotation, in degrees.
         * @param cameraId The camera number. Currently ignored.
         */
        abstract setCameraRotation(rotation: float, cameraId?: integer): void;
        /**
         * Convert a point from the canvas coordinates (for example,
         * the mouse position) to the container coordinates.
         *
         * @param x The x position, in canvas coordinates.
         * @param y The y position, in canvas coordinates.
         * @param cameraId The camera number. Currently ignored.
         * @param result The point instance that is used to return the result.
         */
        abstract convertCoords(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in parent coordinate coordinates (as opposed to the layer local coordinates).
         *
         * All transformations (scale, rotation) are supported.
         *
         * @param x The X position of the point, in layer coordinates.
         * @param y The Y position of the point, in layer coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in parent coordinates).
         */
        abstract applyLayerTransformation(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        /**
         * Convert a point from the container coordinates (for example,
         * an object position) to the canvas coordinates.
         *
         * @param x The x position, in container coordinates.
         * @param y The y position, in container coordinates.
         * @param cameraId The camera number. Currently ignored.
         * @param result The point instance that is used to return the result.
         */
        abstract convertInverseCoords(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in layer local coordinates (as opposed to the parent coordinates).
         *
         * All transformations (scale, rotation) are supported.
         *
         * @param x The X position of the point, in parent coordinates.
         * @param y The Y position of the point, in parent coordinates.
         * @param result Array that will be updated with the result
         * @param result The point instance that is used to return the result.
         * (x and y position of the point in layer coordinates).
         */
        abstract applyLayerInverseTransformation(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        getWidth(): float;
        getHeight(): float;
        getInitialCamera3DFieldOfView(): float;
        getInitialCamera3DNearPlaneDistance(): float;
        getInitialCamera3DFarPlaneDistance(): float;
        /**
         * Return the initial effects data for the layer. Only to
         * be used by renderers.
         * @deprecated
         */
        getInitialEffectsData(): EffectData[];
        /**
         * Returns the collection of effects to be rendered by the
         * underlying renderer.
         * @returns The renderer effects.
         */
        getRendererEffects(): Record<string, PixiFiltersTools.Filter>;
        /**
         * Add a new effect, or replace the one with the same name.
         * @param effectData The data of the effect to add.
         */
        addEffect(effectData: EffectData): void;
        /**
         * Remove the effect with the specified name
         * @param effectName The name of the effect.
         */
        removeEffect(effectName: string): void;
        /**
         * Change an effect property value (for properties that are numbers).
         * @param name The name of the effect to update.
         * @param parameterName The name of the property to update.
         * @param value The new value (number).
         */
        setEffectDoubleParameter(name: string, parameterName: string, value: float): void;
        /**
         * Change an effect property value (for properties that are strings).
         * @param name The name of the effect to update.
         * @param parameterName The name of the property to update.
         * @param value The new value (string).
         */
        setEffectStringParameter(name: string, parameterName: string, value: string): void;
        /**
         * Change an effect property value (for properties that are booleans).
         * @param name The name of the effect to update.
         * @param parameterName The name of the property to update.
         * @param value The new value (boolean).
         */
        setEffectBooleanParameter(name: string, parameterName: string, value: boolean): void;
        /**
         * Enable or disable an effect.
         * @param name The name of the effect to enable or disable.
         * @param enable true to enable, false to disable
         */
        enableEffect(name: string, enable: boolean): void;
        /**
         * Check if an effect is enabled
         * @param name The name of the effect
         * @return true if the effect is enabled, false otherwise.
         */
        isEffectEnabled(name: string): boolean;
        /**
         * Check if an effect exists on this layer
         * @param name The name of the effect
         * @return true if the effect exists, false otherwise.
         */
        hasEffect(name: string): boolean;
        /**
         * Set the time scale for the objects on the layer:
         * time will be slower if time scale is < 1, faster if > 1.
         * @param timeScale The new time scale (must be positive).
         */
        setTimeScale(timeScale: float): void;
        /**
         * Get the time scale for the objects on the layer.
         */
        getTimeScale(): float;
        /**
         * Return the time elapsed since the last frame,
         * in milliseconds, for objects on the layer.
         *
         * @param instanceContainer The instance container the layer belongs to (deprecated - can be omitted).
         */
        getElapsedTime(instanceContainer?: gdjs.RuntimeInstanceContainer): float;
        /**
         * Change the position, rotation and scale (zoom) of the layer camera to be the same as the base layer camera.
         */
        followBaseLayer(): void;
        /**
         * The clear color is defined in the format [r, g, b], with components in the range of 0 to 1.
         * @return the clear color of layer in the range of [0, 1].
         */
        getClearColor(): Array<integer>;
        /**
         * Set the clear color in format [r, g, b], with components in the range of 0 to 1.;
         * @param r Red color component in the range 0-255.
         * @param g Green color component in the range 0-255.
         * @param b Blue color component in the range 0-255.
         */
        setClearColor(r: integer, g: integer, b: integer): void;
        /**
         * Set whether layer's camera follows base layer's camera or not.
         */
        setFollowBaseLayerCamera(follow: boolean): void;
        /**
         * Return true if the layer is a lighting layer, false otherwise.
         * @return true if it is a lighting layer, false otherwise.
         */
        isLightingLayer(): boolean;
    }
}
