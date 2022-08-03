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
             * Check if the device has a touchscreen
             */
            const hasTouchScreen: () => boolean;
            /**
             * Check if the the device supports WebGL.
             * @returns true if WebGL is supported
             */
            const isWebGLSupported: (runtimeScene: gdjs.RuntimeScene) => boolean;
            /**
             * Check if the game is running as a preview, launched from an editor.
             * @param runtimeScene The current scene.
             * @returns true if the game is running as a preview.
             */
            const isPreview: (runtimeScene: gdjs.RuntimeScene) => boolean;
        }
    }
}
