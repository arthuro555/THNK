declare namespace gdjs {
    namespace evtTools {
        namespace systemInfo {
            /**
             * Check if the game runs on a mobile device (iPhone, iPad, Android).
             * Note that the distinction between what is a mobile device and what is not
             * is becoming blurry. If you use this for mobile controls,
             * prefer to check if the device has touchscreen support.
             */
            const isMobile: () => boolean;
            /**
             * Check if the game is running as a native mobile app - which in the case
             * of an exported GDevelop game means: running packaged inside Cordova/Capacitor.js.
             *
             * Note: this could be improved to also detect running inside an embedded webview.
             *
             * @returns true if running inside Cordova (or Capacitor.js).
             */
            const isNativeMobileApp: () => boolean;
            /**
             * Check if the game is running as a native desktop app - which in the case
             * of an exported GDevelop game means: running packaged inside Electron.
             *
             * @param instanceContainer The current scene.
             * @returns true if running inside Electron.
             */
            const isNativeDesktopApp: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            /**
             * Check if the device has a touchscreen
             */
            const hasTouchScreen: () => boolean;
            /**
             * Check if the the device supports WebGL.
             * @returns true if WebGL is supported
             */
            const isWebGLSupported: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            /**
             * Check if the game is running as a preview, launched from an editor.
             * @param instanceContainer The current container.
             * @returns true if the game is running as a preview.
             */
            const isPreview: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
        }
    }
}
