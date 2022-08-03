declare namespace gdjs {
    namespace deviceSensors {
        namespace orientation {
            /**
             * Activate the orientation sensor's listener.
             */
            const _activateOrientationListener: () => void;
            /**
             * Deactivate the orientation sensor's listener.
             */
            const _deactivateOrientationListener: () => void;
            /**
             * Orientation sensor event callback function.
             */
            const _handleOrientation: (event: any) => void;
            /**
             * Activate the orientation sensor
             */
            const activateOrientationSensor: () => void;
            /**
             * Deactivate the orientation sensor
             */
            const deactivateOrientationSensor: () => void;
            /**
             * Check if the orientation sensor is currently active
             * @return The activation state of the orientation sensor
             */
            const isActive: () => boolean;
            /**
             * Get the value of the device orientation's absolute as a number
             * @return The device orientation's absolute value
             */
            const getOrientationAbsolute: () => number;
            /**
             * Get the value of the device orientation's alpha as a number (Range: 0 to 360)
             * @return The device orientation's alpha value
             */
            const getOrientationAlpha: () => number;
            /**
             * Get the value of the device orientation's beta as a number (Range: -180 to 180)
             * @return The device orientation's beta value
             */
            const getOrientationBeta: () => number;
            /**
             * Get the value of the device orientation's gamma as a number (Range: -90 to 90)
             * @return The device orientation's gamma value
             */
            const getOrientationGamma: () => number;
        }
        namespace motion {
            /**
             * Activate the motion sensor's listener.
             */
            const _activateMotionListener: () => void;
            /**
             * Deactivate the motion sensor's listener.
             */
            const _deactivateMotionListener: () => void;
            /**
             * Motion sensor event callback function.
             */
            const _handleMotion: (event: any) => void;
            /**
             * Activate the motion sensor
             */
            const activateMotionSensor: () => void;
            /**
             * Deactivate the motion sensor
             */
            const deactivateMotionSensor: () => void;
            /**
             * Check if the motion sensor is currently active
             * @return The activation state of the motion sensor
             */
            const isActive: () => boolean;
            /**
             * Get the alpha rotation rate as a number
             * @return The rotation alpha value
             */
            const getRotationAlpha: () => number;
            /**
             * Get the beta rotation rate as a number
             * @return The rotation beta value
             */
            const getRotationBeta: () => number;
            /**
             * Get the gamma rotation rate as a number
             * @return The rotation gamma value
             */
            const getRotationGamma: () => number;
            /**
             * Get the acceleration value on the X-axis as a number
             * @return Acceleration on the X-axis
             */
            const getAccelerationX: () => number;
            /**
             * Get the acceleration value on the Y-axis as a number
             * @return Acceleration on the Y-axis
             */
            const getAccelerationY: () => number;
            /**
             * Get the acceleration value on the Z-axis as a number
             * @return Acceleration on the Z-axis
             */
            const getAccelerationZ: () => number;
        }
    }
}
