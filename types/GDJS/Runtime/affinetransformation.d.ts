declare namespace gdjs {
    /**
     * An affine transformation that can transform points.
     */
    class AffineTransformation {
        private matrix;
        /**
         * Initialize to the identity.
         */
        constructor();
        /**
         * Reset to the identity.
         */
        setToIdentity(): void;
        /**
         * Check if this transformation is the identity.
         */
        isIdentity(): boolean;
        /**
         * Check if this is equals to another transformation.
         * @param other The transformation to check.
         */
        equals(other: AffineTransformation): boolean;
        /**
         * Check if this is almost equals to another transformation.
         * @param other The transformation to check.
         * @param epsilon The relative margin error.
         */
        nearlyEquals(other: AffineTransformation, epsilon: float): boolean;
        /**
         * Copy a transformation.
         * @param other The transformation to copy.
         */
        copyFrom(other: AffineTransformation): this;
        /**
         * Reset to a translation.
         *
         * @param x The horizontal translation value.
         * @param y The vertical translation value.
         */
        setToTranslation(tx: float, ty: float): void;
        /**
         * Concatenate a translation.
         *
         * @param tx The horizontal translation value.
         * @param ty The vertical translation value.
         */
        translate(tx: float, ty: float): void;
        /**
         * Reset to a scale.
         *
         * @param sx The horizontal scale value.
         * @param sy The vertical scale value.
         */
        setToScale(sx: float, sy: float): void;
        /**
         * Concatenate a scale.
         *
         * @param sx The horizontal scale value.
         * @param sy The vertical scale value.
         */
        scale(sx: float, sy: float): void;
        /**
         * Reset to a rotation.
         *
         * @param angle The angle of rotation in radians.
         */
        setToRotation(theta: float): void;
        /**
         * Concatenate a rotation.
         *
         * @param angle The angle of rotation in radians.
         */
        rotate(angle: float): void;
        /**
         * Reset to a rotation.
         *
         * @param angle The angle of rotation in radians.
         * @param anchorX The rotation anchor point X.
         * @param anchorY The rotation anchor point Y.
         */
        setToRotationAround(angle: float, anchorX: float, anchorY: float): void;
        /**
         * Concatenate a rotation.
         *
         * @param angle The angle of rotation in radians.
         * @param anchorX The rotation anchor point X.
         * @param anchorY The rotation anchor point Y.
         */
        rotateAround(angle: float, anchorX: float, anchorY: float): void;
        /**
         * Reset to an horizontal flip.
         *
         * @param anchorX The flip anchor point X.
         */
        setToFlipX(anchorX: float): void;
        /**
         * Concatenate an horizontal flip.
         *
         * @param anchorX The flip anchor point X.
         */
        flipX(anchorX: float): void;
        /**
         * Reset to an vertical flip.
         *
         * @param anchorY The flip anchor point Y.
         */
        setToFlipY(anchorY: float): void;
        /**
         * Concatenate an vertical flip.
         *
         * @param anchorY The flip anchor point Y.
         */
        flipY(anchorY: float): void;
        /**
         * Concatenate a transformation after this one.
         * @param other The transformation to concatenate.
         */
        concatenate(other: AffineTransformation): void;
        /**
         * Concatenate a transformation before this one.
         * @param other The transformation to concatenate.
         */
        preConcatenate(other: AffineTransformation): void;
        /**
         * Transform a point.
         *
         * @param source The point to transform.
         * @param destination The Point to store the transformed coordinates.
         */
        transform(source: FloatPoint, destination: FloatPoint): void;
        /**
         * Invert the matrix.
         */
        invert(): this;
        toString(): string;
    }
}
