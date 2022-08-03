declare namespace gdjs {
    /**
     * The renderer for a gdjs.RuntimeScene using Pixi.js.
     */
    class RuntimeScenePixiRenderer {
        _pixiRenderer: PIXI.Renderer | null;
        _runtimeScene: gdjs.RuntimeScene;
        _pixiContainer: PIXI.Container;
        _debugDraw: PIXI.Graphics | null;
        _debugDrawContainer: PIXI.Container | null;
        _profilerText: PIXI.Text | null;
        _debugDrawRenderedObjectsPoints: Record<number, {
            wasRendered: boolean;
            points: Record<string, PIXI.Text>;
        }>;
        constructor(runtimeScene: gdjs.RuntimeScene, runtimeGameRenderer: gdjs.RuntimeGamePixiRenderer | null);
        onGameResolutionResized(): void;
        onSceneUnloaded(): void;
        render(): void;
        _renderProfileText(): void;
        /**
         * Render graphics for debugging purpose. Activate this in `gdjs.RuntimeScene`,
         * in the `renderAndStep` method.
         */
        renderDebugDraw(instances: gdjs.RuntimeObject[], showHiddenInstances: boolean, showPointsNames: boolean, showCustomPoints: boolean): void;
        clearDebugDraw(): void;
        hideCursor(): void;
        showCursor(): void;
        getPIXIContainer(): import("@pixi/display").Container;
        getPIXIRenderer(): import("@pixi/core").Renderer | null;
        setLayerIndex(layer: gdjs.Layer, index: float): void;
    }
    type RuntimeSceneRenderer = gdjs.RuntimeScenePixiRenderer;
    const RuntimeSceneRenderer: typeof RuntimeScenePixiRenderer;
}
