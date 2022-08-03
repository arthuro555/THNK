declare namespace gdjs {
    class TextRuntimeObjectPixiRenderer {
        _object: gdjs.TextRuntimeObject;
        _fontManager: any;
        _text: PIXI.Text;
        _justCreated: boolean;
        constructor(runtimeObject: gdjs.TextRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        getRendererObject(): PIXI.Text;
        ensureUpToDate(): void;
        updateStyle(): void;
        updatePosition(): void;
        updateAngle(): void;
        updateOpacity(): void;
        updateString(): void;
        getWidth(): float;
        getHeight(): float;
        _getColorHex(): number;
        _getGradientHex(): string[];
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
    }
    export const TextRuntimeObjectRenderer: typeof TextRuntimeObjectPixiRenderer;
    export type TextRuntimeObjectRenderer = TextRuntimeObjectPixiRenderer;
    export {};
}
