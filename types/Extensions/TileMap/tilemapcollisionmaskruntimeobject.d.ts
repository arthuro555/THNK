declare namespace gdjs {
    /**
     * An object that handle hitboxes for a tile map.
     * @extends gdjs.RuntimeObject
     */
    class TileMapCollisionMaskRuntimeObject extends gdjs.RuntimeObject {
        private _tilemapJsonFile;
        private _tilesetJsonFile;
        private _renderer;
        _collisionTileMap: gdjs.TileMap.TransformedCollisionTileMap;
        /**
         * The tiles are filtered according to this tag.
         *
         * This allows have multiple objects with different usage
         * for the same tile map.
         * For instance, platforms, jumpthru, ladder, spike, water...
         */
        private _collisionMaskTag;
        private _tileMapManager;
        /**
         * When set to true, the hitboxes will be shown.
         */
        _debugMode: boolean;
        _fillColor: integer;
        _outlineColor: integer;
        _fillOpacity: float;
        _outlineOpacity: float;
        _outlineSize: float;
        /**
         * If the owner moves, the hitboxes vertices
         * will have to be transformed again.
         */
        private _transformationIsUpToDate;
        constructor(runtimeScene: gdjs.RuntimeScene, objectData: any);
        getRendererObject(): PIXI.Graphics;
        getVisibilityAABB(): null;
        updateFromObjectData(oldObjectData: any, newObjectData: any): boolean;
        extraInitializationFromInitialInstance(initialInstanceData: any): void;
        private _updateTileMap;
        updateHitBoxes(): void;
        /**
         * Update the affine transformation according to the object position, size
         *  and angle.
         */
        updateTransformation(): void;
        /**
         * This method is expensive and should not be called.
         * Prefer using {@link getHitBoxesAround} rather than getHitBoxes.
         */
        getHitBoxes(): gdjs.Polygon[];
        getHitBoxesAround(left: float, top: float, right: float, bottom: float): Iterable<Polygon>;
        /**
         * insideObject usually use the AABB of the object.
         * But, in case of a tile map, it makes more sense to look each tile individually.
         * It returns true when there is an hitbox in the tile.
         */
        insideObject(x: float, y: float): boolean;
        updateAABB(): void;
        /**
         * Set the Tilemap json file to display.
         */
        setTilemapJsonFile(tilemapJsonFile: string): void;
        getTilemapJsonFile(): string;
        isTilemapJsonFile(selectedTilemapJsonFile: string): boolean;
        setTilesetJsonFile(tilesetJsonFile: string): void;
        getTilesetJsonFile(): string;
        isTilesetJsonFile(selectedTilesetJsonFile: string): boolean;
        /**
         * @returns true if the hitboxes are shown.
         */
        getDebugMode(): boolean;
        /**
         * @returns true if the hitboxes are shown.
         */
        setDebugMode(debugMode: boolean): void;
        getFillColor(): integer;
        getOutlineColor(): integer;
        setFillColor(fillColor: integer): void;
        setOutlineColor(outlineColor: integer): void;
        setOutlineSize(size: float): void;
        getOutlineSize(): float;
        /**
         *
         * @param opacity from 0 to 255
         */
        setFillOpacity(opacity: float): void;
        /**
         *
         * @returns an opacity value from 0 to 255.
         */
        getFillOpacity(): float;
        /**
         *
         * @param opacity from 0 to 255
         */
        setOutlineOpacity(opacity: float): void;
        /**
         *
         * @returns an opacity value from 0 to 255.
         */
        getOutlineOpacity(): float;
        setX(x: float): void;
        setY(y: float): void;
        setAngle(angle: float): void;
        setWidth(width: float): void;
        setHeight(height: float): void;
        getWidth(): float;
        getHeight(): float;
    }
}
