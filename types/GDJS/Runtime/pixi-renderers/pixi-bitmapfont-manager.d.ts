declare namespace gdjs {
    /**
     * PixiBitmapFontManager loads fnt/xml files (using `fetch`), from the "bitmapFont" resources of the game.
     *
     * It installs the "BitmapFont" with PixiJS to be used with PIXI.BitmapText.
     */
    class PixiBitmapFontManager implements gdjs.ResourceManager {
        private _imageManager;
        /** Pixi.BitmapFont used, indexed by their BitmapFont name. */
        private _pixiBitmapFontsInUse;
        /** Pixi.BitmapFont not used anymore, but not yet uninstalled, indexed by their BitmapFont name. */
        private _pixiBitmapFontsToUninstall;
        /** Loaded fonts data, indexed by resource name. */
        private _loadedFontsData;
        private _defaultSlugFontName;
        _resourceLoader: gdjs.ResourceLoader;
        /**
         * @param resourceDataArray The resources data of the game.
         * @param resourceLoader The resources loader of the game.
         * @param imageManager The image manager to be used to get textures used by fonts.
         */
        constructor(resourceLoader: gdjs.ResourceLoader, imageManager: gdjs.PixiImageManager);
        getResourceKinds(): ResourceKind[];
        /**
         * Get the instance of the default `Pixi.BitmapFont`, always available.
         */
        getDefaultBitmapFont(): import("pixi.js").BitmapFont;
        /**
         * Called to specify that the bitmap font with the specified key is used by an object
         * (i.e: this is reference counting).
         * `releaseBitmapFont` *must* be called to mark the font as not used anymore when the
         * object is destroyed or its font changed.
         *
         * @param bitmapFontInstallKey Name of the font of the BitmapFont (`bitmapFont.font`)
         */
        private _markBitmapFontAsUsed;
        /**
         * When a font is not used by an object anymore (object destroyed or font changed),
         * call this function to decrease the internal count of objects using the font.
         *
         * When a font is not unused anymore, it goes in a temporary cache. The cache holds up to 10 fonts.
         * If the cache reaches its maximum capacity, the oldest font is uninstalled from memory.
         *
         * @param bitmapFontInstallKey Name of the font of the BitmapFont (`bitmapFont.font`)
         */
        releaseBitmapFont(bitmapFontInstallKey: string): void;
        /**
         * Given a bitmap font resource name and a texture atlas resource name, returns the PIXI.BitmapFont
         * for it.
         * The font is register and should be released with `releaseBitmapFont` - so that it can be removed
         * from memory when unused.
         */
        obtainBitmapFont(bitmapFontResourceName: string, textureAtlasResourceName: string): PIXI.BitmapFont;
        processResource(resourceName: string): Promise<void>;
        /**
         * Load the "bitmapFont" resources of the game, so that they are ready
         * to be used when `obtainBitmapFont` is called.
         */
        loadResource(resourceName: string): Promise<void>;
    }
    const BitmapFontManager: typeof PixiBitmapFontManager;
    type BitmapFontManager = gdjs.PixiBitmapFontManager;
}
