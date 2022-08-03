declare namespace gdjs {
    /**
     * Represents a layer of a scene, used to display objects.
     *
     * Viewports and multiple cameras are not supported.
     */
    class Layer implements EffectsTarget {
        _name: string;
        _cameraRotation: float;
        _zoomFactor: float;
        _timeScale: float;
        _defaultZOrder: integer;
        _hidden: boolean;
        _initialEffectsData: Array<EffectData>;
        _cameraX: float;
        _cameraY: float;
        _cachedGameResolutionWidth: integer;
        _cachedGameResolutionHeight: integer;
        _runtimeScene: gdjs.RuntimeScene;
        _effectsManager: gdjs.EffectsManager;
        _isLightingLayer: boolean;
        _followBaseLayerCamera: boolean;
        _clearColor: Array<integer>;
        _rendererEffects: Record<string, PixiFiltersTools.Filter>;
        _renderer: LayerRenderer;
        /**
         * @param layerData The data used to initialize the layer
         * @param runtimeScene The scene in which the layer is used
         */
        constructor(layerData: LayerData, runtimeScene: gdjs.RuntimeScene);
        getRenderer(): gdjs.LayerRenderer;
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
        onGameResolutionResized(): void;
        /**
         * Returns the scene the layer belongs to
         * @returns the scene the layer belongs to
         */
        getRuntimeScene(): gdjs.RuntimeScene;
        /**
         * Called at each frame, after events are run and before rendering.
         */
        updatePreRender(runtimeScene?: gdjs.RuntimeScene): void;
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
        getCameraX(cameraId?: integer): float;
        /**
         * Change the camera center Y position.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The y position of the camera
         */
        getCameraY(cameraId?: integer): float;
        /**
         * Set the camera center X position.
         *
         * @param x The new x position
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraX(x: float, cameraId?: integer): void;
        /**
         * Set the camera center Y position.
         *
         * @param y The new y position
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraY(y: float, cameraId?: integer): void;
        /**
         * Get the camera width (which can be different than the game resolution width
         * if the camera is zoomed).
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The width of the camera
         */
        getCameraWidth(cameraId?: integer): float;
        /**
         * Get the camera height (which can be different than the game resolution height
         * if the camera is zoomed).
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The height of the camera
         */
        getCameraHeight(cameraId?: integer): float;
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
        setCameraZoom(newZoom: float, cameraId?: integer): void;
        /**
         * Get the zoom of a camera.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The zoom.
         */
        getCameraZoom(cameraId?: integer): float;
        /**
         * Get the rotation of the camera, expressed in degrees.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The rotation, in degrees.
         */
        getCameraRotation(cameraId?: integer): float;
        /**
         * Set the rotation of the camera, expressed in degrees.
         * The rotation is made around the camera center.
         *
         * @param rotation The new rotation, in degrees.
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraRotation(rotation: float, cameraId?: integer): void;
        /**
         * Convert a point from the canvas coordinates (for example,
         * the mouse position) to the scene coordinates.
         *
         * @param x The x position, in canvas coordinates.
         * @param y The y position, in canvas coordinates.
         * @param cameraId The camera number. Currently ignored.
         */
        convertCoords(x: float, y: float, cameraId?: integer): FloatPoint;
        /**
         * Convert a point from the scene coordinates (for example,
         * an object position) to the canvas coordinates.
         *
         * @param x The x position, in scene coordinates.
         * @param y The y position, in scene coordinates.
         * @param cameraId The camera number. Currently ignored.
         */
        convertInverseCoords(x: float, y: float, cameraId?: integer): FloatPoint;
        getWidth(): float;
        getHeight(): float;
        /**
         * Return the initial effects data for the layer. Only to
         * be used by renderers.
         * @deprecated
         */
        getInitialEffectsData(): EffectData[];
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
         * Change an effect parameter value (for parameters that are numbers).
         * @param name The name of the effect to update.
         * @param parameterName The name of the parameter to update.
         * @param value The new value (number).
         */
        setEffectDoubleParameter(name: string, parameterName: string, value: float): void;
        /**
         * Change an effect parameter value (for parameters that are strings).
         * @param name The name of the effect to update.
         * @param parameterName The name of the parameter to update.
         * @param value The new value (string).
         */
        setEffectStringParameter(name: string, parameterName: string, value: string): void;
        /**
         * Change an effect parameter value (for parameters that are booleans).
         * @param name The name of the effect to update.
         * @param parameterName The name of the parameter to update.
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
         */
        getElapsedTime(runtimeScene?: RuntimeScene): float;
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
