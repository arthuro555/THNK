declare namespace gdjs {
    enum LoadingScreenState {
        NOT_STARTED = 0,
        STARTED = 1,
        FINISHED = 2
    }
    class LoadingScreenPixiRenderer {
        _pixiRenderer: PIXI.Renderer | null;
        _loadingScreenData: LoadingScreenData;
        _loadingScreenContainer: PIXI.Container;
        _backgroundSprite: PIXI.Sprite | null;
        _gdevelopLogoSprite: PIXI.Sprite | null;
        _progressBarGraphics: PIXI.Graphics | null;
        _state: LoadingScreenState;
        _startTimeInMs: float;
        _backgroundReadyTimeInMs: float;
        _lastFrameTimeInMs: float;
        _progressPercent: float;
        constructor(runtimeGamePixiRenderer: gdjs.RuntimeGamePixiRenderer, imageManager: gdjs.PixiImageManager, loadingScreenData: LoadingScreenData);
        setPercent(percent: number): void;
        private _startLoadingScreen;
        private _updatePositions;
        private _render;
        unload(): Promise<void>;
    }
    export const LoadingScreenRenderer: typeof LoadingScreenPixiRenderer;
    export {};
}
