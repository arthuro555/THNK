declare namespace gdjs {
    /**
     * The renderer for a gdjs.RuntimeGame using Pixi.js.
     */
    class RuntimeGamePixiRenderer {
        _game: gdjs.RuntimeGame;
        _isFullPage: boolean;
        _isFullscreen: boolean;
        _forceFullscreen: any;
        _pixiRenderer: PIXI.Renderer | null;
        private _domElementsContainer;
        _canvasWidth: float;
        _canvasHeight: float;
        _keepRatio: boolean;
        _marginLeft: any;
        _marginTop: any;
        _marginRight: any;
        _marginBottom: any;
        _nextFrameId: integer;
        /**
         * @param game The game that is being rendered
         * @param forceFullscreen If fullscreen should be always activated
         */
        constructor(game: gdjs.RuntimeGame, forceFullscreen: boolean);
        /**
         * Create a standard canvas inside canvasArea.
         *
         */
        createStandardCanvas(parentElement: HTMLElement): void;
        static getWindowInnerWidth(): number;
        static getWindowInnerHeight(): number;
        /**
         * Update the game renderer size according to the "game resolution".
         * Called when game resolution changes.
         *
         * Note that if the canvas is fullscreen, it won't be resized, but when going back to
         * non fullscreen mode, the requested size will be used.
         */
        updateRendererSize(): void;
        /**
         * Set the proper screen orientation from the project properties.
         */
        private _setupOrientation;
        /**
         * Resize the renderer (the "game resolution") and the canvas (which can be larger
         * or smaller to fill the page, with optional margins).
         *
         */
        private _resizeCanvas;
        /**
         * Set if the aspect ratio must be kept when the game canvas is resized to fill
         * the page.
         */
        keepAspectRatio(enable: any): void;
        /**
         * Change the margin that must be preserved around the game canvas.
         */
        setMargins(top: any, right: any, bottom: any, left: any): void;
        /**
         * Update the window size, if possible.
         * @param width The new width, in pixels.
         * @param height The new height, in pixels.
         */
        setWindowSize(width: float, height: float): void;
        /**
         * Center the window on screen.
         */
        centerWindow(): void;
        /**
         * De/activate fullscreen for the game.
         */
        setFullScreen(enable: any): void;
        /**
         * Checks if the game is in full screen.
         */
        isFullScreen(): boolean;
        /**
         * Convert a point from the canvas coordinates to the dom element container coordinates.
         *
         * @param canvasCoords The point in the canvas coordinates.
         * @returns The point in the dom element container coordinates.
         */
        convertCanvasToDomElementContainerCoords(canvasCoords: FloatPoint): FloatPoint;
        /**
         * Return the scale factor between the renderer height and the actual canvas height,
         * which is also the height of the container for DOM elements to be superimposed on top of it.
         *
         * Useful to scale font sizes of DOM elements so that they follow the size of the game.
         */
        getCanvasToDomElementContainerHeightScale(): float;
        /**
         * Add the standard events handler.
         */
        bindStandardEvents(manager: gdjs.InputManager, window: Window, document: Document): void;
        setWindowTitle(title: any): void;
        getWindowTitle(): string;
        startGameLoop(fn: any): void;
        getPIXIRenderer(): import("@pixi/core").Renderer | null;
        getDomElementContainer(): HTMLDivElement | null;
        /**
         * Open the given URL in the system browser (or a new tab)
         */
        openURL(url: string): void;
        /**
         * Close the game, if applicable
         */
        stopGame(): void;
        /**
         * Get the canvas DOM element.
         */
        getCanvas(): HTMLCanvasElement;
        /**
         * Check if the device supports WebGL.
         * @returns true if WebGL is supported
         */
        isWebGLSupported(): boolean;
        /**
         * Get the electron module, if running as a electron renderer process.
         */
        getElectron(): any;
        /**
         * Helper to get the electron remote module, if running on Electron.
         * Note that is not guaranteed to be supported in the future - avoid if possible.
         */
        getElectronRemote: () => any;
    }
    type RuntimeGameRenderer = RuntimeGamePixiRenderer;
    const RuntimeGameRenderer: typeof RuntimeGamePixiRenderer;
}
