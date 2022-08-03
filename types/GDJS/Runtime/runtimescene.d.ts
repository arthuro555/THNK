declare namespace gdjs {
    /**
     * A scene being played, containing instances of objects rendered on screen.
     */
    class RuntimeScene {
        _eventsFunction: null | ((runtimeScene: RuntimeScene) => void);
        _instances: Hashtable<RuntimeObject[]>;
        _instancesCache: Hashtable<RuntimeObject[]>;
        _objects: Hashtable<ObjectData>;
        _objectsCtor: Hashtable<typeof RuntimeObject>;
        _layers: Hashtable<Layer>;
        _initialBehaviorSharedData: Hashtable<BehaviorSharedData | null>;
        _renderer: RuntimeSceneRenderer;
        _variables: gdjs.VariablesContainer;
        _runtimeGame: gdjs.RuntimeGame;
        _lastId: integer;
        _name: string;
        _timeManager: TimeManager;
        _gameStopRequested: boolean;
        _requestedScene: string;
        _isLoaded: boolean;
        private _asyncTasksManager;
        _isJustResumed: boolean;
        _requestedChange: SceneChangeRequest;
        _backgroundColor: integer;
        _allInstancesList: gdjs.RuntimeObject[];
        _onceTriggers: OnceTriggers;
        _layersCameraCoordinates: Record<string, [float, float, float, float]>;
        _instancesRemoved: gdjs.RuntimeObject[];
        _profiler: gdjs.Profiler | null;
        _debugDrawEnabled: boolean;
        _debugDrawShowHiddenInstances: boolean;
        _debugDrawShowPointsNames: boolean;
        _debugDrawShowCustomPoints: boolean;
        _onProfilerStopped: null | ((oldProfiler: gdjs.Profiler) => void);
        /**
         * @param runtimeGame The game associated to this scene.
         */
        constructor(runtimeGame: gdjs.RuntimeGame);
        /**
         * Activate or deactivate the debug visualization for collisions and points.
         */
        enableDebugDraw(enableDebugDraw: boolean, showHiddenInstances: boolean, showPointsNames: boolean, showCustomPoints: boolean): void;
        /**
         * Should be called when the canvas where the scene is rendered has been resized.
         * See gdjs.RuntimeGame.startGameLoop in particular.
         */
        onGameResolutionResized(): void;
        /**
         * Load the runtime scene from the given scene.
         * @param sceneData An object containing the scene data.
         * @see gdjs.RuntimeGame#getSceneData
         */
        loadFromScene(sceneData: LayoutData | null): void;
        /**
         * Check if an object is registered, meaning that instances of it can be created and lives in the scene.
         * @see gdjs.RuntimeScene#registerObject
         */
        isObjectRegistered(objectName: string): boolean;
        /**
         * Register a {@link gdjs.RuntimeObject} so that instances of it can be used in the scene.
         * @param objectData The data for the object to register.
         */
        registerObject(objectData: ObjectData): void;
        /**
         * Update the data of a {@link gdjs.RuntimeObject} so that instances use this when constructed.
         * @param objectData The data for the object to register.
         */
        updateObject(objectData: ObjectData): void;
        /**
         * Unregister a {@link gdjs.RuntimeObject}. Instances will be destroyed.
         * @param objectName The name of the object to unregister.
         */
        unregisterObject(objectName: string): void;
        /**
         * Called when a scene is "paused", i.e it will be not be rendered again
         * for some time, until it's resumed or unloaded.
         */
        onPause(): void;
        /**
         * Called when a scene is "resumed", i.e it will be rendered again
         * on screen after having being paused.
         */
        onResume(): void;
        /**
         * Called before a scene is removed from the stack of scenes
         * rendered on the screen.
         */
        unloadScene(): void;
        /**
         * Create objects from initial instances data (for example, the initial instances
         * of the scene or the instances of an external layout).
         *
         * @param data The instances data
         * @param xPos The offset on X axis
         * @param yPos The offset on Y axis
         * @param trackByPersistentUuid If true, objects are tracked by setting their `persistentUuid`
         * to the same as the associated instance. Useful for hot-reloading when instances are changed.
         */
        createObjectsFrom(data: InstanceData[], xPos: float, yPos: float, trackByPersistentUuid: boolean): void;
        /**
         * Set the default Z order for each layer, which is the highest Z order found on each layer.
         * Useful as it ensures that instances created from events are, by default, shown in front
         * of other instances.
         */
        private _setLayerDefaultZOrders;
        /**
         * Set the function called each time the scene is stepped to be the events generated code,
         * which is by convention assumed to be a function in `gdjs` with a name based on the scene
         * mangled name.
         *
         * @param sceneData The scene data, used to find where the code was generated.
         */
        setEventsGeneratedCodeFunction(sceneData: LayoutData): void;
        /**
         * Set the function called each time the scene is stepped.
         * The function will be passed the `runtimeScene` as argument.
         *
         * Note that this is already set up by the gdjs.RuntimeScene constructor and that you should
         * not need to use this method.
         *
         * @param func The function to be called.
         */
        setEventsFunction(func: () => void): void;
        /**
         * Step and render the scene.
         * @return true if the game loop should continue, false if a scene change/push/pop
         * or a game stop was requested.
         */
        renderAndStep(elapsedTime: float): boolean;
        /**
         * Render the PIXI container associated to the runtimeScene.
         */
        render(): void;
        _updateLayersCameraCoordinates(scale: float): void;
        /**
         * Called to update effects of layers before rendering.
         */
        _updateLayersPreRender(): void;
        /**
         * Called to update visibility of the renderers of objects
         * rendered on the scene ("culling"), update effects (of visible objects)
         * and give a last chance for objects to update before rendering.
         *
         * Visibility is set to false if object is hidden, or if
         * object is too far from the camera of its layer ("culling").
         */
        _updateObjectsPreRender(): void;
        /**
         * Empty the list of the removed objects:<br>
         * When an object is removed from the scene, it is still kept in the _instancesRemoved member
         * of the RuntimeScene.<br>
         * This method should be called regularly (after events or behaviors steps) so as to clear this list
         * and allows the removed objects to be cached (or destroyed if the cache is full).<br>
         * The removed objects could not be sent directly to the cache, as events may still be using them after
         * removing them from the scene for example.
         */
        _cacheOrClearRemovedInstances(): void;
        /**
         * Tool function filling _allInstancesList member with all the living object instances.
         */
        _constructListOfAllInstances(): void;
        /**
         * Update the objects before launching the events.
         */
        _updateObjectsPreEvents(): void;
        /**
         * Update the objects (update positions, time management...)
         */
        _updateObjectsPostEvents(): void;
        /**
         * Change the background color, by setting the RGB components.
         * Internally, the color is stored as an hexadecimal number.
         *
         * @param r The color red component (0-255).
         * @param g The color green component (0-255).
         * @param b The color blue component (0-255).
         */
        setBackgroundColor(r: integer, g: integer, b: integer): void;
        /**
         * Get the background color, as an hexadecimal number.
         * @returns The current background color.
         */
        getBackgroundColor(): number;
        /**
         * Get the name of the scene.
         */
        getName(): string;
        /**
         * Update the objects positions according to their forces
         */
        updateObjectsForces(): void;
        /**
         * Add an object to the instances living on the scene.
         * @param obj The object to be added.
         */
        addObject(obj: RuntimeObject): void;
        /**
         * Get all the instances of the object called name.
         * @param name Name of the object for which the instances must be returned.
         * @return The list of objects with the given name
         */
        getObjects(name: string): gdjs.RuntimeObject[];
        /**
         * Create a new object from its name. The object is also added to the instances
         * living on the scene ( No need to call RuntimeScene.addObject )
         * @param objectName The name of the object to be created
         * @return The created object
         */
        createObject(objectName: string): gdjs.RuntimeObject | null;
        /**
         * Must be called whenever an object must be removed from the scene.
         * @param obj The object to be removed.
         */
        markObjectForDeletion(obj: gdjs.RuntimeObject): void;
        /**
         * Create an identifier for a new object of the scene.
         */
        createNewUniqueId(): integer;
        /**
         * Get the renderer associated to the RuntimeScene.
         */
        getRenderer(): RuntimeScenePixiRenderer;
        /**
         * Get the runtimeGame associated to the RuntimeScene.
         */
        getGame(): RuntimeGame;
        /**
         * Get the variables of the runtimeScene.
         * @return The container holding the variables of the scene.
         */
        getVariables(): VariablesContainer;
        /**
         * Get the data representing the initial shared data of the scene for the specified behavior.
         * @param name The name of the behavior
         * @returns The shared data for the behavior, if any.
         */
        getInitialSharedDataForBehavior(name: string): BehaviorSharedData | null;
        /**
         * Set the data representing the initial shared data of the scene for the specified behavior.
         * @param name The name of the behavior
         * @param sharedData The shared data for the behavior, or null to remove it.
         */
        setInitialSharedDataForBehavior(name: string, sharedData: BehaviorSharedData | null): void;
        /**
         * Get the layer with the given name
         * @param name The name of the layer
         * @returns The layer, or the base layer if not found
         */
        getLayer(name: string): gdjs.Layer;
        /**
         * Check if a layer exists
         * @param name The name of the layer
         */
        hasLayer(name: string): boolean;
        /**
         * Add a layer.
         * @param layerData The data to construct the layer
         */
        addLayer(layerData: LayerData): void;
        /**
         * Remove a layer. All {@link gdjs.RuntimeObject} on this layer will
         * be moved back to the base layer.
         * @param layerName The name of the layer to remove
         */
        removeLayer(layerName: string): void;
        /**
         * Change the position of a layer.
         *
         * @param layerName The name of the layer to reorder
         * @param index The new position in the list of layers
         */
        setLayerIndex(layerName: string, index: integer): void;
        /**
         * Fill the array passed as argument with the names of all layers
         * @param result The array where to put the layer names
         */
        getAllLayerNames(result: string[]): void;
        /**
         * Get the TimeManager of the scene.
         * @return The gdjs.TimeManager of the scene.
         */
        getTimeManager(): gdjs.TimeManager;
        /**
         * Shortcut to get the SoundManager of the game.
         * @return The gdjs.SoundManager of the game.
         */
        getSoundManager(): gdjs.SoundManager;
        /**
         * @returns The scene's async tasks manager.
         */
        getAsyncTasksManager(): AsyncTasksManager;
        /**
         * Return the value of the scene change that is requested.
         */
        getRequestedChange(): SceneChangeRequest;
        /**
         * Return the name of the new scene to be launched.
         *
         * See requestChange.
         */
        getRequestedScene(): string;
        /**
         * Request a scene change to be made. The change is handled externally (see gdjs.SceneStack)
         * thanks to getRequestedChange and getRequestedScene methods.
         * @param change One of RuntimeScene.CONTINUE|PUSH_SCENE|POP_SCENE|REPLACE_SCENE|CLEAR_SCENES|STOP_GAME.
         * @param sceneName The name of the new scene to launch, if applicable.
         */
        requestChange(change: SceneChangeRequest, sceneName?: string): void;
        /**
         * Get the profiler associated with the scene, or null if none.
         */
        getProfiler(): Profiler | null;
        /**
         * Start a new profiler to measures the time passed in sections of the engine
         * in the scene.
         * @param onProfilerStopped Function to be called when the profiler is stopped. Will be passed the profiler as argument.
         */
        startProfiler(onProfilerStopped: (oldProfiler: gdjs.Profiler) => void): void;
        /**
         * Stop the profiler being run on the scene.
         */
        stopProfiler(): void;
        /**
         * Get the structure containing the triggers for "Trigger once" conditions.
         */
        getOnceTriggers(): OnceTriggers;
        /**
         * Get a list of all gdjs.RuntimeObject living on the scene.
         * You should not, normally, need this method at all. It's only to be used
         * in exceptional use cases where you need to loop through all objects,
         * and it won't be performant.
         *
         * @returns The list of all runtime objects on the scnee
         */
        getAdhocListOfAllInstances(): gdjs.RuntimeObject[];
        /**
         * Return the number of instances of the specified object living on the scene.
         * @param objectName The object name for which instances must be counted.
         */
        getInstancesCountOnScene(objectName: string): integer;
        /**
         * Check if the scene was just resumed.
         * This is true during the first frame after the scene has been unpaused.
         *
         * @returns true if the scene was just resumed
         */
        sceneJustResumed(): boolean;
    }
    enum SceneChangeRequest {
        CONTINUE = 0,
        PUSH_SCENE = 1,
        POP_SCENE = 2,
        REPLACE_SCENE = 3,
        CLEAR_SCENES = 4,
        STOP_GAME = 5
    }
}
