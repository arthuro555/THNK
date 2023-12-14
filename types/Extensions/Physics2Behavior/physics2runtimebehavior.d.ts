declare namespace Box2D {
    interface b2Body {
        gdjsAssociatedBehavior: gdjs.Physics2RuntimeBehavior | null;
    }
}
declare namespace gdjs {
    interface RuntimeScene {
        physics2SharedData: gdjs.Physics2SharedData | null;
    }
    class Physics2SharedData {
        gravityX: float;
        gravityY: float;
        scaleX: float;
        scaleY: float;
        invScaleX: float;
        invScaleY: float;
        timeStep: float;
        frameTime: float;
        stepped: boolean;
        timeScale: float;
        world: Box2D.b2World;
        staticBody: Box2D.b2Body;
        /** Contact listener to keep track of current collisions */
        contactListener: Box2D.JSContactListener;
        _nextJointId: number;
        /** Start with 1 so the user is safe from default variables value (0) */
        joints: {
            [key: string]: Box2D.b2Joint;
        };
        /**
         * List of physics behavior in the runtimeScene. It should be updated
         * when a new physics object is created (constructor), on destruction (onDestroy),
         * on behavior activation (onActivate) and on behavior deactivation (onDeActivate).
         */
        _registeredBehaviors: Set<Physics2RuntimeBehavior>;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, sharedData: any);
        static getSharedData(runtimeScene: gdjs.RuntimeScene, behaviorName: string): gdjs.Physics2SharedData;
        /**
         * Add a physics object to the list of existing object.
         */
        addToBehaviorsList(physicsBehavior: gdjs.Physics2RuntimeBehavior): void;
        /**
         * Remove a physics object to the list of existing object.
         */
        removeFromBehaviorsList(physicsBehavior: gdjs.Physics2RuntimeBehavior): void;
        /**
         * Reset all contactsStartedThisFrame and contactsEndedThisFrame of all
         * registered physics behavior.
         */
        resetStartedAndEndedCollisions(): void;
        /**
         * Update all registered body.
         */
        updateBodiesFromObjects(): void;
        step(deltaTime: float): void;
        clearBodyJoints(body: Box2D.b2Body): void;
        addJoint(joint: Box2D.b2Joint): integer;
        getJoint(jointId: integer | string): Box2D.b2Joint | null;
        getJointId(joint: Box2D.b2Joint): integer;
        removeJoint(jointId: integer | string): void;
    }
    class Physics2RuntimeBehavior extends gdjs.RuntimeBehavior {
        bodyType: string;
        bullet: boolean;
        fixedRotation: boolean;
        canSleep: boolean;
        shape: string;
        shapeDimensionA: any;
        shapeDimensionB: any;
        shapeOffsetX: float;
        shapeOffsetY: float;
        polygonOrigin: string;
        polygon: gdjs.Polygon | null;
        density: float;
        friction: float;
        restitution: float;
        linearDamping: float;
        angularDamping: float;
        gravityScale: float;
        layers: integer;
        masks: integer;
        shapeScale: number;
        /**
         * Array containing the beginning of contacts reported by onContactBegin. Each contact
         * should be unique to avoid recording glitches where the object loses and regain
         * contact between two frames. The array is updated each time the method
         * onContactBegin is called by the listener, which is only called when stepping
         * the world i.e. in the first preEvent called by a physics behavior. This array is
         * cleared just before stepping the world.
         */
        contactsStartedThisFrame: Array<Physics2RuntimeBehavior>;
        /**
         * Array containing the end of contacts reported by onContactEnd. The array is updated
         * each time the method onContactEnd is called by the listener, which can be called at
         * any time. This array is cleared just before stepping the world.
         */
        contactsEndedThisFrame: Array<Physics2RuntimeBehavior>;
        /**
         * Array containing the exact current contacts with the objects. It is updated
         * each time the methods onContactBegin and onContactEnd are called by the contact
         * listener.
         */
        currentContacts: Array<Physics2RuntimeBehavior>;
        destroyedDuringFrameLogic: boolean;
        _body: Box2D.b2Body | null;
        /** Avoid creating new vectors all the time */
        _tempb2Vec2: Box2D.b2Vec2;
        /**
         * sharedData is a reference to the shared data of the scene, that registers
         * every physics behavior that is created so that collisions can be cleared
         * before stepping the world.
         */
        _sharedData: Physics2SharedData;
        /** Sometimes two vectors are needed on the same function call */
        _tempb2Vec2Sec: Box2D.b2Vec2;
        _objectOldX: number;
        _objectOldY: number;
        _objectOldAngle: float;
        _objectOldWidth: float;
        _objectOldHeight: float;
        _verticesBuffer: integer;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        b2Vec2(x: float, y: float): Box2D.b2Vec2;
        b2Vec2Sec(x: float, y: float): Box2D.b2Vec2;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onActivate(): void;
        onDestroy(): void;
        static getPolygon(verticesData: Box2D.b2Vec2[]): gdjs.Polygon | null;
        static isPolygonConvex(polygon: gdjs.Polygon): boolean;
        createShape(): Box2D.b2FixtureDef;
        recreateShape(): void;
        getShapeScale(): float;
        setShapeScale(shapeScale: float): void;
        getBody(): Box2D.b2Body;
        createBody(): boolean;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        onObjectHotReloaded(): void;
        updateBodyFromObject(): void;
        getGravityX(): float;
        getGravityY(): float;
        setGravity(x: float, y: float): void;
        getTimeScale(): float;
        setTimeScale(timeScale: float): void;
        static setTimeScaleFromObject(object: any, behaviorName: any, timeScale: any): void;
        isDynamic(): boolean;
        setDynamic(): void;
        isStatic(): boolean;
        setStatic(): void;
        isKinematic(): boolean;
        setKinematic(): void;
        isBullet(): boolean;
        setBullet(enable: boolean): void;
        hasFixedRotation(): boolean;
        setFixedRotation(enable: boolean): void;
        isSleepingAllowed(): boolean;
        setSleepingAllowed(enable: boolean): void;
        isSleeping(): boolean;
        getDensity(): number;
        setDensity(density: float): void;
        getFriction(): float;
        setFriction(friction: any): void;
        getRestitution(): float;
        setRestitution(restitution: float): void;
        getLinearDamping(): float;
        setLinearDamping(linearDamping: float): void;
        getAngularDamping(): float;
        setAngularDamping(angularDamping: float): void;
        getGravityScale(): float;
        setGravityScale(gravityScale: float): void;
        layerEnabled(layer: integer): boolean;
        enableLayer(layer: integer, enable: boolean): void;
        maskEnabled(mask: integer): boolean;
        enableMask(mask: integer, enable: boolean): void;
        getLinearVelocityX(): float;
        setLinearVelocityX(linearVelocityX: float): void;
        getLinearVelocityY(): float;
        setLinearVelocityY(linearVelocityY: float): void;
        getLinearVelocityLength(): float;
        getLinearVelocityAngle(): float;
        getAngularVelocity(): float;
        setAngularVelocity(angularVelocity: float): void;
        applyForce(forceX: float, forceY: float, positionX: float, positionY: float): void;
        applyPolarForce(angle: float, length: float, positionX: float, positionY: float): void;
        applyForceTowardPosition(length: float, towardX: float, towardY: float, positionX: float, positionY: float): void;
        applyImpulse(impulseX: float, impulseY: float, positionX: float, positionY: float): void;
        applyPolarImpulse(angle: float, length: float, positionX: float, positionY: float): void;
        applyImpulseTowardPosition(length: float, towardX: float, towardY: float, positionX: float, positionY: float): void;
        applyTorque(torque: float): void;
        applyAngularImpulse(angularImpulse: float): void;
        getMass(): float;
        getInertia(): float;
        getMassCenterX(): float;
        getMassCenterY(): float;
        isJointFirstObject(jointId: integer | string): boolean;
        isJointSecondObject(jointId: integer | string): boolean;
        getJointFirstAnchorX(jointId: integer | string): float;
        getJointFirstAnchorY(jointId: integer | string): float;
        getJointSecondAnchorX(jointId: integer | string): float;
        getJointSecondAnchorY(jointId: integer | string): float;
        getJointReactionForce(jointId: integer | string): float;
        getJointReactionTorque(jointId: integer | string): float;
        removeJoint(jointId: integer | string): void;
        addDistanceJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, length: float, frequency: float, dampingRatio: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getDistanceJointLength(jointId: integer | string): float;
        setDistanceJointLength(jointId: integer | string, length: float): void;
        getDistanceJointFrequency(jointId: integer | string): float;
        setDistanceJointFrequency(jointId: integer | string, frequency: float): void;
        getDistanceJointDampingRatio(jointId: integer | string): float;
        setDistanceJointDampingRatio(jointId: integer | string, dampingRatio: float): void;
        addRevoluteJoint(x: float, y: float, enableLimit: boolean, referenceAngle: float, lowerAngle: float, upperAngle: float, enableMotor: boolean, motorSpeed: float, maxMotorTorque: float, variable: gdjs.Variable): void;
        addRevoluteJointBetweenTwoBodies(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, enableLimit: boolean, referenceAngle: float, lowerAngle: float, upperAngle: float, enableMotor: boolean, motorSpeed: float, maxMotorTorque: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getRevoluteJointReferenceAngle(jointId: integer | string): float;
        getRevoluteJointAngle(jointId: integer | string): float;
        getRevoluteJointSpeed(jointId: integer | string): float;
        isRevoluteJointLimitsEnabled(jointId: integer | string): boolean;
        enableRevoluteJointLimits(jointId: integer | string, enable: boolean): void;
        getRevoluteJointMinAngle(jointId: integer | string): float;
        getRevoluteJointMaxAngle(jointId: integer | string): float;
        setRevoluteJointLimits(jointId: integer | string, lowerAngle: float, upperAngle: float): void;
        isRevoluteJointMotorEnabled(jointId: integer | string): boolean;
        enableRevoluteJointMotor(jointId: integer | string, enable: any): void;
        getRevoluteJointMotorSpeed(jointId: integer | string): float;
        setRevoluteJointMotorSpeed(jointId: integer | string, speed: any): void;
        getRevoluteJointMaxMotorTorque(jointId: integer | string): float;
        setRevoluteJointMaxMotorTorque(jointId: integer | string, maxTorque: any): void;
        getRevoluteJointMotorTorque(jointId: integer | string): float;
        addPrismaticJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, axisAngle: float, referenceAngle: float, enableLimit: boolean, lowerTranslation: float, upperTranslation: float, enableMotor: boolean, motorSpeed: float, maxMotorForce: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getPrismaticJointAxisAngle(jointId: integer | string): float;
        getPrismaticJointReferenceAngle(jointId: integer | string): float;
        getPrismaticJointTranslation(jointId: integer | string): float;
        getPrismaticJointSpeed(jointId: integer | string): float;
        isPrismaticJointLimitsEnabled(jointId: integer | string): boolean;
        enablePrismaticJointLimits(jointId: integer | string, enable: boolean): void;
        getPrismaticJointMinTranslation(jointId: integer | string): float;
        getPrismaticJointMaxTranslation(jointId: integer | string): float;
        setPrismaticJointLimits(jointId: integer | string, lowerTranslation: float, upperTranslation: float): void;
        isPrismaticJointMotorEnabled(jointId: integer | string): boolean;
        enablePrismaticJointMotor(jointId: integer | string, enable: boolean): void;
        getPrismaticJointMotorSpeed(jointId: integer | string): float;
        setPrismaticJointMotorSpeed(jointId: integer | string, speed: any): void;
        getPrismaticJointMaxMotorForce(jointId: integer | string): float;
        setPrismaticJointMaxMotorForce(jointId: integer | string, maxForce: any): void;
        getPrismaticJointMotorForce(jointId: integer | string): float;
        addPulleyJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, groundX1: float, groundY1: float, groundX2: float, groundY2: float, lengthA: float, lengthB: float, ratio: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getPulleyJointFirstGroundAnchorX(jointId: integer | string): float;
        getPulleyJointFirstGroundAnchorY(jointId: integer | string): float;
        getPulleyJointSecondGroundAnchorX(jointId: integer | string): float;
        getPulleyJointSecondGroundAnchorY(jointId: integer | string): float;
        getPulleyJointFirstLength(jointId: integer | string): float;
        getPulleyJointSecondLength(jointId: integer | string): float;
        getPulleyJointRatio(jointId: integer | string): float;
        addGearJoint(jointId1: any, jointId2: any, ratio: any, collideConnected: any, variable: any): void;
        getGearJointFirstJoint(jointId: integer | string): float;
        getGearJointSecondJoint(jointId: integer | string): float;
        getGearJointRatio(jointId: integer | string): float;
        setGearJointRatio(jointId: integer | string, ratio: float): void;
        addMouseJoint(targetX: float, targetY: float, maxForce: float, frequency: float, dampingRatio: float, variable: gdjs.Variable): void;
        getMouseJointTargetX(jointId: integer | string): float;
        getMouseJointTargetY(jointId: integer | string): float;
        setMouseJointTarget(jointId: integer | string, targetX: float, targetY: float): void;
        getMouseJointMaxForce(jointId: integer | string): float;
        setMouseJointMaxForce(jointId: integer | string, maxForce: float): void;
        getMouseJointFrequency(jointId: integer | string): float;
        setMouseJointFrequency(jointId: integer | string, frequency: float): void;
        getMouseJointDampingRatio(jointId: integer | string): float;
        setMouseJointDampingRatio(jointId: integer | string, dampingRatio: float): void;
        addWheelJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, axisAngle: float, frequency: float, dampingRatio: float, enableMotor: boolean, motorSpeed: float, maxMotorTorque: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getWheelJointAxisAngle(jointId: integer | string): float;
        getWheelJointTranslation(jointId: integer | string): float;
        getWheelJointSpeed(jointId: integer | string): float;
        isWheelJointMotorEnabled(jointId: integer | string): boolean;
        enableWheelJointMotor(jointId: integer | string, enable: any): void;
        getWheelJointMotorSpeed(jointId: integer | string): float;
        setWheelJointMotorSpeed(jointId: integer | string, speed: any): void;
        getWheelJointMaxMotorTorque(jointId: integer | string): float;
        setWheelJointMaxMotorTorque(jointId: integer | string, maxTorque: float): void;
        getWheelJointMotorTorque(jointId: integer | string): float;
        getWheelJointFrequency(jointId: integer | string): float;
        setWheelJointFrequency(jointId: integer | string, frequency: any): void;
        getWheelJointDampingRatio(jointId: integer | string): float;
        setWheelJointDampingRatio(jointId: integer | string, dampingRatio: any): void;
        addWeldJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, referenceAngle: float, frequency: float, dampingRatio: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getWeldJointReferenceAngle(jointId: integer | string): float;
        getWeldJointFrequency(jointId: integer | string): float;
        setWeldJointFrequency(jointId: integer | string, frequency: float): void;
        getWeldJointDampingRatio(jointId: integer | string): float;
        setWeldJointDampingRatio(jointId: integer | string, dampingRatio: float): void;
        addRopeJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, maxLength: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getRopeJointMaxLength(jointId: integer | string): float;
        setRopeJointMaxLength(jointId: integer | string, maxLength: float): void;
        addFrictionJoint(x1: float, y1: float, other: gdjs.RuntimeObject | null, x2: float, y2: float, maxForce: float, maxTorque: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getFrictionJointMaxForce(jointId: integer | string): float;
        setFrictionJointMaxForce(jointId: integer | string, maxForce: float): void;
        getFrictionJointMaxTorque(jointId: integer | string): float;
        setFrictionJointMaxTorque(jointId: integer | string, maxTorque: float): void;
        addMotorJoint(other: gdjs.RuntimeObject | null, offsetX: float, offsetY: float, offsetAngle: float, maxForce: float, maxTorque: float, correctionFactor: float, collideConnected: boolean, variable: gdjs.Variable): void;
        getMotorJointOffsetX(jointId: integer | string): float;
        getMotorJointOffsetY(jointId: integer | string): float;
        setMotorJointOffset(jointId: integer | string, offsetX: float, offsetY: float): void;
        getMotorJointAngularOffset(jointId: integer | string): float;
        setMotorJointAngularOffset(jointId: integer | string, offsetAngle: float): void;
        getMotorJointMaxForce(jointId: integer | string): float;
        setMotorJointMaxForce(jointId: integer | string, maxForce: float): void;
        getMotorJointMaxTorque(jointId: integer | string): float;
        setMotorJointMaxTorque(jointId: integer | string, maxTorque: float): void;
        getMotorJointCorrectionFactor(jointId: integer | string): float;
        setMotorJointCorrectionFactor(jointId: integer | string, correctionFactor: float): void;
        onContactBegin(otherBehavior: Physics2RuntimeBehavior): void;
        onContactEnd(otherBehavior: Physics2RuntimeBehavior): void;
        /**
         * @deprecated Prefer using `Physics2RuntimeBehavior.areObjectsColliding`.
         */
        static collisionTest: typeof Physics2RuntimeBehavior.areObjectsColliding;
        static areObjectsColliding(object1: gdjs.RuntimeObject, object2: gdjs.RuntimeObject, behaviorName: string): boolean;
        static hasCollisionStartedBetween(object1: gdjs.RuntimeObject, object2: gdjs.RuntimeObject, behaviorName: string): boolean;
        static hasCollisionStoppedBetween(object1: gdjs.RuntimeObject, object2: gdjs.RuntimeObject, behaviorName: string): boolean;
    }
}
