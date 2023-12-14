declare namespace gdjs {
    /**
     * A resource managers that download and remember downloaded content for one
     * kind of resource.
     */
    interface ResourceManager {
        /**
         * Load the specified resource.
         *
         * This method will be run during the game. It should only do light tasks
         * like file downloading.
         */
        loadResource(resourceName: string): Promise<void>;
        /**
         * Process the specified resource.
         *
         * This method will only be run while loading screen is shown. It can do
         * heavy tasks like parsing data.
         */
        processResource(resourceName: string): Promise<void>;
        /**
         * Return the kind of resources handled by this manager.
         */
        getResourceKinds(): Array<ResourceKind>;
    }
}
