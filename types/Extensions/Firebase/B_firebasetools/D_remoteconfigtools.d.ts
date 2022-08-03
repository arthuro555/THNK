declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Remote Config Tools
             * @namespace
             */
            namespace remoteConfig {
                /**
                 * Set the interval between auto-config updates.
                 */
                const setAutoUpdateInterval: (interval: integer) => void;
                /**
                 * Set the default configuration, for when starting the game offline.
                 * @param variable - A structure defining the default variables.
                 */
                const setDefaultConfig: (variable: gdjs.Variable) => void;
            }
        }
    }
}
