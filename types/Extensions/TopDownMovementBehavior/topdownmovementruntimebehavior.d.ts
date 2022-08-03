declare namespace gdjs {
    /**
     * Allows an object to move in 4 or 8 directions, with customizable speed, accelerations
     * and rotation.
     */
    class TopDownMovementRuntimeBehavior extends gdjs.RuntimeBehavior {
        private _allowDiagonals;
        private _acceleration;
        private _deceleration;
        private _maxSpeed;
        private _angularMaxSpeed;
        private _rotateObject;
        private _angleOffset;
        private _ignoreDefaultControls;
        private _movementAngleOffset;
        /** The latest angle of movement, in degrees. */
        private _angle;
        private _x;
        private _y;
        private _xVelocity;
        private _yVelocity;
        private _angularSpeed;
        private _leftKey;
        private _rightKey;
        private _upKey;
        private _downKey;
        private _leftKeyPressedDuration;
        private _rightKeyPressedDuration;
        private _upKeyPressedDuration;
        private _downKeyPressedDuration;
        private _wasStickUsed;
        private _stickAngle;
        private _stickForce;
        private _basisTransformation;
        private _temporaryPointForTransformations;
        constructor(runtimeScene: gdjs.RuntimeScene, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        setViewpoint(viewpoint: string, customIsometryAngle: float): void;
        setAcceleration(acceleration: float): void;
        getAcceleration(): number;
        setDeceleration(deceleration: float): void;
        getDeceleration(): number;
        setMaxSpeed(maxSpeed: float): void;
        getMaxSpeed(): number;
        setAngularMaxSpeed(angularMaxSpeed: float): void;
        getAngularMaxSpeed(): number;
        setAngleOffset(angleOffset: float): void;
        getAngleOffset(): number;
        allowDiagonals(allow: boolean): void;
        diagonalsAllowed(): boolean;
        setRotateObject(allow: boolean): void;
        isObjectRotated(): boolean;
        isMoving(): boolean;
        getSpeed(): float;
        getXVelocity(): float;
        setXVelocity(velocityX: float): void;
        getYVelocity(): float;
        setYVelocity(velocityY: float): void;
        getAngle(): float;
        setMovementAngleOffset(movementAngleOffset: float): void;
        getMovementAngleOffset(): number;
        doStepPreEvents(runtimeScene: gdjs.RuntimeScene): void;
        simulateControl(input: string): void;
        ignoreDefaultControls(ignore: boolean): void;
        simulateLeftKey(): void;
        simulateRightKey(): void;
        simulateUpKey(): void;
        simulateDownKey(): void;
        simulateStick(stickAngle: float, stickForce: float): void;
        /**.
         * @param input The control to be tested [Left,Right,Up,Down,Stick].
         * @returns true if the key was used since the last `doStepPreEvents` call.
         */
        isUsingControl(input: string): boolean;
        getLastStickInputAngle(): number;
    }
    namespace TopDownMovementRuntimeBehavior {
        interface BasisTransformation {
            toScreen(worldPoint: FloatPoint, screenPoint: FloatPoint): void;
        }
        class IsometryTransformation implements gdjs.TopDownMovementRuntimeBehavior.BasisTransformation {
            private _screen;
            /**
             * @param angle between the x axis and the projected isometric x axis.
             * @throws if the angle is not in ]0; pi/4[. Note that 0 is a front viewpoint and pi/4 a top-down viewpoint.
             */
            constructor(angle: float);
            toScreen(worldPoint: FloatPoint, screenPoint: FloatPoint): void;
        }
    }
}
