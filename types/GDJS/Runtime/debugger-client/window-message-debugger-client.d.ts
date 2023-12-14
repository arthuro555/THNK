declare namespace gdjs {
    /**
     * This debugger client connects to the parent window, exchanging
     * and receiving messages using `postMessage` and the `message` event listener.
     */
    class WindowMessageDebuggerClient extends gdjs.AbstractDebuggerClient {
        _opener: Window | null;
        /**
         * @param path - The path of the property to modify, starting from the RuntimeGame.
         */
        constructor(runtimeGame: RuntimeGame);
        protected _sendMessage(message: string): void;
    }
    const DebuggerClient: typeof WindowMessageDebuggerClient;
}
