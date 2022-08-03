declare namespace gdjs {
    /**
     * Manage the timers and times elapsed during last
     * frame, since the beginning of the scene and other time related values.
     */
    class TimeManager {
        _elapsedTime: float;
        _timeScale: float;
        _timeFromStart: float;
        _firstFrame: boolean;
        _timers: Hashtable<gdjs.Timer>;
        _firstUpdateDone: boolean;
        constructor();
        reset(): void;
        update(elapsedTime: float, minimumFPS: integer): void;
        /**
         * Set the time scale: time will be slower if time scale is < 1,
         * faster if > 1.
         * @param timeScale The new time scale (must be positive).
         */
        setTimeScale(timeScale: float): void;
        /**
         * Get the time scale.
         * @return The time scale (positive, 1 is normal speed).
         */
        getTimeScale(): float;
        /**
         * Get the time since the instanciation of the manager (i.e: since
         * the beginning of the scene most of the time), in milliseconds.
         */
        getTimeFromStart(): float;
        /**
         * Return true if update was called only once (i.e: if the scene
         * is rendering its first frame).
         */
        isFirstFrame(): boolean;
        /**
         * Return the time elapsed since the last call to update
         * (i.e: the last frame), in milliseconds.
         */
        getElapsedTime(): float;
        addTimer(name: string): void;
        hasTimer(name: string): boolean;
        getTimer(name: string): gdjs.Timer;
        removeTimer(name: string): void;
    }
}
