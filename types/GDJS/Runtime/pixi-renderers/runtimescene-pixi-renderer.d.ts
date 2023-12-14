declare namespace gdjs {
    /**
     * The renderer for a gdjs.RuntimeScene using Pixi.js.
     */
    class RuntimeScenePixiRenderer implements gdjs.RuntimeInstanceContainerPixiRenderer {
        private _runtimeGameRenderer;
        private _runtimeScene;
        private _pixiContainer;
        private _profilerText;
        private _showCursorAtNextRender;
        private _threeRenderer;
        private _layerRenderingMetrics;
        constructor(runtimeScene: gdjs.RuntimeScene, runtimeGameRenderer: gdjs.RuntimeGamePixiRenderer | null);
        onGameResolutionResized(): void;
        onSceneUnloaded(): void;
        render(): void;
        /**
         * Unless you know what you are doing, use the VR extension instead of this function directly.
         *
         * In VR, only 3D elements can be rendered, 2D cannot.
         * This rendering method skips over all 2D layers and elements, and simply renders the 3D content.
         * This method is to be called by the XRSession's `requestAnimationFrame` for rendering to
         * the headset whenever the headset requests the screen to be drawn. Note that while an XRSession
         * is in progress, the regular `requestAnimationFrame` will be disabled. Make sure that whenever you
         * enter an XRSession, you:
         * - Call this function first and foremost when the XRSession's requestAnimationFrame fires,
         *   as it is necessary to draw asap as the headset will eventually stop waiting and just draw the
         *   framebuffer as it is to maintain a constant screen refresh rate, which can be in the middle of
         *   or even before rendering if we aren't fast enough, leading to screen flashes and bugs.
         * - Call GDevelop's step function to give the scene a chance to step after having drawn to the screen
         *   to allow the game to actually progress, since GDevelop will no longer step by itself with
         *   `requestAnimationFrame` disabled.
         *
         * Note to engine developers: `threeRenderer.resetState()` may NOT be called in this function,
         * as WebXR modifies the WebGL state in a way that resetting it will cause an improper render
         * that will lead to a black screen being displayed in VR mode.
         */
        renderForVR(): void;
        _renderProfileText(): void;
        hideCursor(): void;
        showCursor(): void;
        getPIXIContainer(): import("pixi.js").Container<import("pixi.js").DisplayObject>;
        getRendererObject(): import("pixi.js").Container<import("pixi.js").DisplayObject>;
        get3DRendererObject(): null;
        /** @deprecated use `runtimeGame.getRenderer().getPIXIRenderer()` instead */
        getPIXIRenderer(): import("pixi.js").Renderer | null;
        setLayerIndex(layer: gdjs.RuntimeLayer, index: float): void;
    }
    type RuntimeSceneRenderer = gdjs.RuntimeScenePixiRenderer;
    const RuntimeSceneRenderer: typeof RuntimeScenePixiRenderer;
}
