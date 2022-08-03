declare namespace gdjs {
    /**
     * Hold the stack of scenes ({@link gdjs.RuntimeScene}) being played.
     */
    class SceneStack {
        _runtimeGame: gdjs.RuntimeGame;
        _stack: gdjs.RuntimeScene[];
        _wasFirstSceneLoaded: boolean;
        /**
         * @param runtimeGame The runtime game that is using the scene stack
         */
        constructor(runtimeGame: gdjs.RuntimeGame);
        /**
         * Called by the RuntimeGame when the game resolution is changed.
         * Useful to notify scene and layers that resolution is changed, as they
         * might be caching it.
         */
        onGameResolutionResized(): void;
        step(elapsedTime: float): boolean;
        renderWithoutStep(): boolean;
        pop(): gdjs.RuntimeScene | null;
        /**
         * Pause the scene currently being played and start the new scene that is specified.
         * If `externalLayoutName` is set, also instantiate the objects from this external layout.
         */
        push(newSceneName: string, externalLayoutName?: string): gdjs.RuntimeScene;
        /**
         * Start the specified scene, replacing the one currently being played.
         * If `clear` is set to true, all running scenes are also removed from the stack of scenes.
         */
        replace(newSceneName: string, clear?: boolean): gdjs.RuntimeScene;
        /**
         * Return the current gdjs.RuntimeScene being played, or null if none is run.
         */
        getCurrentScene(): gdjs.RuntimeScene | null;
        /**
         * Return true if a scene was loaded, false otherwise (i.e: game not yet started).
         */
        wasFirstSceneLoaded(): boolean;
    }
}
