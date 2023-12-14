declare namespace gdjs {
    namespace screenshot {
        /**
         * Save a screenshot of the game.
         * @param instanceContainer The container
         * @param savePath The path where to save the screenshot
         */
        const takeScreenshot: (instanceContainer: gdjs.RuntimeInstanceContainer, savePath: string) => void;
    }
}
