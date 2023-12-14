declare namespace gdjs {
    /** Base parameters for {@link gdjs.BBTextRuntimeObject} */
    type BBTextObjectDataType = {
        /** The base parameters of the BBText */
        content: {
            /** The opacity of the BBText */
            opacity: number;
            /** Deprecated - Is the text visible? */
            visible: boolean;
            /** Content of the text */
            text: string;
            /** The color of the text */
            color: string;
            /** The font of the text */
            fontFamily: string;
            /** The size of the text */
            fontSize: number;
            /** Activate word wrap if set to true */
            wordWrap: boolean;
            /** Alignment of the text: "left", "center" or "right" */
            align: 'left' | 'center' | 'right';
        };
    };
    type BBTextObjectData = ObjectData & BBTextObjectDataType;
    /**
     * Displays a rich text using BBCode markup (allowing to set parts of the text as bold, italic, use different colors and shadows).
     */
    class BBTextRuntimeObject extends gdjs.RuntimeObject implements gdjs.OpacityHandler {
        _opacity: float;
        _text: string;
        /** color in format [r, g, b], where each component is in the range [0, 255] */
        _color: integer[];
        _fontFamily: string;
        _fontSize: number;
        _wordWrap: boolean;
        _wrappingWidth: float;
        _align: string;
        _renderer: gdjs.BBTextRuntimeObjectRenderer;
        hidden: boolean;
        /**
         * @param instanceContainer The container the object belongs to.
         * @param objectData The object data used to initialize the object
         */
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, objectData: BBTextObjectData);
        getRendererObject(): MultiStyleText;
        updateFromObjectData(oldObjectData: BBTextObjectDataType, newObjectData: BBTextObjectDataType): boolean;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        onDestroyed(): void;
        /**
         * Set the markup text to display.
         */
        setBBText(text: any): void;
        /**
         * Get the markup text displayed by the object.
         */
        getBBText(): string;
        setColor(rgbColorString: any): void;
        /**
         * Get the base color.
         * @return The color as a "R;G;B" string, for example: "255;0;0"
         */
        getColor(): string;
        setFontSize(fontSize: any): void;
        getFontSize(): number;
        setFontFamily(fontFamily: any): void;
        getFontFamily(): string;
        setAlignment(align: any): void;
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
        getOpacity(): number;
        /**
         * Set the width.
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
