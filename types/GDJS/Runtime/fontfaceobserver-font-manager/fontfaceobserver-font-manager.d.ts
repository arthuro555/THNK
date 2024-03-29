declare namespace gdjs {
    /**
     * FontFaceObserverFontManager loads fonts (using `FontFace` or `fontfaceobserver` library)
     * from the game resources (see `loadFonts`), and allow to access to
     * the font families of the loaded fonts during the game (see `getFontFamily`).
     */
    class FontFaceObserverFontManager implements gdjs.ResourceManager {
        _resourceLoader: gdjs.ResourceLoader;
        _loadedFontFamily: ResourceCache<string>;
        _loadedFontFamilySet: Set<string>;
        /**
         * @param resources The resources data of the game.
         * @param resourceLoader The resources loader of the game.
         */
        constructor(resourceLoader: gdjs.ResourceLoader);
        getResourceKinds(): ResourceKind[];
        /**
         * Return the font family associated to the specified font resource name.
         * The font resource must have been loaded before. If that's not the case,
         * a default font family will be returned ("Arial").
         *
         * @param resourceName The name of the resource to get.
         * @returns The font family to be used for this font resource,
         * or "Arial" if not loaded.
         */
        getFontFamily(resourceName: string): string;
        /**
         * Return the font file associated to the specified font resource name.
         * The font resource must have been loaded before. If that's not the case,
         * the resource name will be returned (to
         * keep compatibility with GDevelop 5.0-beta56 and previous).
         *
         * Should only be useful for renderers running on a non HTML5/non browser environment.
         *
         * @param resourceName The name of the resource to get.
         * @returns The file of the font resource.
         */
        getFontFile(resourceName: string): string;
        /**
         * Return the font family to use for a given filename.
         * Each filename is guaranteed to have a unique font family. You should not rely
         * on the font family formatting (consider it as an "opaque string") - it's slugified
         * (no spaces, no dots, no non-alphanumeric characters) to avoid issues when using the
         * font family in various contexts.
         *
         * @param filename The filename of the font.
         * @returns The font family to be used for this font resource.
         */
        _getFontFamilyFromFilename(resource: ResourceData): string;
        /**
         * Load the font at the given `src` location (relative to the project), giving
         * it the specified `fontFamily` name.
         *
         * This uses FontFace (if supported) or @font-face + FontFaceObserver
         * to load a font from an url and be notified when loading is done (or failed).
         *
         * @param fontFamily The font
         * @returns The font family to be used for this font resource.
         */
        private _loadFont;
        processResource(resourceName: string): Promise<void>;
        /**
         * Load the specified resources, so that fonts are loaded and can then be
         * used by using the font family returned by getFontFamily.
         * @param onProgress Callback called each time a new file is loaded.
         */
        loadResource(resourceName: string): Promise<void>;
    }
    type FontManager = FontFaceObserverFontManager;
    const FontManager: typeof FontFaceObserverFontManager;
}
