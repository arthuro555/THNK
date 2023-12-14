declare namespace gdjs {
    /**
     * The renderer for a {@link gdjs.CustomRuntimeObject} using Pixi.js.
     */
    class CustomObjectPixiRenderer implements gdjs.RuntimeInstanceContainerPixiRenderer {
        _object: gdjs.CustomRuntimeObject;
        _instanceContainer: gdjs.CustomRuntimeObjectInstanceContainer;
        _pixiContainer: PIXI.Container;
        _threeGroup: THREE.Group | null;
        _isContainerDirty: boolean;
        _debugDraw: PIXI.Graphics | null;
        _debugDrawContainer: PIXI.Container | null;
        _debugDrawRenderedObjectsPoints: Record<number, {
            wasRendered: boolean;
            points: Record<string, PIXI.Text>;
        }>;
        constructor(object: gdjs.CustomRuntimeObject, instanceContainer: gdjs.CustomRuntimeObjectInstanceContainer, parent: gdjs.RuntimeInstanceContainer);
        reinitialize(object: gdjs.CustomRuntimeObject, parent: gdjs.RuntimeInstanceContainer): void;
        getRendererObject(): import("pixi.js").Container<import("pixi.js").DisplayObject>;
        get3DRendererObject(): THREE.Object3D | null;
        /**
         * Update the internal PIXI.Container position, angle...
         */
        _updatePIXIContainer(): void;
        _updateThreeGroup(): void;
        /**
         * Call this to make sure the sprite is ready to be rendered.
         */
        ensureUpToDate(): void;
        update(): void;
        updateX(): void;
        updateY(): void;
        updateAngle(): void;
        updateOpacity(): void;
        updateVisibility(): void;
        getPIXIContainer(): import("pixi.js").Container<import("pixi.js").DisplayObject>;
        getPIXIRenderer(): null;
        setLayerIndex(layer: gdjs.RuntimeLayer, index: float): void;
    }
    type CustomObjectRenderer = gdjs.CustomObjectPixiRenderer;
    const CustomObjectRenderer: typeof CustomObjectPixiRenderer;
}
