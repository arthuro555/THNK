declare namespace gdjs {
    /**
     * Represents a timer, which must be updated manually with {@link gdjs.Timer.updateTime}.
     */
    class Timer {
        _name: string;
        _time: float;
        _paused: boolean;
        /**
         * @param name The name of the timer.
         */
        constructor(name: string);
        /**
         * Get the name of the timer
         * @return The name of the timer
         */
        getName(): string;
        /**
         * Get the time of the timer, in milliseconds.
         * @return The time of the timer, in milliseconds.
         */
        getTime(): float;
        /**
         * Notify the timer that some time has passed.
         * @param time The elapsed time, in milliseconds.
         */
        updateTime(time: float): void;
        /**
         * Change the time.
         * @param time The new time, in milliseconds.
         */
        setTime(time: float): void;
        /**
         * Reset the time to zero.
         */
        reset(): void;
        /**
         * Set if the timer is paused.
         * @param enable true to pause the timer, false otherwise.
         */
        setPaused(enable: boolean): void;
        /**
         * Check if the timer is paused.
         */
        isPaused(): boolean;
    }
}
