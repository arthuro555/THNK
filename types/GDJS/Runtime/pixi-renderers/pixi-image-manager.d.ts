declare namespace gdjs {
    /**
     * PixiImageManager loads and stores textures that can be used by the Pixi.js renderers.
     */
    class PixiImageManager implements gdjs.ResourceManager {
        /**
         * The invalid texture is a 8x8 PNG file filled with magenta (#ff00ff), to be
         * easily spotted if rendered on screen.
         */
        private _invalidTexture;
        /**
         * Map associating a resource name to the loaded PixiJS texture.
         */
        private _loadedTextures;
        /**
         * Map associating a resource name to the loaded Three.js texture.
         */
        private _loadedThreeTextures;
        private _loadedThreeMaterials;
        private _resourceLoader;
        /**
         * @param resources The resources data of the game.
         * @param resourceLoader The resources loader of the game.
         */
        constructor(resourceLoader: gdjs.ResourceLoader);
        getResourceKinds(): ResourceKind[];
        /**
         * Return the PIXI texture associated to the specified resource name.
         * Returns a placeholder texture if not found.
         * @param resourceName The name of the resource
         * @returns The requested texture, or a placeholder if not found.
         */
        getPIXITexture(resourceName: string): PIXI.Texture;
        /**
         * Return the PIXI texture associated to the specified resource name.
         * If not found in the loaded textures, this method will try to load it.
         * Warning: this method should only be used in specific cases that cannot rely on
         * the initial resources loading of the game, such as the splashscreen.
         * @param resourceName The name of the resource
         * @returns The requested texture, or a placeholder if not valid.
         */
        getOrLoadPIXITexture(resourceName: string): PIXI.Texture;
        /**
         * Return the three.js texture associated to the specified resource name.
         * Returns a placeholder texture if not found.
         * @param resourceName The name of the resource
         * @returns The requested texture, or a placeholder if not found.
         */
        getThreeTexture(resourceName: string): THREE.Texture;
        /**
         * Return the three.js material associated to the specified resource name.
         * @param resourceName The name of the resource
         * @param options
         * @returns The requested material.
         */
        getThreeMaterial(resourceName: string, { useTransparentTexture, forceBasicMaterial, }: {
            useTransparentTexture: boolean;
            forceBasicMaterial: boolean;
        }): THREE.Material | THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
        /**
         * Return the PIXI video texture associated to the specified resource name.
         * Returns a placeholder texture if not found.
         * @param resourceName The name of the resource to get.
         */
        getPIXIVideoTexture(resourceName: string): import("pixi.js").Texture<import("pixi.js").Resource>;
        private _getImageResource;
        /**
         * Return a PIXI texture which can be used as a placeholder when no
         * suitable texture can be found.
         */
        getInvalidPIXITexture(): import("pixi.js").Texture<import("pixi.js").Resource>;
        /**
         * Load the specified resources, so that textures are loaded and can then be
         * used by calling `getPIXITexture`.
         */
        loadResource(resourceName: string): Promise<void>;
        processResource(resourceName: string): Promise<void>;
        /**
         * Load the specified resources, so that textures are loaded and can then be
         * used by calling `getPIXITexture`.
         * @param onProgress Callback called each time a new file is loaded.
         */
        _loadTexture(resource: ResourceData): Promise<void>;
    }
    const ImageManager: typeof PixiImageManager;
    type ImageManager = gdjs.PixiImageManager;
}
