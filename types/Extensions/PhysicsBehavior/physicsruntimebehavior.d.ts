declare namespace gdjs {
    /**
     * Manage the common objects shared by objects having a
     * physics behavior.
     */
    class PhysicsSharedData {
        stepped: boolean;
        totalTime: float;
        fixedTimeStep: any;
        scaleX: any;
        scaleY: any;
        invScaleX: any;
        invScaleY: any;
        world: any;
        staticBody: any;
        contactListener: any;
        constructor(runtimeScene: any, sharedData: any);
        /**
         * Get the shared data for a scene.
         */
        static getSharedData(runtimeScene: any, name: any): any;
        step(dt: any): void;
    }
    /**
     * Allows objects to be moved in a realistic way thanks to a physics engine (Box2D).
     */
    class PhysicsRuntimeBehavior extends gdjs.RuntimeBehavior {
        _box2DBody: any;
        _dynamic: any;
        _objectOldWidth: float;
        _objectOldHeight: float;
        _objectOldX: number;
        _objectOldY: number;
        _objectOldAngle: float;
        _angularDamping: any;
        _linearDamping: any;
        _isBullet: boolean;
        _fixedRotation: float;
        _massDensity: any;
        _averageFriction: any;
        _averageRestitution: any;
        _shapeType: any;
        currentContacts: any;
        _sharedData: any;
        _tempb2Vec2: any;
        constructor(runtimeScene: any, behaviorData: any, owner: any);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        /**
         * Return a Box2D.b2Vec2 with the specified coordinates.
         * Should be used instead of doing 'new Box2D.b2Vec2(x, y)'.
         */
        b2Vec2(x: any, y: any): any;
        createBody(): void;
        doStepPreEvents(runtimeScene: any): void;
        getBox2DBody(): any;
        doStepPostEvents(runtimeScene: any): void;
        setStatic(): void;
        setDynamic(): void;
        setFixedRotation(): void;
        setFreeRotation(): void;
        setAsBullet(): void;
        dontSetAsBullet(): void;
        applyImpulse(xCoordinate: any, yCoordinate: any): void;
        applyImpulseUsingPolarCoordinates(angle: any, length: any): void;
        applyImpulseTowardPosition(xPosition: any, yPosition: any, length: any): void;
        applyForce(xCoordinate: any, yCoordinate: any): void;
        applyForceUsingPolarCoordinates(angle: any, length: any): void;
        applyForceTowardPosition(xPosition: any, yPosition: any, length: any): void;
        applyTorque(torque: any): void;
        setLinearVelocity(xVelocity: any, yVelocity: any): void;
        setAngularVelocity(angularVelocity: any): void;
        setLinearDamping(linearDamping: any): void;
        setAngularDamping(angularDamping: any): void;
        addRevoluteJointBetweenObjects(object: any, scene: any, xPosRelativeToMassCenter: any, yPosRelativeToMassCenter: any): void;
        addRevoluteJoint(xPosition: any, yPosition: any): void;
        setGravity(xGravity: any, yGravity: any): void;
        addGearJointBetweenObjects(object: any, ratio: any): void;
        setLinearVelocityX(xVelocity: any): void;
        setLinearVelocityY(yVelocity: any): void;
        getLinearVelocityX(): float;
        getLinearVelocityY(): float;
        getLinearVelocity(): number;
        getAngularVelocity(): any;
        getLinearDamping(): any;
        getAngularDamping(): any;
        collisionWith(otherObjectsTable: any): boolean;
        isStatic(): boolean;
        isDynamic(): boolean;
    }
}
