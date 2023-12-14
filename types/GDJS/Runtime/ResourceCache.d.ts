declare namespace gdjs {
    /**
     * A cache of resources that helps ensuring that files are only downloaded
     * once.
     */
    class ResourceCache<C> {
        private _nameToContent;
        private _fileToContent;
        constructor();
        /**
         * Gives a fast access to asset content when they were pre-loaded and
         * on-the-fly loading is not allowed.
         */
        getFromName(name: string): C | null;
        get(resource: ResourceData): C | null;
        set(resource: ResourceData, content: C): void;
        delete(resource: ResourceData): void;
        clear(): void;
    }
}
