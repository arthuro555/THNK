declare namespace gdjs {
    /** Base parameters for gdjs.TextRuntimeObject */
    type TextObjectDataType = {
        /** The size of the characters */
        characterSize: number;
        /** The font name */
        font: string;
        /** Is Bold? */
        bold: boolean;
        /** Is Italic? */
        italic: boolean;
        /** Is Underlined? */
        underlined: boolean;
        /** The text color in an RGB representation */
        color: {
            /** The Red level from 0 to 255 */
            r: number;
            /** The Green level from 0 to 255 */
            g: number;
            /** The Blue level from 0 to 255 */
            b: number;
        };
        /** The text of the object */
        string: string;
    };
    type TextObjectData = ObjectData & TextObjectDataType;
    /**
     * Displays a text.
     */
    class TextRuntimeObject extends gdjs.RuntimeObject {
        _characterSize: number;
        _fontName: string;
        _bold: boolean;
        _italic: boolean;
        _underlined: boolean;
        _color: integer[];
        _useGradient: boolean;
        _gradient: Array<Array<integer>>;
        _gradientType: string;
        opacity: float;
        _textAlign: string;
        _wrapping: boolean;
        _wrappingWidth: float;
        _outlineThickness: number;
        _outlineColor: integer[];
        _shadow: boolean;
        _shadowColor: integer[];
        _shadowDistance: number;
        _shadowBlur: integer;
        _shadowAngle: float;
        _padding: integer;
        _str: string;
        _renderer: gdjs.TextRuntimeObjectRenderer;
        _scaleX: number;
        _scaleY: number;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param textObjectData The initial properties of the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, textObjectData: TextObjectData);
        updateFromObjectData(oldObjectData: TextObjectData, newObjectData: TextObjectData): boolean;
        getRendererObject(): PIXI.Text;
        update(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        /**
         * Update the rendered object position.
         */
        private _updateTextPosition;
        /**
         * Set object position on X axis.
         */
        setX(x: any): void;
        /**
         * Set object position on Y axis.
         */
        setY(y: any): void;
        /**
         * Set the angle of the object.
         * @param angle The new angle of the object
         */
        setAngle(angle: float): void;
        /**
         * Set object opacity.
         */
        setOpacity(opacity: any): void;
        /**
         * Get object opacity.
         */
        getOpacity(): number;
        /**
         * Get the string displayed by the object.
         */
        getString(): string;
        /**
         * Set the string displayed by the object.
         * @param str The new text
         */
        setString(str: string): void;
        /**
         * Get the font size of the characters of the object.
         */
        getCharacterSize(): number;
        /**
         * Set the font size for characters of the object.
         * @param newSize The new font size for the text.
         */
        setCharacterSize(newSize: number): void;
        /**
         * Set the name of the resource to use for the font.
         * @param fontResourceName The name of the font resource.
         */
        setFontName(fontResourceName: string): void;
        /**
         * Return true if the text is bold.
         */
        isBold(): boolean;
        /**
         * Set bold for the object text.
         * @param enable {boolean} true to have a bold text, false otherwise.
         */
        setBold(enable: any): void;
        /**
         * Return true if the text is italic.
         */
        isItalic(): boolean;
        /**
         * Set italic for the object text.
         * @param enable {boolean} true to have an italic text, false otherwise.
         */
        setItalic(enable: any): void;
        /**
         * Get width of the text.
         */
        getWidth(): float;
        /**
         * Get height of the text.
         */
        getHeight(): float;
        /**
         * Get scale of the text.
         */
        getScale(): float;
        /**
         * Get x-scale of the text.
         */
        getScaleX(): float;
        /**
         * Get y-scale of the text.
         */
        getScaleY(): float;
        /**
         * Set the text object scale.
         * @param newScale The new scale for the text object.
         */
        setScale(newScale: float): void;
        /**
         * Set the text object x-scale.
         * @param newScale The new x-scale for the text object.
         */
        setScaleX(newScale: float): void;
        /**
         * Set the text object y-scale.
         * @param newScale The new y-scale for the text object.
         */
        setScaleY(newScale: float): void;
        /**
         * Change the text color.
         * @param color color as a "R;G;B" string, for example: "255;0;0"
         */
        setColor(str: string): void;
        /**
         * Get the text color.
         * @return The color as a "R;G;B" string, for example: "255;0;0"
         */
        getColor(): string;
        /**
         * Set the text alignment for multiline text objects.
         * @param alignment The text alignment.
         */
        setTextAlignment(alignment: string): void;
        /**
         * Get the text alignment of text object.
         * @return The text alignment.
         */
        getTextAlignment(): string;
        /**
         * Return true if word wrapping is enabled for the text.
         */
        isWrapping(): boolean;
        /**
         * Set word wrapping for the object text.
         * @param enable true to enable word wrapping, false to disable it.
         */
        setWrapping(enable: boolean): void;
        /**
         * Get the word wrapping width for the text object.
         */
        getWrappingWidth(): float;
        /**
         * Set the word wrapping width for the text object.
         * @param width The new width to set.
         */
        setWrappingWidth(width: float): void;
        /**
         * Set the outline for the text object.
         * @param str color as a "R;G;B" string, for example: "255;0;0"
         * @param thickness thickness of the outline (0 = disabled)
         */
        setOutline(str: string, thickness: number): void;
        /**
         * Set the shadow for the text object.
         * @param str color as a "R;G;B" string, for example: "255;0;0"
         * @param distance distance between the shadow and the text, in pixels.
         * @param blur amout of shadow blur, in pixels.
         * @param angle shadow offset direction, in degrees.
         */
        setShadow(str: string, distance: number, blur: integer, angle: float): void;
        /**
         * Set the gradient for the text object.
         * @param strFirstColor color as a "R;G;B" string, for example: "255;0;0"
         * @param strSecondColor color as a "R;G;B" string, for example: "255;0;0"
         * @param strThirdColor color as a "R;G;B" string, for example: "255;0;0"
         * @param strFourthColor color as a "R;G;B" string, for example: "255;0;0"
         * @param strGradientType gradient type
         */
        setGradient(strGradientType: string, strFirstColor: string, strSecondColor: string, strThirdColor: string, strFourthColor: string): void;
        /**
         * Show the shadow of the text object.
         * @param enable true to show the shadow, false to hide it
         */
        showShadow(enable: boolean): void;
        /**
         * Get padding of the text object.
         * @return number of pixels around the text before it gets cropped
         */
        getPadding(): number;
        /**
         * Set padding of the text object.
         * @param value number of pixels around the text before it gets cropped
         */
        setPadding(value: float): void;
    }
}
