declare namespace gdjs {
    namespace evtTools {
        /**
         * The namespace containing tools to interact with the debugger.
         * @namespace
         */
        namespace debuggerTools {
            /**
             * Stop the game execution.
             * @param runtimeScene - The current scene.
             */
            const pause: (runtimeScene: gdjs.RuntimeScene) => void;
            /**
             * Logs a message to the console.
             * @param message - The message to log.
             * @param type - The type of log (info, warning or error).
             * @param group - The group of messages it belongs to.
             */
            const log: (message: string, type: 'info' | 'warning' | 'error', group: string) => void;
            /**
             * Enable or disable the debug draw.
             * @param runtimeScene - The current scene.
             * @param enableDebugDraw - true to enable the debug draw, false to disable it.
             * @param showHiddenInstances - true to apply the debug draw to hidden objects.
             * @param showPointsNames - true to show point names.
             * @param showCustomPoints - true to show custom points of Sprite objects.
             */
            const enableDebugDraw: (runtimeScene: gdjs.RuntimeScene, enableDebugDraw: boolean, showHiddenInstances: boolean, showPointsNames: boolean, showCustomPoints: boolean) => void;
        }
    }
}
