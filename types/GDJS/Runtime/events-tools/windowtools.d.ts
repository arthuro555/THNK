declare namespace gdjs {
    namespace evtTools {
        /**
         * Tools related to window, for events generated code.
         */
        namespace window {
            const setMargins: (runtimeScene: gdjs.RuntimeScene, top: number, right: number, bottom: number, left: number) => void;
            const setFullScreen: (runtimeScene: gdjs.RuntimeScene, enable: boolean, keepAspectRatio: boolean) => void;
            const isFullScreen: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setWindowSize: (runtimeScene: gdjs.RuntimeScene, width: float, height: float, updateGameResolution: boolean) => void;
            const centerWindow: (runtimeScene: gdjs.RuntimeScene) => void;
            const setGameResolutionSize: (runtimeScene: gdjs.RuntimeScene, width: float, height: float) => void;
            const setGameResolutionResizeMode: (runtimeScene: gdjs.RuntimeScene, resizeMode: string) => void;
            const setAdaptGameResolutionAtRuntime: (runtimeScene: gdjs.RuntimeScene, enable: boolean) => void;
            const setWindowTitle: (runtimeScene: gdjs.RuntimeScene, title: string) => void;
            const getWindowTitle: (runtimeScene: gdjs.RuntimeScene) => string;
            const getWindowInnerWidth: () => number;
            const getWindowInnerHeight: () => number;
            const getGameResolutionWidth: (runtimeScene: gdjs.RuntimeScene) => number;
            const getGameResolutionHeight: (runtimeScene: gdjs.RuntimeScene) => number;
            const openURL: (url: string, runtimeScene: gdjs.RuntimeScene) => void;
        }
    }
}
