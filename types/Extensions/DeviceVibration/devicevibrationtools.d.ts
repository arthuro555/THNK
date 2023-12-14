declare namespace gdjs {
    namespace deviceVibration {
        /**
         * Vibrate the mobile device.
         * @param duration Value in milliseconds.
         */
        const startVibration: (duration: number) => void;
        /**
         * Vibrate the mobile device in a pattern.
         * You can add multiple comma separated values where every second one determines the silence between vibrations.
         * Example: "200,1000,500" (200ms vibration, 1sec silence, 500ms vibration)
         * @param intervals Comma separated list of values (in ms).
         */
        const startVibrationPattern: (intervals: string) => void;
        /**
         * Stop the current vibration on the mobile device.
         */
        const stopVibration: () => void;
    }
}
