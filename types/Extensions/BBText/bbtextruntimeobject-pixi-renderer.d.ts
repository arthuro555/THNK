declare var MultiStyleText: any;
declare namespace gdjs {
    /**
     * The PIXI.js renderer for the BBCode Text runtime object.
     */
    class BBTextRuntimeObjectPixiRenderer {
        _object: gdjs.BBTextRuntimeObject;
        _pixiObject: any;
        /**
         * @param runtimeObject The object to render
         * @param runtimeScene The gdjs.RuntimeScene in which the object is
         */
        constructor(runtimeObject: gdjs.BBTextRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        getRendererObject(): any;
        updateWordWrap(): void;
        updateWrappingWidth(): void;
        updateText(): void;
        updateColor(): void;
        updateAlignment(): void;
        updateFontFamily(): void;
        updateFontSize(): void;
        updatePosition(): void;
        updateAngle(): void;
        updateOpacity(): void;
        getWidth(): float;
        getHeight(): float;
    }
    const BBTextRuntimeObjectRenderer: typeof BBTextRuntimeObjectPixiRenderer;
    type BBTextRuntimeObjectRenderer = BBTextRuntimeObjectPixiRenderer;
}
