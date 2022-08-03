declare namespace gdjs {
    namespace evtTools {
        /**
         * Functions to store and load basic values (strings or numbers), organized
         * into objects:
         * * Each object has a name
         * * Each value can be accessed using a path-like string
         *   (for example: `Root/Some folder/MyValueName`), where each segment is
         *   separated by a slash.
         *
         * These objects are persisted into the environment `localStorage` - which
         * might not always be available (if not, objects won't be persisted).
         */
        namespace storage {
            /**
             * Load into memory a JSON serialized object, from the local storage
             * provided by the browser/environment.
             *
             * The object name is prefixed with `GDJS_` in `localStorage`.
             *
             * @param name The name of the object to load
             */
            const loadJSONFileFromStorage: (name: string) => void;
            /**
             * Unload from memory an object, which is then serialized as JSON and
             * stored in the local storage provided by the browser/environment.
             *
             * The object name is prefixed with `GDJS_` in `localStorage`.
             *
             * @param name The name of the object to load
             */
            const unloadJSONFile: (name: string) => void;
            const clearJSONFile: (name: string) => any;
            const elementExistsInJSONFile: (name: string, elementPath: string) => any;
            const deleteElementFromJSONFile: (name: string, elementPath: string) => any;
            const writeNumberInJSONFile: (name: string, elementPath: string, val: any) => any;
            const writeStringInJSONFile: (name: string, elementPath: string, str: any) => any;
            const readNumberFromJSONFile: (name: string, elementPath: string, runtimeScene: gdjs.RuntimeScene | null, variable: gdjs.Variable) => any;
            const readStringFromJSONFile: (name: string, elementPath: string, runtimeScene: gdjs.RuntimeScene | null, variable: gdjs.Variable) => any;
        }
    }
}
