declare namespace gdjs {
    /**
     * This debugger client connects to a websocket server, exchanging
     * and receiving messages with this server.
     */
    class WebsocketDebuggerClient extends gdjs.AbstractDebuggerClient {
        _ws: WebSocket | null;
        /**
         * @param path - The path of the property to modify, starting from the RuntimeGame.
         */
        constructor(runtimeGame: RuntimeGame);
        private hasLoggedError;
        protected _sendMessage(message: string): void;
    }
    const DebuggerClient: typeof WebsocketDebuggerClient;
}
