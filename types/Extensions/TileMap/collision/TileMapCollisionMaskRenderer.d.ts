declare namespace gdjs {
    namespace TileMap {
        /**
         * This render is only useful for debugging purposes.
         * @see {@link PixiTileMapHelper.updatePixiCollisionMask}, the render used by the GUI.
         */
        class TileMapCollisionMaskRenderer {
            _object: gdjs.TileMapCollisionMaskRuntimeObject;
            _graphics: PIXI.Graphics;
            constructor(runtimeObject: gdjs.TileMapCollisionMaskRuntimeObject, runtimeScene: gdjs.RuntimeScene);
            redrawCollisionMask(): void;
            getRendererObject(): PIXI.Graphics;
            setWidth(width: float): void;
            setHeight(height: float): void;
            getWidth(): float;
            getHeight(): float;
            getScaleX(): float;
            getScaleY(): float;
        }
    }
}
