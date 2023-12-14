declare namespace gdjs {
    /**
     * A scene being played, containing instances of objects rendered on screen.
     */
    class RuntimeScene extends gdjs.RuntimeInstanceContainer {
        _eventsFunction: null | ((runtimeScene: RuntimeScene) => void);
        _renderer: RuntimeSceneRenderer;
        _debuggerRenderer: gdjs.DebuggerRenderer;
        _variables: gdjs.VariablesContainer;
        _runtimeGame: gdjs.RuntimeGame;
        _lastId: integer;
        _name: string;
        _timeManager: TimeManager;
        _gameStopRequested: boolean;
        _requestedScene: string;
        private _asyncTasksManager;
        /** True if loadFromScene was called and the scene is being played. */
        _isLoaded: boolean;
        /** True in the first frame after resuming the paused scene */
        _isJustResumed: boolean;
        _requestedChange: SceneChangeRequest;
        /** Black background by default. */
        _backgroundColor: integer;
        /** Should the canvas be cleared before this scene rendering. */
        _clearCanvas: boolean;
        _onceTriggers: OnceTriggers;
        _profiler: gdjs.Profiler | null;
        _onProfilerStopped: null | ((oldProfiler: gdjs.Profiler) => void);
        _cachedGameResolutionWidth: integer;
        _cachedGameResolutionHeight: integer;
        /**
         * @param runtimeGame The game associated to this scene.
         */
        constructor(runtimeGame: gdjs.RuntimeGame);
        addLayer(layerData: LayerData): void;
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
        getInitialSharedDataForBehavior(name: string): BehaviorSharedData | null;
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
        _destroy(): void;
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
         * @param elapsedTime In milliseconds
         * @return true if the game loop should continue, false if a scene change/push/pop
         * or a game stop was requested.
         */
        renderAndStep(elapsedTime: float): boolean;
        /**
         * Render the PIXI container associated to the runtimeScene.
         */
        render(): void;
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
         * Set whether the canvas should be cleared before this scene rendering.
         * This is experimental: if possible, try to avoid relying on this and use
         * custom objects to build complex scenes.
         */
        setClearCanvas(shouldClearCanvas: boolean): void;
        /**
         * Get whether the canvas should be cleared before this scene rendering.
         */
        getClearCanvas(): boolean;
        /**
         * Get the name of the scene.
         */
        getName(): string;
        /**
         * Create an identifier for a new object of the scene.
         */
        createNewUniqueId(): integer;
        getRenderer(): gdjs.RuntimeScenePixiRenderer;
        getDebuggerRenderer(): DebuggerPixiRenderer;
        getGame(): RuntimeGame;
        getScene(): this;
        getViewportWidth(): float;
        getViewportHeight(): float;
        getViewportOriginX(): float;
        getViewportOriginY(): float;
        convertCoords(x: float, y: float, result: FloatPoint): FloatPoint;
        convertInverseCoords(sceneX: float, sceneY: float, result: FloatPoint): FloatPoint;
        onChildrenLocationChanged(): void;
        /**
         * Get the variables of the runtimeScene.
         * @return The container holding the variables of the scene.
         */
        getVariables(): VariablesContainer;
        /**
         * Get the TimeManager of the scene.
         * @return The gdjs.TimeManager of the scene.
         */
        getTimeManager(): gdjs.TimeManager;
        /**
         * Return the time elapsed since the last frame,
         * in milliseconds, for objects on the layer.
         */
        getElapsedTime(): float;
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
        getProfiler(): gdjs.Profiler | null;
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
