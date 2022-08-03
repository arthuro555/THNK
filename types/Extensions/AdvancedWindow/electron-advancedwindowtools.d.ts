declare namespace gdjs {
    /**
     * Tools to manipulate the game window positioning and
     * interactions with the operating system.
     * @author arthuro555
     */
    namespace evtTools {
        namespace advancedWindow {
            const focus: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isFocused: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const show: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isVisible: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const maximize: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isMaximized: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const minimize: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isMinimized: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const enable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isEnabled: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setResizable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isResizable: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setMovable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isMovable: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setMaximizable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isMaximizable: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setMinimizable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isMinimizable: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setFullScreenable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isFullScreenable: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setClosable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isClosable: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setAlwaysOnTop: (activate: boolean, level: 'normal' | 'floating' | 'torn-off-menu' | 'modal-panel' | 'main-menu' | 'status' | 'pop-up-menu' | 'screen-saver', runtimeScene: gdjs.RuntimeScene) => void;
            const isAlwaysOnTop: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setPosition: (x: float, y: float, runtimeScene: gdjs.RuntimeScene) => void;
            const getPositionX: (runtimeScene: gdjs.RuntimeScene) => number;
            const getPositionY: (runtimeScene: gdjs.RuntimeScene) => number;
            const setKiosk: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const isKiosk: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const flash: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const setHasShadow: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const hasShadow: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const setOpacity: (opacity: float, runtimeScene: gdjs.RuntimeScene) => void;
            const getOpacity: (runtimeScene: gdjs.RuntimeScene) => number;
            const setContentProtection: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
            const setFocusable: (activate: boolean, runtimeScene: gdjs.RuntimeScene) => void;
        }
    }
}
