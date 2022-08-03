declare namespace gdjs {
    /**
     * The PIXI.js renderer for the DummyRuntimeObject.
     * @ignore
     */
    class DummyRuntimeObjectPixiRenderer {
        _object: gdjs.DummyRuntimeObject;
        _text: any;
        /**
         * @param runtimeObject The object to render
         * @param runtimeScene The gdjs.RuntimeScene in which the object is
         */
        constructor(runtimeObject: gdjs.DummyRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        getRendererObject(): any;
        ensureUpToDate(): void;
        updateText(): void;
        updatePosition(): void;
        updateAngle(): void;
        updateOpacity(): void;
        getWidth(): float;
        getHeight(): float;
    }
    const DummyRuntimeObjectRenderer: typeof DummyRuntimeObjectPixiRenderer;
    type DummyRuntimeObjectRenderer = DummyRuntimeObjectPixiRenderer;
}
