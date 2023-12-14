declare namespace gdjs {
    /**
     * A renderer for debug instances location of a container using Pixi.js.
     *
     * @see gdjs.CustomObjectPixiRenderer
     */
    class DebuggerPixiRenderer {
        _instanceContainer: gdjs.RuntimeInstanceContainer;
        _debugDraw: PIXI.Graphics | null;
        _debugDrawContainer: PIXI.Container | null;
        _debugDrawRenderedObjectsPoints: Record<number, {
            wasRendered: boolean;
            points: Record<string, PIXI.Text>;
        }>;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer);
        getRendererObject(): import("pixi.js").Container<import("pixi.js").DisplayObject> | null;
        /**
         * Render graphics for debugging purpose. Activate this in `gdjs.RuntimeScene`,
         * in the `renderAndStep` method.
         * @see gdjs.RuntimeInstanceContainer#enableDebugDraw
         */
        renderDebugDraw(instances: gdjs.RuntimeObject[], showHiddenInstances: boolean, showPointsNames: boolean, showCustomPoints: boolean): void;
        clearDebugDraw(): void;
    }
    type DebuggerRenderer = gdjs.DebuggerPixiRenderer;
    const DebuggerRenderer: typeof DebuggerPixiRenderer;
}
