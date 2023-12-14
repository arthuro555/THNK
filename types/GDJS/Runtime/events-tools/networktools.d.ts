declare namespace gdjs {
    namespace evtTools {
        namespace network {
            /**
             * Send an asynchronous request to the specified URL, with the specified (text)
             * body, method and contentType (defaults to `application/x-www-form-urlencoded`).
             * The result is stored in the specified response variable. Any error is stored in
             * the specified error variable.
             *
             * @param url The URL to send the request to.
             * @param body The content to be sent.
             * @param method The method to use ("GET", "POST", "PUT", "HEAD", "DELETE", "PATCH", "OPTIONS")
             * @param contentType The content type. Defaults to `application/x-www-form-urlencoded` if empty.
             * @param responseVar The variable where to store the response text.
             * @param errorVar The variable where to store the error message or status code (if status >= 400).
             */
            const sendAsyncRequest: (url: string, body: string, method: string, contentType: string, responseVar: gdjs.Variable, errorVar: gdjs.Variable) => void;
            const sendAwaitableAsyncRequest: (url: string, body: string, method: string, contentType: string, responseVar: gdjs.Variable, errorVar: gdjs.Variable) => PromiseTask;
            /**
             * @deprecated
             */
            const sendDeprecatedSynchronousRequest: (host: any, uri: any, body: any, method: any, contentType: any, responseVar: any) => void;
            const enableMetrics: (instanceContainer: gdjs.RuntimeInstanceContainer, enable: boolean) => void;
            /**
             * Convert a variable to JSON.
             * @param variable The variable to convert to JSON
             * @returns The JSON string representing the variable
             *
             * @deprecated Use `JSON.stringify(variable.toJSObject())` instead.
             */
            const variableStructureToJSON: (variable: gdjs.Variable) => string;
            /**
             * @deprecated Use `JSON.stringify(variable.toJSObject())` instead.
             */
            const objectVariableStructureToJSON: (object: gdjs.RuntimeObject | null, variable: gdjs.Variable) => string;
            /**
             * @deprecated Use `variable.fromJSObject` instead.
             */
            const _objectToVariable: (obj: any, variable: gdjs.Variable) => void;
            /**
             * Parse the given JSON and fill the content of the variable with it.
             *
             * @param jsonStr The JSON string
             * @param variable The variable where to put the parsed JSON
             * @returns true if JSON was properly parsed
             *
             * @deprecated Use `variable.fromJSON` instead.
             */
            const jsonToVariableStructure: (jsonStr: string, variable: gdjs.Variable) => void;
            /**
             * @deprecated Use `variable.fromJSON` instead.
             */
            const jsonToObjectVariableStructure: (jsonStr: string, object: gdjs.RuntimeObject | null, variable: gdjs.Variable) => void;
        }
    }
}
