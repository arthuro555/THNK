declare namespace gdjs {
    /**
     * The base class describing a debugger client, that can be used to inspect
     * a runtime game (dump its state) or alter it.
     */
    abstract class AbstractDebuggerClient {
        _runtimegame: gdjs.RuntimeGame;
        _hotReloader: gdjs.HotReloader;
        _originalConsole: {
            log: {
                (...data: any[]): void;
                (message?: any, ...optionalParams: any[]): void;
            };
            info: {
                (...data: any[]): void;
                (message?: any, ...optionalParams: any[]): void;
            };
            debug: {
                (...data: any[]): void;
                (message?: any, ...optionalParams: any[]): void;
            };
            warn: {
                (...data: any[]): void;
                (message?: any, ...optionalParams: any[]): void;
            };
            error: {
                (...data: any[]): void;
                (message?: any, ...optionalParams: any[]): void;
            };
        };
        constructor(runtimeGame: RuntimeGame);
        /**
         * Should be called by derived class to handle a command
         * received from the debugger server.
         *
         * @param data An object containing the command to do.
         */
        protected handleCommand(data: any): void;
        /**
         * Should be re-implemented by derived class to send a stringified message object
         * to the debugger server.
         * @param message
         */
        protected abstract _sendMessage(message: string): void;
        /**
         * Send a message (a log) to debugger server.
         */
        log(group: string, message: string, type: 'info' | 'warning' | 'error', internal: boolean): void;
        /**
         * Update a value, specified by a path starting from the {@link RuntimeGame} instance.
         * @param path - The path to the variable, starting from {@link RuntimeGame}.
         * @param newValue - The new value.
         * @return Was the operation successful?
         */
        set(path: string[], newValue: any): boolean;
        /**
         * Call a method, specified by a path starting from the {@link RuntimeGame} instance.
         * @param path - The path to the method, starting from {@link RuntimeGame}.
         * @param args - The arguments to pass the method.
         * @return Was the operation successful?
         */
        call(path: string[], args: any[]): boolean;
        /**
         * Dump all the relevant data from the {@link RuntimeGame} instance and send it to the server.
         */
        sendRuntimeGameDump(): void;
        /**
         * Send logs from the hot reloader to the server.
         * @param logs The hot reloader logs.
         */
        sendHotReloaderLogs(logs: HotReloaderLog[]): void;
        /**
         * Callback called when profiling is starting.
         */
        sendProfilerStarted(): void;
        /**
         * Callback called when profiling is ending.
         */
        sendProfilerStopped(): void;
        /**
         * Send profiling results.
         * @param framesAverageMeasures The measures made for each frames.
         * @param stats Other measures done during the profiler run.
         */
        sendProfilerOutput(framesAverageMeasures: FrameMeasure, stats: ProfilerStats): void;
    }
}
