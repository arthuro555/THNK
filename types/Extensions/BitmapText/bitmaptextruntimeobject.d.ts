declare namespace gdjs {
    /** Base parameters for {@link gdjs.BitmapTextRuntimeObject} */
    type BitmapTextObjectDataType = {
        /** The base parameters of the Bitmap Text */
        content: {
            /** The opacity of the text. */
            opacity: float;
            /** Content of the text. */
            text: string;
            /** The tint of the text. */
            tint: string;
            /** The name of the resource containing the bitmap font for the text. */
            bitmapFontResourceName: string;
            /** The name of the resource containing the atlas image file for the text. */
            textureAtlasResourceName: string;
            /** The scale of the text. */
            scale: float;
            /** Activate word wrap if set to true. */
            wordWrap: boolean;
            /** Wrapping with from custom size properties. */
            wrappingWidth: float;
            /** Alignment of the text. */
            align: 'left' | 'center' | 'right';
        };
    };
    type BitmapTextObjectData = ObjectData & BitmapTextObjectDataType;
    /**
     * Displays a text using a "Bitmap Font", generated in a external editor like bmFont.
     * This is more efficient/faster to render than a traditional text (which needs
     * to have its whole texture re-rendered anytime it changes).
     *
     * Bitmap Font can be created with softwares like:
     * * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/|http://www.angelcode.com/products/bmfont/
     * * Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner|http://www.71squared.com/en/glyphdesigner
     * * Littera (Web-based, free): http://kvazars.com/littera/|http://kvazars.com/littera/
     */
    class BitmapTextRuntimeObject extends gdjs.RuntimeObject {
        _opacity: float;
        _text: string;
        /** color in format [r, g, b], where each component is in the range [0, 255] */
        _tint: integer[];
        _bitmapFontResourceName: string;
        _textureAtlasResourceName: string;
        _scale: number;
        _wordWrap: boolean;
        _wrappingWidth: float;
        _align: string;
        _renderer: gdjs.BitmapTextRuntimeObjectPixiRenderer;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param objectData The object data used to initialize the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, objectData: BitmapTextObjectData);
        getRendererObject(): PIXI.BitmapText;
        updateFromObjectData(oldObjectData: BitmapTextObjectDataType, newObjectData: BitmapTextObjectDataType): boolean;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        onDestroyFromScene(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Set the text to display.
         */
        setText(text: string): void;
        /**
         * Get the text displayed by the object.
         */
        getText(): string;
        setTint(rgbColorString: string): void;
        getTint(): string;
        setScale(scale: float): void;
        getScale(): float;
        getFontSize(): float;
        setBitmapFontAndTextureAtlasResourceName(bitmapFontResourceName: string, textureAtlasResourceName: string): void;
        setBitmapFontResourceName(bitmapFontResourceName: string): void;
        getBitmapFontResourceName(): string;
        setTextureAtlasResourceName(textureAtlasResourceName: string): void;
        getTextureAtlasResourceName(): string;
        setAlignment(align: string): void;
        getAlignment(): string;
        /**
         * Set object position on X axis.
         * @param x The new position X of the object.
         */
        setX(x: float): void;
        /**
         * Set object position on Y axis.
         * @param y The new position Y of the object.
         */
        setY(y: float): void;
        /**
         * Set the angle of the object.
         * @param angle The new angle of the object.
         */
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
        /**
         * Set the wrapping width.
         * @param width The new width in pixels.
         */
        setWrappingWidth(width: float): void;
        /**
         * Get the wrapping width of the object.
         */
        getWrappingWidth(): float;
        setWordWrap(wordWrap: boolean): void;
        getWordWrap(): boolean;
        /**
         * Get the width of the object.
         */
        getWidth(): float;
        /**
         * Get the height of the object.
         */
        getHeight(): float;
    }
}
