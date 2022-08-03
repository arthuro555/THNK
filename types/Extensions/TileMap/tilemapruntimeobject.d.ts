declare namespace gdjs {
    /**
     * Displays a Tilemap object (mapeditor.org supported).
     */
    class TileMapRuntimeObject extends gdjs.RuntimeObject {
        _frameElapsedTime: float;
        _opacity: float;
        _tilemapJsonFile: string;
        _tilesetJsonFile: string;
        _tilemapAtlasImage: string;
        _displayMode: string;
        _layerIndex: integer;
        _animationSpeedScale: number;
        _animationFps: number;
        _tileMapManager: gdjs.TileMap.TileMapRuntimeManager;
        _renderer: gdjs.TileMapRuntimeObjectPixiRenderer;
        constructor(runtimeScene: gdjs.RuntimeScene, objectData: any);
        getRendererObject(): import("@pixi/tilemap").CompositeRectTileLayer;
        update(runtimeScene: gdjs.RuntimeScene): void;
        updateFromObjectData(oldObjectData: any, newObjectData: any): boolean;
        extraInitializationFromInitialInstance(initialInstanceData: any): void;
        private _updateTileMap;
        /**
         * Set the Tilemap json file to display.
         */
        setTilemapJsonFile(tilemapJsonFile: string): void;
        getTilemapJsonFile(): string;
        isTilemapJsonFile(selectedTilemapJsonFile: string): boolean;
        setTilesetJsonFile(tilesetJsonFile: string): void;
        getTilesetJsonFile(): string;
        setAnimationFps(animationFps: float): void;
        getAnimationFps(): float;
        isTilesetJsonFile(selectedTilesetJsonFile: string): boolean;
        isDisplayMode(selectedDisplayMode: string): boolean;
        setDisplayMode(displayMode: string): void;
        getDisplayMode(): string;
        setLayerIndex(layerIndex: any): void;
        getLayerIndex(): integer;
        setAnimationSpeedScale(animationSpeedScale: any): void;
        getAnimationSpeedScale(): float;
        setWidth(width: float): void;
        setHeight(height: float): void;
        setX(x: float): void;
        setY(y: float): void;
        setAngle(angle: float): void;
        /**
         * Set object opacity.
         * @param opacity The new opacity of the object (0-255).
         */
        setOpacity(opacity: float): void;
        /**
         * Get object opacity.
         */
        getOpacity(): float;
        getWidth(): float;
        getHeight(): float;
    }
}
