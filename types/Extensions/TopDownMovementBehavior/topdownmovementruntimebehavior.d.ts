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
        private _topDownMovementHooks;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
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
        isMovementAngleAround(degreeAngle: float, tolerance: float): boolean;
        setMovementAngleOffset(movementAngleOffset: float): void;
        getMovementAngleOffset(): number;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
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
        /**
         * A hook must typically be registered by a behavior that requires this one
         * in its onCreate function.
         * The hook must stay forever to avoid side effects like a hooks order
         * change. To handle deactivated behavior, the hook can check that its
         * behavior is activated before doing anything.
         */
        registerHook(hook: gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHook): void;
    }
    namespace TopDownMovementRuntimeBehavior {
        class TopDownMovementHookContext {
            private direction;
            /**
             * @returns The movement direction from 0 for left to 7 for up-left and
             * -1 for no direction.
             */
            getDirection(): integer;
            /**
             * This method won't change the direction used by the top-down movement
             * behavior.
             */
            _setDirection(direction: integer): void;
        }
        const _topDownMovementHookContext: TopDownMovementHookContext;
        /**
         * Allow extensions relying on the top-down movement to customize its
         * behavior a bit.
         */
        interface TopDownMovementHook {
            /**
             * Return the direction to use instead of the direction given in
             * parameter.
             */
            overrideDirection(hookContext: TopDownMovementHookContext): integer;
            /**
             * Called before the acceleration and new direction is applied to the
             * velocity.
             */
            beforeSpeedUpdate(hookContext: TopDownMovementHookContext): void;
            /**
             * Called before the velocity is applied to the object position and
             * angle.
             */
            beforePositionUpdate(hookContext: TopDownMovementHookContext): void;
        }
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
