declare namespace gdjs {
    namespace evtTools {
        /**
         * This is an example of some functions that can be used through events.
         * They could live on any object but it's usual to store them in an object
         * with the extension name in `gdjs.evtTools`.
         *
         * Functions are being passed the arguments that were declared in the extension.
         */
        namespace exampleJsExtension {
            const myConditionFunction: (number: any, text: any) => boolean;
            const getString: () => string;
        }
    }
}
