declare namespace gdjs {
    namespace evtTools {
        namespace common {
            /**
             * Convert a string to a number.
             * @param str String to convert.
             * @returns The parsed number, or NaN if invalid.
             */
            const toNumber: (str: string) => number;
            /**
             * Convert a number to a string.
             * @param num Value to convert to a string.
             * @returns The value as a string.
             */
            const toString: (num: number) => string;
            /**
             * Negate the boolean.
             * @param bool The boolean to negate.
             * @returns The negated value.
             */
            const logicalNegation: (bool: boolean) => boolean;
            /**
             * Normalize a value between `min` and `max` to a value between 0 and 1.
             * @param {number} val The value to normalize
             * @param {number} min The minimum
             * @param {number} max The maximum
             * @returns The normalized value between 0 and 1
             */
            const normalize: (val: float, min: float, max: float) => number;
            /**
             * Limit a value to a range.
             * @param x Value.
             * @param min The minimum value.
             * @param max The  maximum value.
             * @returns The new value.
             */
            const clamp: (x: float, min: float, max: float) => float;
            /**
             * Hyperbolic arc-cosine
             * @param arg Value.
             * @returns The hyperbolic arc-cosine for the value.
             */
            const acosh: (arg: integer) => number;
            /**
             * Hyperbolic arcsine
             * @param arg Value.
             * @returns The hyperbolic arcsine for the value.
             */
            const asinh: (arg: integer) => number;
            /**
             * Hyperbolic arctangent
             * @param arg Value.
             * @returns The hyperbolic arctangent for the value.
             */
            const atanh: (arg: integer) => number;
            /**
             * Hyperbolic cosine
             * @param arg Value.
             * @returns The hyperbolic cosine for the value.
             */
            const cosh: (arg: integer) => number;
            /**
             * Hyperbolic sine
             * @param arg Value.
             * @returns The hyperbolic sine for the value.
             */
            const sinh: (arg: integer) => number;
            /**
             * Hyperbolic tangent
             * @param arg Value.
             * @returns The hyperbolic tangent for the value.
             */
            const tanh: (arg: integer) => number;
            /**
             * Cotangent
             * @param arg Value.
             * @returns The cotangent for the value.
             */
            const cot: (arg: integer) => number;
            /**
             * Cosecant
             * @param arg Value.
             * @returns The cosecant for the value.
             */
            const csc: (arg: integer) => number;
            /**
             * Secant
             * @param arg Value.
             * @returns The secant for the value.
             */
            const sec: (arg: integer) => number;
            /**
             * Base-10 logarithm
             * @param arg Value.
             * @returns The base-10 logarithm for the value.
             */
            const log10: (arg: integer) => number;
            /**
             * Base-2 logarithm
             * @param arg Value.
             * @returns The base-2 logarithm for the value.
             */
            const log2: (arg: integer) => number;
            /**
             * Returns the sign of the number. This checks if the value is positive, negative or zero.
             * @param arg Value.
             * @returns Return the sign for the value (1, -1 or 0).
             */
            const sign: (arg: integer) => number;
            /**
             * Cube root
             * @param x Value.
             * @returns Return the cube root for the value.
             */
            const cbrt: (x: float) => number;
            /**
             * N-th root
             * @param x Base value.
             * @param n Exponent value.
             * @returns Return the n-th root for the value.
             */
            const nthroot: (x: float, n: number) => number;
            /**
             * Modulo operation (the remainder after dividing one number by another)
             * @param x Dividend value.
             * @param y Divisor value.
             * @returns Return the remainder for the values.
             */
            const mod: (x: float, y: float) => number;
            /**
             * Returns the difference between two angles, in degrees.
             * @param angle1 First angle, in degrees.
             * @param angle2 Second angle, in degrees.
             * @returns Return the difference of the angles, in degrees.
             */
            const angleDifference: (angle1: number, angle2: number) => number;
            /**
             * Returns the angle, in degrees, between two positions.
             * @param x1 First point X position.
             * @param y1 First point Y position.
             * @param x2 Second point X position.
             * @param y2 Second point Y position.
             * @returns The angle between the positions, in degrees.
             */
            const angleBetweenPositions: (x1: number, y1: number, x2: number, y2: number) => number;
            /**
             * Returns the distance, in pixels, between two positions.
             * @param x1 First point X position.
             * @param y1 First point Y position.
             * @param x2 Second point X position.
             * @param y2 Second point Y position.
             * @returns The distance between the positions, in pixels.
             */
            const distanceBetweenPositions: (x1: number, y1: number, x2: number, y2: number) => number;
            /**
             * Return a linear interpolation between a and b.
             *
             * For instance, `lerp(2, 8, 0.5)` is `5`.
             *
             * @param a Start value.
             * @param b End value.
             * @param x The interpolation value between 0 and 1.
             * @returns The interpolated value, now between a and b.
             */
            const lerp: (a: number, b: integer, x: float) => number;
            /**
             * Return an exponential interpolation between `start` and `end`.
             *
             * For instance, `exponentialInterpolation(2, 8, 0.5)` is `4`.
             *
             * @param start Start value.
             * @param end End value.
             * @param progress The interpolation value between 0 and 1.
             * @returns The interpolated value.
             */
            const exponentialInterpolation: (start: float, end: float, progress: float) => number;
            /**
             * Truncate a number.
             * @param x Value.
             * @returns Return the value with all decimal places dropped.
             */
            const trunc: (x: float) => number;
            /**
             * Compute the X position when given an angle and distance relative to the origin (0;0).
             * This is also known as getting the cartesian coordinates of a 2D vector, using its polar coordinates.
             * @param angle The angle, in degrees.
             * @param distance The distance from the object, in pixels.
             */
            const getXFromAngleAndDistance: (angle: float, distance: float) => number;
            /**
             * Compute the Y position when given an angle and distance relative to the origin (0;0).
             * This is also known as getting the cartesian coordinates of a 2D vector, using its polar coordinates.
             * @param angle The angle, in degrees.
             * @param distance The distance from the object, in pixels.
             */
            const getYFromAngleAndDistance: (angle: float, distance: float) => number;
            /**
             * Rounds a number to the Nth decimal place
             * @param {float} value
             * @param {number} decimalPlace
             * @returns the rounded value
             */
            const roundTo: (value: float, decimalPlace: number) => number;
            /**
             * Rounds down a number to the Nth decimal place
             * @param {float} value
             * @param {number} decimalPlace
             * @returns the rounded value
             */
            const floorTo: (value: float, decimalPlace: number) => number;
            /**
             * Rounds up a number to the Nth decimal place
             * @param {float} value
             * @param {number} decimalPlace
             * @returns the rounded value
             */
            const ceilTo: (value: float, decimalPlace: number) => number;
            /**
             * Pi 3.1415...
             * @returns the Pi number
             */
            const pi: () => number;
            /**
             * Linearly interpolates between two angles (in degrees) by taking the shortest direction around the circle.
             * @param angle1 Starting angle, in degrees.
             * @param angle2 Destination angle, in degrees.
             * @param x The interpolation value between 0 and 1.
             * @returns Return the interpolated angle, in degrees.
             */
            const lerpAngle: (angle1: float, angle2: float, x: float) => float;
            const resolveAsyncEventsFunction: (eventsFunctionContext: EventsFunctionContext) => void;
            /**
             * Check if the game runs on a mobile device (iPhone, iPad, Android).
             * Note that the distinction between what is a mobile device and what is not
             * is becoming blurry. If you use this for mobile controls,
             * prefer to check if the device has touchscreen support.
             */
            const isMobile: () => boolean;
        }
    }
}
