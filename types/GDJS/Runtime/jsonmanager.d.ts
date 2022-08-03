declare namespace gdjs {
    type JsonManagerOnProgressCallback = (loadedCount: integer, totalCount: integer) => void;
    type JsonManagerOnCompleteCallback = (totalCount: integer) => void;
    /** The callback called when a json that was requested is loaded (or an error occured). */
    export type JsonManagerRequestCallback = (error: Error | null, content: Object | null) => void;
    /**
     * JsonManager loads json files (using `XMLHttpRequest`), using the "json" resources
     * registered in the game resources.
     *
     * Contrary to audio/fonts, json files are loaded asynchronously, when requested.
     * You should properly handle errors, and give the developer/player a way to know
     * that loading failed.
     */
    export class JsonManager {
        _resources: ResourceData[];
        _loadedJsons: {
            [key: string]: Object;
        };
        _callbacks: {
            [key: string]: Array<JsonManagerRequestCallback>;
        };
        /**
         * @param resources The resources data of the game.
         */
        constructor(resources: ResourceData[]);
        /**
         * Update the resources data of the game. Useful for hot-reloading, should not be used otherwise.
         *
         * @param resources The resources data of the game.
         */
        setResources(resources: ResourceData[]): void;
        /**
         * Request all the json resources to be preloaded (unless they are marked as not preloaded).
         *
         * Note that even if a JSON is already loaded, it will be reloaded (useful for hot-reloading,
         * as JSON files can have been modified without the editor knowing).
         *
         * @param onProgress The function called after each json is loaded.
         * @param onComplete The function called when all jsons are loaded.
         */
        preloadJsons(onProgress: JsonManagerOnProgressCallback, onComplete: JsonManagerOnCompleteCallback): void;
        /**
         * Request the json file from the given resource name.
         * This method is asynchronous. When loaded, the `callback` is called with the error
         * (null if none) and the loaded json (a JS Object).
         *
         * @param resourceName The resource pointing to the json file to load.
         * @param callback The callback function called when json is loaded (or an error occured).
         */
        loadJson(resourceName: string, callback: JsonManagerRequestCallback): void;
        /**
         * Check if the given json resource was loaded (preloaded or loaded with `loadJson`).
         * @param resourceName The name of the json resource.
         * @returns true if the content of the json resource is loaded. false otherwise.
         */
        isJsonLoaded(resourceName: string): boolean;
        /**
         * Get the object for the given resource that is already loaded (preloaded or loaded with `loadJson`).
         * If the resource is not loaded, `null` will be returned.
         *
         * @param resourceName The name of the json resource.
         * @returns the content of the json resource, if loaded. `null` otherwise.
         */
        getLoadedJson(resourceName: string): Object | null;
    }
    export {};
}
