declare namespace gdjs {
    /**
     * The PIXI.js renderer for the Tile map runtime object.
     *
     * @class TileMapRuntimeObjectPixiRenderer
     */
    class TileMapRuntimeObjectPixiRenderer {
        _object: any;
        _runtimeScene: gdjs.RuntimeScene;
        _pixiObject: PIXI.tilemap.CompositeRectTileLayer;
        /**
         * @param runtimeObject The object to render
         * @param runtimeScene The gdjs.RuntimeScene in which the object is
         */
        constructor(runtimeObject: gdjs.TileMapRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        getRendererObject(): import("@pixi/tilemap").CompositeRectTileLayer;
        incrementAnimationFrameX(runtimeScene: gdjs.RuntimeScene): void;
        updatePixiTileMap(tileMap: TileMapHelper.EditableTileMap, textureCache: TileMapHelper.TileTextureCache): void;
        updatePosition(): void;
        updateAngle(): void;
        updateOpacity(): void;
        setWidth(width: float): void;
        setHeight(height: float): void;
        getWidth(): float;
        getHeight(): float;
    }
    const TileMapRuntimeObjectRenderer: typeof TileMapRuntimeObjectPixiRenderer;
    type TileMapRuntimeObjectRenderer = gdjs.TileMapRuntimeObjectPixiRenderer;
}
