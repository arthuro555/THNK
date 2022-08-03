declare namespace gdjs {
    namespace screenshot {
        /**
         * Save a screenshot of the game.
         * @param runtimeScene The scene
         * @param savePath The path where to save the screenshot
         */
        const takeScreenshot: (runtimeScene: gdjs.RuntimeScene, savePath: string) => void;
    }
}
