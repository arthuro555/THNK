declare namespace gdjs {
    /**
     * Returned by _findHighestFloorAndMoveOnTop
     */
    type PlatformSearchResult = {
        highestGround: gdjs.PlatformRuntimeBehavior | null;
        isCollidingAnyPlatform: boolean;
    };
    /**
     * PlatformerObjectRuntimeBehavior represents a behavior allowing objects to be
     * considered as a platform by objects having PlatformerObject Behavior.
     */
    export class PlatformerObjectRuntimeBehavior extends gdjs.RuntimeBehavior {
        /**
         * Returned by _findHighestFloorAndMoveOnTop
         */
        private static readonly _platformSearchResult;
        /**
         * A very small value compare to 1 pixel, yet very huge compare to rounding errors.
         */
        private static readonly epsilon;
        /** To achieve pixel-perfect precision when positioning object on platform or
         * handling collision with "walls", edges of the hitboxes must be ignored during
         * collision checks, so that two overlapping edges are not considered as colliding.
         *
         * For example, if a character is 10px width and is at position (0, 0), it must not be
         * considered as colliding with a platform which is at position (10, 0). Edges will
         * still be overlapping (because character hitbox right edge is at X position 10 and
         * platform hitbox left edge is also at X position 10).
         *
         * This parameter "_ignoreTouchingEdges" will be passed to all collision handling functions.
         */
        _ignoreTouchingEdges: boolean;
        private _acceleration;
        private _deceleration;
        private _maxSpeed;
        private _slopeMaxAngle;
        _slopeClimbingFactor: float;
        _gravity: float;
        _maxFallingSpeed: float;
        _jumpSpeed: float;
        _jumpSustainTime: float;
        _ladderClimbingSpeed: float;
        _canGrabPlatforms: boolean;
        _canGrabWithoutMoving: boolean;
        private _yGrabOffset;
        private _xGrabTolerance;
        _useLegacyTrajectory: boolean;
        _canGoDownFromJumpthru: boolean;
        _currentSpeed: float;
        _requestedDeltaX: float;
        _requestedDeltaY: float;
        _lastDeltaY: float;
        _currentFallSpeed: float;
        _canJump: boolean;
        _lastDirectionIsLeft: boolean;
        private _ignoreDefaultControls;
        private _leftKey;
        private _rightKey;
        private _ladderKey;
        _upKey: boolean;
        _downKey: boolean;
        _jumpKey: boolean;
        _releasePlatformKey: boolean;
        _releaseLadderKey: boolean;
        private _wasLeftKeyPressed;
        private _wasRightKeyPressed;
        private _wasLadderKeyPressed;
        private _wasUpKeyPressed;
        private _wasDownKeyPressed;
        private _wasJumpKeyPressed;
        private _wasReleasePlatformKeyPressed;
        private _wasReleaseLadderKeyPressed;
        private _state;
        _falling: Falling;
        _onFloor: OnFloor;
        _jumping: Jumping;
        _grabbingPlatform: GrabbingPlatform;
        _onLadder: OnLadder;
        /** Platforms near the object, updated with `_updatePotentialCollidingObjects`. */
        _potentialCollidingObjects: Array<gdjs.PlatformRuntimeBehavior>;
        /** Overlapped jump-thru platforms, updated with `_updateOverlappedJumpThru`. */
        _overlappedJumpThru: Array<gdjs.PlatformRuntimeBehavior>;
        private _hasReallyMoved;
        /** @deprecated use _hasReallyMoved instead */
        private _hasMovedAtLeastOnePixel;
        private _manager;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        private _updateSpeed;
        /**
         * Also see {@link ./README.md}
         */
        private _moveX;
        private _moveY;
        _setFalling(): void;
        _setOnFloor(collidingPlatform: gdjs.PlatformRuntimeBehavior): void;
        private _setJumping;
        private _setGrabbingPlatform;
        private _setOnLadder;
        _checkTransitionOnLadder(): void;
        _checkTransitionJumping(): void;
        _checkGrabPlatform(): void;
        private _checkTransitionOnFloorOrFalling;
        _fall(timeDelta: float): void;
        /**
         * Return true if the object owning the behavior can grab the specified platform. There must be a collision
         * between the object and the platform.
         * @param platform The platform the object is in collision with
         * @param y The value in pixels on Y axis the object wants to move to
         */
        private _canGrab;
        /**
         * Mark the platformer object as not grabbing any platform.
         */
        _releaseGrabbedPlatform(): void;
        /**
         * Mark the platformer object as falling if on a ladder.
         */
        _releaseLadder(): void;
        /**
         * Separate the object from all platforms passed in parameter.
         * @param candidates The platform to be tested for collision
         * @param excludeJumpThrus If set to true, jumpthru platforms are excluded. false if not defined.
         * @returns true if the object was moved
         */
        private _separateFromPlatforms;
        /**
         * Among the platforms passed in parameter, return true if there is a platform colliding with the object.
         * Ladders are *always* excluded from the test.
         * @param candidates The platform to be tested for collision
         * @param exceptThisOne The object identifier of a platform to be excluded from the check. Can be null.
         * @param excludeJumpThrus If set to true, jumpthru platforms are excluded. false if not defined.
         * @returns true if the object collides any platform
         */
        _isCollidingWithOneOf(candidates: gdjs.PlatformRuntimeBehavior[], exceptThisOne?: number | null, excludeJumpThrus?: boolean): boolean;
        /**
         * Find the highest floor reachable and move the owner on top of it.
         *
         * Also see {@link ./README.md}
         *
         * @param candidates The platform to be tested for collision
         * @param upwardDeltaY The owner won't move upward more than this value.
         * @param downwardDeltaY The owner won't move downward more than this value.
         * @returns the platform where to walk or if an obstacle was found
         */
        _findHighestFloorAndMoveOnTop(candidates: gdjs.PlatformRuntimeBehavior[], upwardDeltaY: float, downwardDeltaY: float): PlatformSearchResult;
        /**
         * Find the highest Y relative to the owner bottom of the floor reachable by the owner.
         * @param platform The platform to be tested for collision.
         * @param upwardDeltaY The owner won't move upward more than this value.
         * @param downwardDeltaY The owner won't move downward more than this value.
         * @return the search context
         */
        private _findPlatformHighestRelativeYUnderObject;
        /**
         * Among the platforms passed in parameter, return true if there is a platform colliding with the object.
         * Ladders are *always* excluded from the test.
         * @param candidates The platform to be tested for collision
         * @param exceptTheseOnes The platforms to be excluded from the test
         */
        private _isCollidingWithOneOfExcluding;
        /**
         * Return true if the platform is colliding with the behavior owner object.
         * Overlapped jump thru and ladders are excluded.
         * @param platform The platform to be tested for collision
         */
        private _isCollidingWith;
        /**
         * Update _overlappedJumpThru member, so that it contains all the jumpthru platforms colliding with
         * the behavior owner object.
         * Note: _updatePotentialCollidingObjects must have been called before.
         */
        private _updateOverlappedJumpThru;
        /**
         * Return true if the object is overlapping a ladder.
         * Note: _updatePotentialCollidingObjects must have been called before.
         */
        _isOverlappingLadder(): boolean;
        _isIn(platformArray: gdjs.PlatformRuntimeBehavior[], id: integer): boolean;
        /**
         * Update _potentialCollidingObjects member with platforms near the object.
         */
        private _updatePotentialCollidingObjects;
        /**
         * Simulate a control action in the Platformer Object by specifying an input.
         * @param input The string expression of the control action [Left,Right,Up,Down,Ladder,Jump,Release,Release Ladder].
         */
        simulateControl(input: string): void;
        /**.
         * @param input The control to be tested [Left,Right,Up,Down,Ladder,Jump,Release,Release Ladder].
         * @returns true if the key was used since the last `doStepPreEvents` call.
         */
        isUsingControl(input: string): boolean;
        /**
         * Get the gravity of the Platformer Object.
         * @returns The current gravity.
         */
        getGravity(): float;
        /**
         * Get maximum angle of a slope for the Platformer Object to run on it as a floor.
         * @returns the slope maximum angle, in degrees.
         */
        getSlopeMaxAngle(): float;
        /**
         * Get the maximum falling speed of the Platformer Object.
         * @returns The maximum falling speed.
         */
        getMaxFallingSpeed(): float;
        /**
         * Get the speed used to move on Y axis when climbing a ladder.
         * @returns The speed of ladder climbing.
         */
        getLadderClimbingSpeed(): float;
        /**
         * Get the acceleration value of the Platformer Object.
         * @returns The current acceleration.
         */
        getAcceleration(): float;
        /**
         * Get the deceleration of the Platformer Object.
         * @returns The current deceleration.
         */
        getDeceleration(): float;
        /**
         * Get the maximum speed of the Platformer Object.
         * @returns The maximum speed.
         */
        getMaxSpeed(): float;
        /**
         * Get the jump speed of the Platformer Object.
         * @returns The jump speed.
         */
        getJumpSpeed(): float;
        /**
         * Get the jump sustain time of the Platformer Object.
         * @returns The jump sustain time.
         */
        getJumpSustainTime(): float;
        /**
         * Get the speed at which the object is falling. It is 0 when the object is on a floor, and non 0 as soon as the object leaves the floor.
         * @returns The current fall speed.
         */
        getCurrentFallSpeed(): float;
        /**
         * Get the current speed of the Platformer Object.
         * @returns The current speed.
         */
        getCurrentSpeed(): float;
        /**
         * Set the current speed of the Platformer Object.
         * @param currentSpeed The current speed.
         */
        setCurrentSpeed(currentSpeed: float): void;
        /**
         * Get the current jump speed of the Platformer Object.
         * @returns The current jump speed.
         */
        getCurrentJumpSpeed(): float;
        /**
         * Check if the Platformer Object can grab the platforms.
         * @returns Returns true if the object can grab the platforms.
         */
        canGrabPlatforms(): boolean;
        /**
         * Check if the Platformer Object can jump.
         * @returns Returns true if the object can jump.
         */
        canJump(): boolean;
        /**
         * Set the gravity of the Platformer Object.
         * @param gravity The new gravity.
         */
        setGravity(gravity: float): void;
        /**
         * Set the maximum falling speed of the Platformer Object.
         * @param maxFallingSpeed The maximum falling speed.
         * @param tryToPreserveAirSpeed If true and if jumping, tune the current jump speed to preserve the overall speed in the air.
         */
        setMaxFallingSpeed(maxFallingSpeed: float, tryToPreserveAirSpeed?: boolean): void;
        /**
         * Set the speed used to move on Y axis when climbing a ladder.
         * @param ladderClimbingSpeed The speed of ladder climbing.
         */
        setLadderClimbingSpeed(ladderClimbingSpeed: float): void;
        /**
         * Set the acceleration of the Platformer Object.
         * @param acceleration The new acceleration.
         */
        setAcceleration(acceleration: float): void;
        /**
         * Set the deceleration of the Platformer Object.
         * @param deceleration The new deceleration.
         */
        setDeceleration(deceleration: float): void;
        /**
         * Set the maximum speed of the Platformer Object.
         * @param maxSpeed The new maximum speed.
         */
        setMaxSpeed(maxSpeed: float): void;
        /**
         * Set the jump speed of the Platformer Object.
         * @param jumpSpeed The new jump speed.
         */
        setJumpSpeed(jumpSpeed: float): void;
        /**
         * Set the jump sustain time of the Platformer Object.
         * @param jumpSpeed The new jump sustain time.
         */
        setJumpSustainTime(jumpSustainTime: float): void;
        /**
         * Set the maximum slope angle of the Platformer Object.
         * @param slopeMaxAngle The new maximum slope angle.
         */
        setSlopeMaxAngle(slopeMaxAngle: float): void;
        /**
         * Allow the Platformer Object to jump again.
         */
        setCanJump(): void;
        /**
         * Forbid the Platformer Object to air jump.
         */
        setCanNotAirJump(): void;
        /**
         * Abort the current jump.
         *
         * When the character is not in the jumping state this method has no effect.
         */
        abortJump(): void;
        /**
         * Set the current fall speed.
         *
         * When the character is not in the falling state this method has no effect.
         */
        setCurrentFallSpeed(currentFallSpeed: float): void;
        /**
         * Set if the Platformer Object can grab platforms.
         * @param enable Enable / Disable grabbing of platforms.
         */
        setCanGrabPlatforms(enable: boolean): void;
        /**
         * Ignore the default controls of the Platformer Object.
         * @param ignore Enable / Disable default controls.
         */
        ignoreDefaultControls(ignore: boolean): void;
        /**
         * Simulate the "Left" control of the Platformer Object.
         */
        simulateLeftKey(): void;
        /**
         * Simulate the "Right" control of the Platformer Object.
         */
        simulateRightKey(): void;
        /**
         * Simulate the "Ladder" control of the Platformer Object.
         */
        simulateLadderKey(): void;
        /**
         * Simulate the "Release Ladder" control of the Platformer Object.
         */
        simulateReleaseLadderKey(): void;
        /**
         * Simulate the "Up" control of the Platformer Object.
         */
        simulateUpKey(): void;
        /**
         * Simulate the "Down" control of the Platformer Object.
         */
        simulateDownKey(): void;
        /**
         * Simulate the "Jump" control of the Platformer Object.
         */
        simulateJumpKey(): void;
        /**
         * Simulate the "Release" control of the Platformer Object.
         */
        simulateReleasePlatformKey(): void;
        /**
         * Check if the Platformer Object is on a floor.
         * @returns Returns true if on a floor and false if not.
         */
        isOnFloor(): boolean;
        /**
         * Check if the Platformer Object is on the given object.
         * @returns Returns true if on the object and false if not.
         */
        isOnFloorObject(object: gdjs.RuntimeObject): boolean;
        /**
         * Check if the Platformer Object is on a ladder.
         * @returns Returns true if on a ladder and false if not.
         */
        isOnLadder(): boolean;
        /**
         * Check if the Platformer Object is jumping.
         * @returns Returns true if jumping and false if not.
         */
        isJumping(): boolean;
        /**
         * Check if the Platformer Object is grabbing a platform.
         * @returns Returns true if a platform is grabbed and false if not.
         */
        isGrabbingPlatform(): boolean;
        /**
         * Check if the Platformer Object is in the falling state. This is false
         * if the object is jumping, even if the object is going down after reaching
         * the jump peak.
         * @returns Returns true if it is falling and false if not.
         */
        isFallingWithoutJumping(): boolean;
        /**
         * Check if the Platformer Object is "going down", either because it's in the
         * falling state *or* because it's jumping but reached the jump peak and
         * is now going down (because the jump speed can't compensate anymore the
         * falling speed).
         *
         * If you want to check if the object is falling outside of a jump (or because
         * the jump is entirely finished and there is no jump speed applied to the object
         * anymore), consider using `isFallingWithoutJumping`.
         *
         * @returns Returns true if it is "going down" and false if not.
         */
        isFalling(): boolean;
        /**
         * Check if the Platformer Object is moving.
         *
         * When walking or climbing on a ladder,
         * a speed of less than one pixel per frame won't be detected.
         *
         * @returns Returns true if it is moving and false if not.
         * @deprecated use isMovingEvenALittle instead
         */
        isMoving(): boolean;
        /**
         * Check if the Platformer Object is moving.
         * @returns Returns true if it is moving and false if not.
         */
        isMovingEvenALittle(): boolean;
    }
    /**
     * The object can take 5 states: OnFloor, Falling, Jumping, GrabbingPlatform and OnLadder.
     * The implementations of this interface hold the specific behaviors and internal state of theses 5 states.
     * @see PlatformerObjectRuntimeBehavior.doStepPreEvents to understand how the functions are called.
     */
    interface State {
        /**
         * Called when the object leaves this state.
         * It's a good place to reset the internal state.
         * @see OnFloor.enter that is not part of the interface because it takes specific parameters.
         */
        leave(): void;
        /**
         * Called before the obstacle search.
         * The object position may need adjustments to handle external changes.
         */
        beforeUpdatingObstacles(timeDelta: float): void;
        /**
         * Check if transitions to other states are needed and apply them before moving horizontally.
         */
        checkTransitionBeforeX(): void;
        /**
         * Use _requestedDeltaX and _requestedDeltaY to choose the movement that suits the state before moving horizontally.
         */
        beforeMovingX(): void;
        /**
         * Check if transitions to other states are needed and apply them before moving vertically.
         */
        checkTransitionBeforeY(timeDelta: float): void;
        /**
         * Use _requestedDeltaY to choose the movement that suits the state before moving vertically.
         */
        beforeMovingY(timeDelta: float, oldX: float): void;
    }
    /**
     * The object is on the floor standing or walking.
     *
     * Also see {@link ./README.md}
     */
    class OnFloor implements State {
        private _behavior;
        private _floorPlatform;
        private _floorLastX;
        private _floorLastY;
        _oldHeight: float;
        constructor(behavior: PlatformerObjectRuntimeBehavior);
        getFloorPlatform(): PlatformRuntimeBehavior | null;
        enter(floorPlatform: gdjs.PlatformRuntimeBehavior): void;
        leave(): void;
        updateFloorPosition(): void;
        beforeUpdatingObstacles(timeDelta: float): void;
        checkTransitionBeforeX(): void;
        beforeMovingX(): void;
        checkTransitionBeforeY(timeDelta: float): void;
        beforeMovingY(timeDelta: float, oldX: float): void;
        toString(): String;
    }
    /**
     * The object is falling.
     */
    class Falling implements State {
        private _behavior;
        constructor(behavior: PlatformerObjectRuntimeBehavior);
        enter(from: State): void;
        leave(): void;
        beforeUpdatingObstacles(timeDelta: float): void;
        checkTransitionBeforeX(): void;
        beforeMovingX(): void;
        checkTransitionBeforeY(timeDelta: float): void;
        beforeMovingY(timeDelta: float, oldX: float): void;
        toString(): String;
    }
    /**
     * The object is on the ascending and descending part of the jump.
     * The object is considered falling when the jump continue to a lower position than the initial one.
     */
    class Jumping implements State {
        private _behavior;
        private _currentJumpSpeed;
        private _timeSinceCurrentJumpStart;
        private _jumpKeyHeldSinceJumpStart;
        private _jumpingFirstDelta;
        constructor(behavior: PlatformerObjectRuntimeBehavior);
        getCurrentJumpSpeed(): number;
        setCurrentJumpSpeed(currentJumpSpeed: number): void;
        enter(from: State): void;
        leave(): void;
        beforeUpdatingObstacles(timeDelta: float): void;
        checkTransitionBeforeX(): void;
        beforeMovingX(): void;
        checkTransitionBeforeY(timeDelta: float): void;
        beforeMovingY(timeDelta: float, oldX: float): void;
        toString(): String;
    }
    /**
     * The object grabbed the edge of a platform and is standing there.
     */
    class GrabbingPlatform implements State {
        private _behavior;
        private _grabbedPlatform;
        private _grabbedPlatformLastX;
        private _grabbedPlatformLastY;
        constructor(behavior: PlatformerObjectRuntimeBehavior);
        enter(grabbedPlatform: gdjs.PlatformRuntimeBehavior): void;
        leave(): void;
        beforeUpdatingObstacles(timeDelta: float): void;
        checkTransitionBeforeX(): void;
        beforeMovingX(): void;
        checkTransitionBeforeY(timeDelta: float): void;
        beforeMovingY(timeDelta: float, oldX: float): void;
        toString(): String;
    }
    /**
     * The object grabbed a ladder. It can stand or move in 8 directions.
     */
    class OnLadder implements State {
        private _behavior;
        constructor(behavior: PlatformerObjectRuntimeBehavior);
        enter(): void;
        leave(): void;
        beforeUpdatingObstacles(timeDelta: float): void;
        checkTransitionBeforeX(): void;
        beforeMovingX(): void;
        checkTransitionBeforeY(timeDelta: float): void;
        beforeMovingY(timeDelta: float, oldX: float): void;
        toString(): String;
    }
    export {};
}
