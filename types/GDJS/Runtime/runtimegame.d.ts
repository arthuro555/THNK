declare namespace gdjs {
    /** Identify a script file, with its content hash (useful for hot-reloading). */
    type RuntimeGameOptionsScriptFile = {
        /** The path for this script file. */
        path: string;
        /** The hash of the script file content. */
        hash: number;
    };
    /** Options given to the game at startup. */
    type RuntimeGameOptions = {
        /** if true, force fullscreen. */
        forceFullscreen?: boolean;
        /** if true, game is run as a preview launched from an editor. */
        isPreview?: boolean;
        /** The name of the external layout to create in the scene at position 0;0. */
        injectExternalLayout?: string;
        /** Script files, used for hot-reloading. */
        scriptFiles?: Array<RuntimeGameOptionsScriptFile>;
        /** if true, export is a partial preview without events. */
        projectDataOnlyExport?: boolean;
        /** The address of the debugger server, to reach out using WebSocket. */
        websocketDebuggerServerAddress?: string;
        /** The port of the debugger server, to reach out using WebSocket. */
        websocketDebuggerServerPort?: string;
        /**
         * The path to require `@electron/remote` module.
         * This is only useful in a preview, where this can't be required from
         * `@electron/remote` directly as previews don't have any node_modules.
         * On the contrary, a game packaged with Electron as a standalone app
         * has its node_modules.
         * This can be removed once there are no more dependencies on
         * `@electron/remote` in the game engine and extensions.
         */
        electronRemoteRequirePath?: string;
        /**
         * the token to use by the game engine when requiring any resource stored on
         * GDevelop Cloud buckets. Note that this is only useful during previews.
         */
        gdevelopResourceToken?: string;
        /**
         * Check if, in some exceptional cases, we allow authentication
         * to be done through a iframe.
         * This is usually discouraged as the user can't verify that the authentication
         * window is a genuine one. It's only to be used in trusted contexts.
         */
        allowAuthenticationUsingIframeForPreview?: boolean;
        /**
         * If set, the game should use the specified environment for making calls
         * to GDevelop APIs ("dev" = development APIs).
         */
        environment?: 'dev';
    };
    /**
     * Represents a game being played.
     */
    class RuntimeGame {
        _resourcesLoader: gdjs.ResourceLoader;
        _variables: VariablesContainer;
        _data: ProjectData;
        _eventsBasedObjectDatas: Map<String, EventsBasedObjectData>;
        _effectsManager: EffectsManager;
        _maxFPS: integer;
        _minFPS: integer;
        _gameResolutionWidth: integer;
        _gameResolutionHeight: integer;
        _originalWidth: float;
        _originalHeight: float;
        _resizeMode: 'adaptWidth' | 'adaptHeight' | string;
        _adaptGameResolutionAtRuntime: boolean;
        _scaleMode: 'linear' | 'nearest';
        _pixelsRounding: boolean;
        _antialiasingMode: 'none' | 'MSAA';
        _isAntialisingEnabledOnMobile: boolean;
        /**
         * Game loop management (see startGameLoop method)
         */
        _renderer: RuntimeGameRenderer;
        _sessionId: string | null;
        _playerId: string | null;
        _watermark: watermark.RuntimeWatermark;
        _sceneStack: SceneStack;
        /**
         * When set to true, the scenes are notified that game resolution size changed.
         */
        _notifyScenesForGameResolutionResize: boolean;
        /**
         * When paused, the game won't step and will be freezed. Useful for debugging.
         */
        _paused: boolean;
        /**
         * True during the first frame the game is back from being hidden.
         * This has nothing to do with `_paused`.
         */
        _hasJustResumed: boolean;
        _inputManager: InputManager;
        /**
         * Allow to specify an external layout to insert in the first scene.
         */
        _injectExternalLayout: any;
        _options: RuntimeGameOptions;
        /**
         * The mappings for embedded resources
         */
        _embeddedResourcesMappings: Map<string, Record<string, string>>;
        /**
         * Optional client to connect to a debugger server.
         */
        _debuggerClient: gdjs.AbstractDebuggerClient | null;
        _sessionMetricsInitialized: boolean;
        _disableMetrics: boolean;
        _isPreview: boolean;
        /**
         * @param data The object (usually stored in data.json) containing the full project data
         * @param
         */
        constructor(data: ProjectData, options?: RuntimeGameOptions);
        /**
         * Update the project data. Useful for hot-reloading, should not be used otherwise.
         *
         * @param projectData The object (usually stored in data.json) containing the full project data
         */
        setProjectData(projectData: ProjectData): void;
        /**
         * Return the additional options passed to the RuntimeGame when created.
         * @returns The additional options, if any.
         */
        getAdditionalOptions(): RuntimeGameOptions | null;
        getRenderer(): gdjs.RuntimeGameRenderer;
        /**
         * Get the variables of the RuntimeGame.
         * @return The global variables
         */
        getVariables(): gdjs.VariablesContainer;
        /**
         * Get the gdjs.SoundManager of the RuntimeGame.
         * @return The sound manager.
         */
        getSoundManager(): gdjs.HowlerSoundManager;
        /**
         * Get the gdjs.ImageManager of the RuntimeGame.
         * @return The image manager.
         */
        getImageManager(): gdjs.PixiImageManager;
        /**
         * Get the gdjs.FontManager of the RuntimeGame.
         * @return The font manager.
         */
        getFontManager(): gdjs.FontFaceObserverFontManager;
        /**
         * Get the gdjs.BitmapFontManager of the RuntimeGame.
         * @return The bitmap font manager.
         */
        getBitmapFontManager(): gdjs.BitmapFontManager;
        /**
         * Get the JSON manager of the game, used to load JSON from game
         * resources.
         * @return The json manager for the game
         */
        getJsonManager(): gdjs.JsonManager;
        /**
         * Get the 3D model manager of the game, used to load 3D model from game
         * resources.
         * @return The 3D model manager for the game
         */
        getModel3DManager(): gdjs.Model3DManager;
        /**
         * Get the input manager of the game, storing mouse, keyboard
         * and touches states.
         * @return The input manager owned by the game
         */
        getInputManager(): gdjs.InputManager;
        /**
         * Get the effects manager of the game, which allows to manage
         * effects on runtime objects or runtime layers.
         * @return The effects manager for the game
         */
        getEffectsManager(): gdjs.EffectsManager;
        /**
         * Get the object containing the game data
         * @return The object associated to the game.
         */
        getGameData(): ProjectData;
        getEventsBasedObjectData(type: string): EventsBasedObjectData | null;
        /**
         * Get the data associated to a scene.
         *
         * @param sceneName The name of the scene. If not defined, the first scene will be returned.
         * @return The data associated to the scene.
         */
        getSceneData(sceneName?: string): LayoutData | null;
        /**
         * Check if a scene exists
         *
         * @param sceneName The name of the scene to search.
         * @return true if the scene exists. If sceneName is undefined, true if the game has a scene.
         */
        hasScene(sceneName?: string): boolean;
        /**
         * Get the data associated to an external layout.
         *
         * @param name The name of the external layout.
         * @return The data associated to the external layout or null if not found.
         */
        getExternalLayoutData(name: string): ExternalLayoutData | null;
        /**
         * Get the data representing all the global objects of the game.
         * @return The data associated to the global objects.
         */
        getInitialObjectsData(): ObjectData[];
        /**
         * Get the original width of the game, as set on the startup of the game.
         *
         * This is guaranteed to never change, even if the size of the game is changed afterwards.
         */
        getOriginalWidth(): float;
        /**
         * Get the original height of the game, as set on the startup of the game.
         *
         * This is guaranteed to never change, even if the size of the game is changed afterwards.
         */
        getOriginalHeight(): float;
        /**
         * Get the game resolution (the size at which the game is played and rendered) width.
         * @returns The game resolution width, in pixels.
         */
        getGameResolutionWidth(): float;
        /**
         * Get the game resolution (the size at which the game is played and rendered) height.
         * @returns The game resolution height, in pixels.
         */
        getGameResolutionHeight(): float;
        /**
         * Change the game resolution.
         *
         * @param width The new width
         * @param height The new height
         */
        setGameResolutionSize(width: float, height: float): void;
        /**
         * Set if the width or the height of the game resolution
         * should be changed to fit the game window - or if the game
         * resolution should not be updated automatically.
         *
         * @param resizeMode Either "" (don't change game resolution), "adaptWidth" or "adaptHeight".
         */
        setGameResolutionResizeMode(resizeMode: string): void;
        /**
         * Returns if the width or the height of the game resolution
         * should be changed to fit the game window - or if the game
         * resolution should not be updated automatically (empty string).
         *
         * @returns Either "" (don't change game resolution), "adaptWidth" or "adaptHeight".
         */
        getGameResolutionResizeMode(): string;
        /**
         * Set if the game resolution should be automatically adapted
         * when the game window or screen size change. This will only
         * be the case if the game resolution resize mode is
         * configured to adapt the width or the height of the game.
         * @param enable true to change the game resolution according to the window/screen size.
         */
        setAdaptGameResolutionAtRuntime(enable: boolean): void;
        /**
         * Returns if the game resolution should be automatically adapted
         * when the game window or screen size change. This will only
         * be the case if the game resolution resize mode is
         * configured to adapt the width or the height of the game.
         * @returns true if the game resolution is automatically changed according to the window/screen size.
         */
        getAdaptGameResolutionAtRuntime(): boolean;
        /**
         * Return the minimal fps that must be guaranteed by the game
         * (otherwise, game is slowed down).
         */
        getMinimalFramerate(): integer;
        /**
         * Return the scale mode of the game ("linear" or "nearest").
         */
        getScaleMode(): 'linear' | 'nearest';
        /**
         * Return if the game is rounding pixels when rendering.
         */
        getPixelsRounding(): boolean;
        /**
         * Return the antialiasing mode used by the game ("none" or "MSAA").
         */
        getAntialiasingMode(): 'none' | 'MSAA';
        /**
         * Return true if antialising is enabled on mobiles.
         */
        isAntialisingEnabledOnMobile(): boolean;
        /**
         * Set or unset the game as paused.
         * When paused, the game won't step and will be freezed. Useful for debugging.
         * @param enable true to pause the game, false to unpause
         */
        pause(enable: boolean): void;
        /**
         * @returns true during the first frame the game is back from being hidden.
         * This has nothing to do with `_paused`.
         */
        hasJustResumed(): boolean;
        /**
         * Preload a scene assets as soon as possible in background.
         */
        prioritizeLoadingOfScene(sceneName: string): void;
        /**
         * @return The progress of assets loading in background for a scene
         * (between 0 and 1).
         */
        getSceneLoadingProgress(sceneName: string): number;
        /**
         * @returns true when all the resources of the given scene are loaded
         * (but maybe not parsed).
         */
        areSceneAssetsLoaded(sceneName: string): boolean;
        /**
         * @returns true when all the resources of the given scene are loaded and
         * parsed.
         */
        areSceneAssetsReady(sceneName: string): boolean;
        /**
         * Load all assets needed to display the 1st scene, displaying progress in
         * renderer.
         */
        loadAllAssets(callback: () => void, progressCallback?: (progress: float) => void): void;
        /**
         * Load all assets needed to display the 1st scene, displaying progress in
         * renderer.
         *
         * When a game is hot-reload, this method can be called with the current
         * scene.
         */
        loadFirstAssetsAndStartBackgroundLoading(firstSceneName: string, progressCallback?: (progress: float) => void): Promise<void>;
        /**
         * Load all assets for a given scene, displaying progress in renderer.
         */
        loadSceneAssets(sceneName: string, progressCallback?: (progress: float) => void): Promise<void>;
        /**
         * Load assets, displaying progress in renderer.
         */
        private _loadAssetsWithLoadingScreen;
        private _getFirstSceneName;
        /**
         * Start the game loop, to be called once assets are loaded.
         */
        startGameLoop(): void;
        /**
         * Set if the session should be registered.
         */
        enableMetrics(enable: boolean): void;
        _setupGameVisibilityEvents(): void;
        /**
         * Register a new session for the game, and set up listeners to follow the session
         * time.
         */
        _setupSessionMetrics(): void;
        /**
         * Generate an anonymous unique identifier to differentiate
         * the player from others in the game metrics.
         */
        _makePlayerUuid(): string;
        getSessionId(): string | null;
        getPlayerId(): string | null;
        /**
         * Called by the game renderer when the window containing the game
         * has changed size (this can result from a resize of the window,
         * but also other factors like a device orientation change on mobile).
         */
        onWindowInnerSizeChanged(): void;
        /**
         * Enlarge/reduce the width (or the height) of the game to fill the inner window.
         */
        _forceGameResolutionUpdate(): void;
        /**
         * Start a profiler for the currently running scene.
         * @param onProfilerStopped Function to be called when the profiler is stopped. Will be passed the profiler as argument.
         */
        startCurrentSceneProfiler(onProfilerStopped: (oldProfiler: Profiler) => void): boolean;
        /**
         * Stop the profiler for the currently running scene.
         */
        stopCurrentSceneProfiler(): void;
        /**
         * Return true if a scene was loaded, false otherwise (i.e: game not yet started).
         */
        wasFirstSceneLoaded(): boolean;
        /**
         * Return the stack of {@link gdjs.RuntimeScene} being played.
         */
        getSceneStack(): gdjs.SceneStack;
        /**
         * Check if the game is running as a preview, launched from an editor.
         * @returns true if the current game is a preview.
         */
        isPreview(): boolean;
        /**
         * Check if the game should call GDevelop development APIs or not.
         *
         * Unless you are contributing to GDevelop, avoid using this.
         */
        isUsingGDevelopDevelopmentEnvironment(): boolean;
        /**
         * Gets an extension property from the project data.
         * @param extensionName The extension name.
         * @param propertyName The property name.
         * @return The property value.
         */
        getExtensionProperty(extensionName: string, propertyName: string): string | null;
        /**
         * Resolves the name of an embedded resource.
         * @param mainResourceName The name of the resource containing the embedded resource.
         * @param embeddedResourceName The name of the embedded resource.
         * @return The resource name.
         */
        resolveEmbeddedResource(mainResourceName: string, embeddedResourceName: string): string;
    }
}
