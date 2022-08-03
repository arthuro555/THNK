declare namespace gdjs {
    interface RuntimeScene {
        tileMapCollisionMaskManager: gdjs.TileMap.TileMapRuntimeManager;
    }
    namespace TileMap {
        /**
         * A holder to share tile maps across the 2 extension objects.
         *
         * Every instance with the same files path in properties will
         * share the same {@link EditableTileMap} and {@link TileTextureCache}.
         *
         * To use a tile map with collisions, a user can create 4 objects:
         * - one for the the rendering
         * - one for the solid platforms
         * - one for the jumpthrus
         * - one for the ladders
         *
         * To avoid to have 4 copies of the same tile map in memory, this manager
         * puts the tile map in cache and avoid unnecessary parsing.
         *
         * @see {@link TileMapManager}
         */
        class TileMapRuntimeManager {
            private _runtimeScene;
            /**
             * Delegate that actually manage the caches without anything specific to
             * GDJS.
             * It allows to factorize code with the IDE.
             */
            private _manager;
            /**
             * @param runtimeScene The scene.
             */
            private constructor();
            /**
             * @param runtimeScene Where to set the manager instance.
             * @returns The shared manager.
             */
            static getManager(runtimeScene: gdjs.RuntimeScene): TileMapRuntimeManager;
            /**
             * @param tileMapJsonResourceName The resource name of the tile map.
             * @param tileSetJsonResourceName The resource name of the tile set.
             * @param callback A function called when the tile map is parsed.
             */
            getOrLoadTileMap(tileMapJsonResourceName: string, tileSetJsonResourceName: string, callback: (tileMap: TileMapHelper.EditableTileMap | null) => void): void;
            /**
             * @param getTexture The method that loads the atlas image file in memory.
             * @param atlasImageResourceName The resource name of the atlas image.
             * @param tileMapJsonResourceName The resource name of the tile map.
             * @param tileSetJsonResourceName The resource name of the tile set.
             * @param callback A function called when the tiles textures are split.
             */
            getOrLoadTextureCache(getTexture: (textureName: string) => PIXI.BaseTexture<PIXI.Resource>, atlasImageResourceName: string, tileMapJsonResourceName: string, tileSetJsonResourceName: string, callback: (textureCache: TileMapHelper.TileTextureCache | null) => void): void;
            /**
             * Parse both JSON and set the content of the tile set in the right
             * attribute in the tile map to merge both parsed data.
             */
            private _loadTiledMap;
        }
    }
}
