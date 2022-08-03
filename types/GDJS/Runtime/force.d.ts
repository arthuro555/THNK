declare namespace gdjs {
    /**
     * A vector used to move objects.
     */
    class Force {
        _x: float;
        _y: float;
        _angle: float;
        _length: float;
        _dirty: boolean;
        _multiplier: integer;
        /**
         * @param x The initial x component
         * @param y The initial y component
         * @param multiplier The multiplier (0 for a force that disappear on next frame, 1 for a permanent force)
         */
        constructor(x: float, y: float, multiplier: integer);
        /**
         * Returns the X component of the force.
         */
        getX(): float;
        /**
         * Returns the Y component of the force.
         */
        getY(): float;
        /**
         * Set the x component of the force.
         * @param x The new X component
         */
        setX(x: float): void;
        /**
         * Set the y component of the force.
         * @param y The new Y component
         */
        setY(y: float): void;
        /**
         * Set the angle of the force.
         * @param angle The new angle
         */
        setAngle(angle: float): void;
        /**
         * Set the length of the force.
         * @param len The length
         */
        setLength(len: number): void;
        /**
         * Get the angle of the force
         */
        getAngle(): float;
        /**
         * Get the length of the force
         */
        getLength(): float;
        /**
         * Return 1 (true) if the force is permanent, 0 (false) if it is instant.
         */
        getMultiplier(): integer;
        /**
         * Set if the force multiplier.
         * @param multiplier The new value
         */
        setMultiplier(multiplier: integer): void;
    }
}
