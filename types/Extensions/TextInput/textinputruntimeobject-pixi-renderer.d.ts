declare namespace gdjs {
    class TextInputRuntimeObjectPixiRenderer {
        private _object;
        private _input;
        private _runtimeScene;
        private _runtimeGame;
        constructor(runtimeObject: gdjs.TextInputRuntimeObject);
        _createElement(): void;
        _destroyElement(): void;
        onScenePaused(): void;
        onSceneResumed(): void;
        onDestroy(): void;
        updatePreRender(): void;
        updateString(): void;
        updatePlaceholder(): void;
        updateFont(): void;
        updateOpacity(): void;
        updateInputType(): void;
        updateTextColor(): void;
        updateFillColorAndOpacity(): void;
        updateBorderColorAndOpacity(): void;
        updateBorderWidth(): void;
        updateDisabled(): void;
        updateReadOnly(): void;
        isFocused(): boolean;
    }
    export const TextInputRuntimeObjectRenderer: typeof TextInputRuntimeObjectPixiRenderer;
    export type TextInputRuntimeObjectRenderer = TextInputRuntimeObjectPixiRenderer;
    export {};
}
