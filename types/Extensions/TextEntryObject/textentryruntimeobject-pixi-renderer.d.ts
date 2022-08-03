declare namespace gdjs {
    class TextEntryRuntimeObjectPixiRenderer {
        _object: any;
        _pressHandler: any;
        _upHandler: any;
        _downHandler: any;
        constructor(runtimeObject: any);
        onDestroy(): void;
        updateString(): void;
        activate(enable: any): void;
    }
    export const TextEntryRuntimeObjectRenderer: typeof TextEntryRuntimeObjectPixiRenderer;
    export type TextEntryRuntimeObjectRenderer = TextEntryRuntimeObjectPixiRenderer;
    export {};
}
