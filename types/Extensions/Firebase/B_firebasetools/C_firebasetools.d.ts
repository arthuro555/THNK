declare namespace gdjs {
    namespace evtTools {
        /**
         * Firebase Event Tools
         * @namespace
         */
        namespace firebaseTools {
            /**
             * An array of callbacks to call when the app gets initialized.
             */
            const onAppCreated: Array<() => void>;
            /**
             * Sets up the Firebase SDK. Only exported for testing purposes.
             * @internal
             */
            const _setupFirebase: (runtimeScene: gdjs.RuntimeScene) => Promise<void>;
        }
    }
}
