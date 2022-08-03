declare namespace gdjs {
    namespace TileMap {
        /**
         * A tile map transformed with an affine transformation.
         *
         * @see {@link getHitboxesAround} It gives a fast access to hitboxes for collision handling.
         */
        export class TransformedCollisionTileMap {
            /**
             * The model that describes the tile map.
             */
            private _source;
            tag: string;
            private _layers;
            /**
             * The transformation from the time map coordinate (in pixels)
             * to the scene coordinate (in pixels).
             */
            private _transformation;
            /**
             * The transformation from the scene coordinate (in pixels)
             * to the time map coordinate (in pixels).
             */
            private _inverseTransformation;
            /**
             * This allows tiles to know if their hitboxes must be updated.
             * @see {@link TransformedCollisionTile.affineTransformationUpToDateCount}
             */
            _transformationUpToDateCount: integer;
            /**
             * An reusable Point to avoid allocations.
             */
            private static readonly workingPoint;
            /**
             * @param source The model that describes the tile map.
             */
            constructor(source: TileMapHelper.EditableTileMap, tag: string);
            /**
             * @returns The transformation from the time map coordinate (in pixels)
             * to the scene coordinate (in pixels).
             */
            getTransformation(): gdjs.AffineTransformation;
            /**
             * @param transformation the transformation from the time map coordinate
             * (in pixels) to the scene coordinate (in pixels).
             */
            setTransformation(transformation: gdjs.AffineTransformation): void;
            private _invalidate;
            /**
             * @returns The tile map width in pixels.
             */
            getWidth(): number;
            /**
             * @returns The tile map height in pixels.
             */
            getHeight(): number;
            /**
             * @returns The tile width in pixels.
             */
            getTileHeight(): number;
            /**
             * @returns The tile height in pixels.
             */
            getTileWidth(): number;
            /**
             * @returns The number of tile columns in the map.
             */
            getDimensionX(): number;
            /**
             * @returns The number of tile rows in the map.
             */
            getDimensionY(): number;
            /**
             * @param tileId The tile identifier
             * @returns The tile definition form the tile set.
             */
            getTileDefinition(tileId: integer): TileMapHelper.TileDefinition | undefined;
            /**
             * @param layerId The layer identifier.
             * @returns the layer
             */
            getLayer(layerId: integer): TransformedCollisionTileMapLayer | undefined;
            /**
             * @returns All the layers of the tile map.
             */
            getLayers(): Iterable<TransformedCollisionTileMapLayer>;
            /**
             * Check if a point is inside a tile with a given tag.
             *
             * It doesn't use the tile hitboxes.
             * It only check the point is inside the tile square.
             *
             * @param x The X coordinate of the point to check.
             * @param y The Y coordinate of the point to check.
             * @param tag The tile tag
             * @returns true when the point is inside a tile with a given tag.
             */
            pointIsInsideTile(x: float, y: float, tag: string): boolean;
            /**
             * @param tag The tile tag.
             * @param left The left border of the area in the scene.
             * @param top The top border of the area in the scene.
             * @param right The right border of the area in the scene.
             * @param bottom The left border of the area in the scene.
             * @returns At least all the hitboxes from the given area
             * where tiles have the right tag.
             *
             * @see {@link gdjs.RuntimeObject.getHitboxesAround}
             */
            getHitboxesAround(tag: string, left: float, top: float, right: float, bottom: float): Iterable<gdjs.Polygon>;
            /**
             * @param tag The tile tag.
             * @param xMin The fist column to include.
             * @param yMin The fist row to include.
             * @param xMax The last column to include.
             * @param yMax The last row to include.
             * @returns All the hitboxes from the tiles overlapping
             * the given area where tiles have the right tag.
             */
            getHitboxes(tag: string, xMin: integer, yMin: integer, xMax: integer, yMax: integer): Iterable<gdjs.Polygon>;
            /**
             * @param tag The tile tag.
             * @returns All the hitboxes from the tiles having the right tag.
             */
            getAllHitboxes(tag: string): Iterable<gdjs.Polygon>;
        }
        /**
         * A tile map layer transformed with an affine transformation.
         */
        export class TransformedCollisionTileMapLayer {
            /**
             * The time map that contains this layer.
             */
            readonly tileMap: TransformedCollisionTileMap;
            /**
             * The model that describes the tile map.
             */
            readonly _source: TileMapHelper.EditableTileMapLayer;
            private readonly _tiles;
            /**
             * @param tileMap The time map that contains this layer.
             * @param source The model that describes the tile map.
             */
            constructor(tileMap: TransformedCollisionTileMap, source: TileMapHelper.EditableTileMapLayer);
            /**
             * @param x The layer column.
             * @param y The layer row.
             * @return The tile from the tile set.
             */
            get(x: integer, y: integer): TransformedCollisionTile | undefined;
            /**
             * The number of tile columns in the layer.
             */
            getDimensionX(): number;
            /**
             * The number of tile rows in the layer.
             */
            getDimensionY(): number;
            /**
             * @returns The layer width in pixels.
             */
            getWidth(): number;
            /**
             * @returns The layer height in pixels.
             */
            getHeight(): number;
            /**
             * @param x The layer column.
             * @param y The layer row.
             * @returns true if the tile is flipped diagonally.
             */
            isFlippedDiagonally(x: integer, y: integer): boolean;
            /**
             * @param x The layer column.
             * @param y The layer row.
             * @returns true if the tile is flipped vertically.
             */
            isFlippedVertically(x: integer, y: integer): boolean;
            /**
             * @param x The layer column.
             * @param y The layer row.
             * @returns true if the tile is flipped horizontally.
             */
            isFlippedHorizontally(x: integer, y: integer): boolean;
            /**
             * @param tag The tile tag.
             * @param xMin The fist column to include.
             * @param yMin The fist row to include.
             * @param xMax The last column to include.
             * @param yMax The last row to include.
             * @returns All the hitboxes from the tiles overlapping
             * the given area where tiles have the right tag.
             */
            getHitboxes(tag: string, xMin: integer, yMin: integer, xMax: integer, yMax: integer): Iterable<gdjs.Polygon>;
            /**
             * @param tag The tile tag.
             * @returns All the hitboxes from the tiles having the right tag.
             */
            getAllHitboxes(tag: string): Iterable<gdjs.Polygon>;
        }
        /**
         * A tile transformed with an affine transformation.
         */
        class TransformedCollisionTile {
            /**
             * The layer that contains this tile.
             */
            readonly layer: TransformedCollisionTileMapLayer;
            /**
             * The column index in the layer.
             */
            readonly x: integer;
            /**
             * The row index in the layer.
             */
            readonly y: integer;
            private readonly hitBoxes;
            private affineTransformationUpToDateCount;
            /**
             * An reusable AffineTransformation to avoid allocations.
             */
            private static readonly workingTransformation;
            /**
             *
             * @param layer The layer that contains this tile.
             * @param x The column index in the layer.
             * @param y The row index in the layer.
             */
            constructor(layer: TransformedCollisionTileMapLayer, x: integer, y: integer);
            /**
             * @returns The tile definition from the tile set.
             */
            getDefinition(): TileMapHelper.TileDefinition;
            private _isHitboxesUpToDate;
            private _setHitboxesUpToDate;
            /**
             * @returns The hitboxes of this tile in the scene basis.
             */
            getHitboxes(): Polygon[];
        }
        export {};
    }
}
