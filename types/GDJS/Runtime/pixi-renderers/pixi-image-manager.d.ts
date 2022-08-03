declare namespace gdjs {
    /**
     * PixiImageManager loads and stores textures that can be used by the Pixi.js renderers.
     */
    class PixiImageManager {
        _resources: ResourceData[];
        /**
         * The invalid texture is a 8x8 PNG file filled with magenta (#ff00ff), to be
         * easily spotted if rendered on screen.
         */
        _invalidTexture: PIXI.Texture;
        /**
         * Map associated resource name to the loaded PixiJS texture.
         */
        _loadedTextures: Hashtable<PIXI.Texture<PIXI.Resource>>;
        /**
         * @param resources The resources data of the game.
         */
        constructor(resources: ResourceData[]);
        /**
         * Update the resources data of the game. Useful for hot-reloading, should not be used otherwise.
         *
         * @param resources The resources data of the game.
         */
        setResources(resources: ResourceData[]): void;
        /**
         * Return the PIXI texture associated to the specified resource name.
         * Returns a placeholder texture if not found.
         * @param resourceName The name of the resource
         * @returns The requested texture, or a placeholder if not found.
         */
        getPIXITexture(resourceName: string): PIXI.Texture;
        /**
         * Return the PIXI video texture associated to the specified resource name.
         * Returns a placeholder texture if not found.
         * @param resourceName The name of the resource to get.
         */
        getPIXIVideoTexture(resourceName: string): import("@pixi/core").Texture<import("@pixi/core").Resource>;
        /**
         * Return a PIXI texture which can be used as a placeholder when no
         * suitable texture can be found.
         */
        getInvalidPIXITexture(): import("@pixi/core").Texture<import("@pixi/core").Resource>;
        /**
         * Load the specified resources, so that textures are loaded and can then be
         * used by calling `getPIXITexture`.
         * @param onProgress Callback called each time a new file is loaded.
         * @param onComplete Callback called when loading is done.
         */
        loadTextures(onProgress: any, onComplete: any): any;
    }
    const ImageManager: typeof PixiImageManager;
    type ImageManager = gdjs.PixiImageManager;
}
