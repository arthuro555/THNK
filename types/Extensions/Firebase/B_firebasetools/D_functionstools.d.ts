declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Functions Event Tools.
             * @namespace
             */
            namespace functions {
                /**
                 * Call an http function.
                 * @param httpFunctionName - The name of the function to call
                 * @param [parameters] - Parameters for the function either as a string.
                 * @param {gdjs.Variable} [callbackValueVariable] - The variable where to store the result.
                 * @param {gdjs.Variable} [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const call: (httpFunctionName: string, parameter: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => Promise<void>;
            }
        }
    }
}
