declare namespace gdjs {
    class TextEntryRuntimeObjectPixiRenderer {
        _object: gdjs.TextEntryRuntimeObject;
        _pressHandler: any;
        _upHandler: any;
        _downHandler: any;
        constructor(runtimeObject: gdjs.TextEntryRuntimeObject);
        onDestroy(): void;
        updateString(): void;
        activate(enable: any): void;
    }
    export const TextEntryRuntimeObjectRenderer: typeof TextEntryRuntimeObjectPixiRenderer;
    export type TextEntryRuntimeObjectRenderer = TextEntryRuntimeObjectPixiRenderer;
    export {};
}
