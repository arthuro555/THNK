declare namespace gdjs {
    /**
     * Displays uncaught exceptions on top of the game.
     * Could be reworked in the future to support a minimal debugger inside the game.
     */
    class InGameDebugger {
        _runtimeGame: RuntimeGame;
        _uncaughtException: Error | null;
        _uncaughtExceptionElement: HTMLElement | null;
        constructor(runtimeGame: RuntimeGame);
        setUncaughtException(exception: Error | null): void;
        render(): void;
    }
}
