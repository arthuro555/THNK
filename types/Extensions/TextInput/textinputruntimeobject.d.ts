declare namespace gdjs {
    const supportedInputTypes: readonly ["text", "email", "password", "number", "telephone number", "url", "search", "text area"];
    type SupportedInputType = typeof supportedInputTypes[number];
    /** Base parameters for {@link gdjs.TextInputRuntimeObject} */
    export interface TextInputObjectData extends ObjectData {
        /** The base parameters of the TextInput */
        content: {
            initialValue: string;
            placeholder: string;
            fontResourceName: string;
            fontSize: float;
            inputType: SupportedInputType;
            textColor: string;
            fillColor: string;
            fillOpacity: float;
            borderColor: string;
            borderOpacity: float;
            borderWidth: float;
            disabled: boolean;
            readOnly: boolean;
        };
    }
    /**
     * Shows a text input on the screen the player can type text into.
     */
    export class TextInputRuntimeObject extends gdjs.RuntimeObject {
        private _string;
        private _placeholder;
        private opacity;
        private _width;
        private _height;
        private _fontResourceName;
        private _fontSize;
        private _inputType;
        private _textColor;
        private _fillColor;
        private _fillOpacity;
        private _borderColor;
        private _borderOpacity;
        private _borderWidth;
        private _disabled;
        private _readOnly;
        _renderer: TextInputRuntimeObjectRenderer;
        constructor(runtimeScene: gdjs.RuntimeScene, objectData: TextInputObjectData);
        getRendererObject(): null;
        updateFromObjectData(oldObjectData: TextInputObjectData, newObjectData: TextInputObjectData): boolean;
        updatePreRender(runtimeScene: RuntimeScene): void;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        onScenePaused(runtimeScene: gdjs.RuntimeScene): void;
        onSceneResumed(runtimeScene: gdjs.RuntimeScene): void;
        onDestroyFromScene(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Set object opacity.
         */
        setOpacity(opacity: any): void;
        /**
         * Get object opacity.
         */
        getOpacity(): number;
        /**
         * Set the width of the object, if applicable.
         * @param width The new width in pixels.
         */
        setWidth(width: float): void;
        /**
         * Set the height of the object, if applicable.
         * @param height The new height in pixels.
         */
        setHeight(height: float): void;
        /**
         * Return the width of the object.
         * @return The width of the object
         */
        getWidth(): float;
        /**
         * Return the width of the object.
         * @return The height of the object
         */
        getHeight(): float;
        /**
         * Get the text entered in the text input.
         */
        getString(): string;
        /**
         * Replace the text inside the text input.
         */
        setString(newString: string): void;
        /**
         * Called by the renderer when the value of the input shown on the screen
         * was changed (because the user typed something).
         * This does not propagate back the value to the renderer, which would
         * result in the cursor being sent back to the end of the text.
         *
         * Do not use this if you are not inside the renderer - use `setString` instead.
         */
        onRendererInputValueChanged(inputValue: string): void;
        getFontResourceName(): string;
        setFontResourceName(resourceName: string): void;
        getFontSize(): number;
        setFontSize(newSize: number): void;
        /**
         * Get the placeholder shown when no text is entered
         */
        getPlaceholder(): string;
        /**
         * Replace the text inside the text input.
         */
        setPlaceholder(newPlaceholder: string): void;
        /**
         * Get the type of the input.
         */
        getInputType(): "number" | "search" | "password" | "text" | "email" | "url" | "telephone number" | "text area";
        /**
         * Set the type of the input.
         */
        setInputType(newInputType: string): void;
        setTextColor(newColor: string): void;
        getTextColor(): string;
        _getRawTextColor(): [float, float, float];
        setFillColor(newColor: string): void;
        getFillColor(): string;
        _getRawFillColor(): [float, float, float];
        setFillOpacity(newOpacity: float): void;
        getFillOpacity(): float;
        setBorderColor(newColor: string): void;
        getBorderColor(): string;
        _getRawBorderColor(): [float, float, float];
        setBorderOpacity(newOpacity: float): void;
        getBorderOpacity(): float;
        setBorderWidth(width: float): void;
        getBorderWidth(): float;
        setDisabled(value: boolean): void;
        isDisabled(): boolean;
        setReadOnly(value: boolean): void;
        isReadOnly(): boolean;
        isFocused(): boolean;
    }
    export {};
}
