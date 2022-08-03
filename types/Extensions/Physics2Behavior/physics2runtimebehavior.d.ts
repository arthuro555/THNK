declare namespace gdjs {
    class Physics2SharedData {
        gravityX: any;
        gravityY: any;
        scaleX: any;
        scaleY: any;
        invScaleX: any;
        invScaleY: any;
        timeStep: any;
        frameTime: float;
        stepped: boolean;
        timeScale: float;
        world: any;
        staticBody: any;
        contactListener: any;
        _nextJointId: number;
        joints: any;
        _registeredBehaviors: Set<Physics2RuntimeBehavior>;
        constructor(runtimeScene: any, sharedData: any);
        static getSharedData(runtimeScene: any, behaviorName: any): any;
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
        step(deltaTime: any): void;
        clearBodyJoints(body: any): void;
        addJoint(joint: any): number;
        getJoint(jointId: any): any;
        getJointId(joint: any): integer;
        removeJoint(jointId: any): void;
    }
    class Physics2RuntimeBehavior extends gdjs.RuntimeBehavior {
        bodyType: any;
        bullet: any;
        fixedRotation: boolean;
        canSleep: any;
        shape: any;
        shapeDimensionA: any;
        shapeDimensionB: any;
        shapeOffsetX: any;
        shapeOffsetY: any;
        polygonOrigin: any;
        polygon: any;
        density: any;
        friction: any;
        restitution: any;
        linearDamping: any;
        angularDamping: any;
        gravityScale: any;
        layers: any;
        masks: any;
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
        _body: any;
        _tempb2Vec2: any;
        /**
         * sharedData is a reference to the shared data of the scene, that registers
         * every physics behavior that is created so that collisions can be cleared
         * before stepping the world.
         */
        _sharedData: Physics2SharedData;
        _tempb2Vec2Sec: any;
        _objectOldX: number;
        _objectOldY: number;
        _objectOldAngle: float;
        _objectOldWidth: float;
        _objectOldHeight: float;
        _verticesBuffer: integer;
        constructor(runtimeScene: any, behaviorData: any, owner: any);
        b2Vec2(x: any, y: any): any;
        b2Vec2Sec(x: any, y: any): any;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onActivate(): void;
        onDestroy(): void;
        static getPolygon(verticesData: any): Polygon | null;
        static isPolygonConvex(polygon: any): boolean;
        createShape(): any;
        recreateShape(): void;
        getShapeScale(): number;
        setShapeScale(shapeScale: any): void;
        getBody(): any;
        createBody(): boolean;
        doStepPreEvents(runtimeScene: any): void;
        doStepPostEvents(runtimeScene: any): void;
        onObjectHotReloaded(): void;
        updateBodyFromObject(): void;
        getGravityX(): float;
        getGravityY(): float;
        setGravity(x: any, y: any): void;
        getTimeScale(): float;
        setTimeScale(timeScale: any): void;
        static setTimeScaleFromObject(object: any, behaviorName: any, timeScale: any): void;
        isDynamic(): boolean;
        setDynamic(): void;
        isStatic(): boolean;
        setStatic(): void;
        isKinematic(): boolean;
        setKinematic(): void;
        isBullet(): boolean;
        setBullet(enable: any): void;
        hasFixedRotation(): boolean;
        setFixedRotation(enable: any): void;
        isSleepingAllowed(): boolean;
        setSleepingAllowed(enable: any): void;
        isSleeping(): boolean;
        getDensity(): any;
        setDensity(density: any): void;
        getFriction(): any;
        setFriction(friction: any): void;
        getRestitution(): any;
        setRestitution(restitution: any): void;
        getLinearDamping(): any;
        setLinearDamping(linearDamping: any): void;
        getAngularDamping(): any;
        setAngularDamping(angularDamping: any): void;
        getGravityScale(): any;
        setGravityScale(gravityScale: any): void;
        layerEnabled(layer: any): boolean;
        enableLayer(layer: any, enable: any): void;
        maskEnabled(mask: any): boolean;
        enableMask(mask: any, enable: any): void;
        getLinearVelocityX(): float;
        setLinearVelocityX(linearVelocityX: any): void;
        getLinearVelocityY(): float;
        setLinearVelocityY(linearVelocityY: any): void;
        getLinearVelocityLength(): float;
        getAngularVelocity(): float;
        setAngularVelocity(angularVelocity: any): void;
        applyForce(forceX: any, forceY: any, positionX: any, positionY: any): void;
        applyPolarForce(angle: any, length: any, positionX: any, positionY: any): void;
        applyForceTowardPosition(length: any, towardX: any, towardY: any, positionX: any, positionY: any): void;
        applyImpulse(impulseX: any, impulseY: any, positionX: any, positionY: any): void;
        applyPolarImpulse(angle: any, length: any, positionX: any, positionY: any): void;
        applyImpulseTowardPosition(length: any, towardX: any, towardY: any, positionX: any, positionY: any): void;
        applyTorque(torque: any): void;
        applyAngularImpulse(angularImpulse: any): void;
        getMass(): float;
        getInertia(): float;
        getMassCenterX(): float;
        getMassCenterY(): float;
        isJointFirstObject(jointId: any): boolean;
        isJointSecondObject(jointId: any): boolean;
        getJointFirstAnchorX(jointId: any): float;
        getJointFirstAnchorY(jointId: any): float;
        getJointSecondAnchorX(jointId: any): float;
        getJointSecondAnchorY(jointId: any): float;
        getJointReactionForce(jointId: any): any;
        getJointReactionTorque(jointId: any): any;
        removeJoint(jointId: any): void;
        addDistanceJoint(x1: any, y1: any, other: any, x2: any, y2: any, length: any, frequency: any, dampingRatio: any, collideConnected: any, variable: any): void;
        getDistanceJointLength(jointId: any): number;
        setDistanceJointLength(jointId: any, length: any): void;
        getDistanceJointFrequency(jointId: any): any;
        setDistanceJointFrequency(jointId: any, frequency: any): void;
        getDistanceJointDampingRatio(jointId: any): any;
        setDistanceJointDampingRatio(jointId: any, dampingRatio: any): void;
        addRevoluteJoint(x: any, y: any, enableLimit: any, referenceAngle: any, lowerAngle: any, upperAngle: any, enableMotor: any, motorSpeed: any, maxMotorTorque: any, variable: any): void;
        addRevoluteJointBetweenTwoBodies(x1: any, y1: any, other: any, x2: any, y2: any, enableLimit: any, referenceAngle: any, lowerAngle: any, upperAngle: any, enableMotor: any, motorSpeed: any, maxMotorTorque: any, collideConnected: any, variable: any): void;
        getRevoluteJointReferenceAngle(jointId: any): float;
        getRevoluteJointAngle(jointId: any): float;
        getRevoluteJointSpeed(jointId: any): number;
        isRevoluteJointLimitsEnabled(jointId: any): boolean;
        enableRevoluteJointLimits(jointId: any, enable: any): void;
        getRevoluteJointMinAngle(jointId: any): float;
        getRevoluteJointMaxAngle(jointId: any): float;
        setRevoluteJointLimits(jointId: any, lowerAngle: any, upperAngle: any): void;
        isRevoluteJointMotorEnabled(jointId: any): boolean;
        enableRevoluteJointMotor(jointId: any, enable: any): void;
        getRevoluteJointMotorSpeed(jointId: any): number;
        setRevoluteJointMotorSpeed(jointId: any, speed: any): void;
        getRevoluteJointMaxMotorTorque(jointId: any): any;
        setRevoluteJointMaxMotorTorque(jointId: any, maxTorque: any): void;
        getRevoluteJointMotorTorque(jointId: any): any;
        addPrismaticJoint(x1: any, y1: any, other: any, x2: any, y2: any, axisAngle: any, referenceAngle: any, enableLimit: any, lowerTranslation: any, upperTranslation: any, enableMotor: any, motorSpeed: any, maxMotorForce: any, collideConnected: any, variable: any): void;
        getPrismaticJointAxisAngle(jointId: any): float;
        getPrismaticJointReferenceAngle(jointId: any): float;
        getPrismaticJointTranslation(jointId: any): number;
        getPrismaticJointSpeed(jointId: any): number;
        isPrismaticJointLimitsEnabled(jointId: any): boolean;
        enablePrismaticJointLimits(jointId: any, enable: any): void;
        getPrismaticJointMinTranslation(jointId: any): number;
        getPrismaticJointMaxTranslation(jointId: any): number;
        setPrismaticJointLimits(jointId: any, lowerTranslation: any, upperTranslation: any): void;
        isPrismaticJointMotorEnabled(jointId: any): boolean;
        enablePrismaticJointMotor(jointId: any, enable: any): void;
        getPrismaticJointMotorSpeed(jointId: any): number;
        setPrismaticJointMotorSpeed(jointId: any, speed: any): void;
        getPrismaticJointMaxMotorForce(jointId: any): any;
        setPrismaticJointMaxMotorForce(jointId: any, maxForce: any): void;
        getPrismaticJointMotorForce(jointId: any): any;
        addPulleyJoint(x1: any, y1: any, other: any, x2: any, y2: any, groundX1: any, groundY1: any, groundX2: any, groundY2: any, lengthA: any, lengthB: any, ratio: any, collideConnected: any, variable: any): void;
        getPulleyJointFirstGroundAnchorX(jointId: any): float;
        getPulleyJointFirstGroundAnchorY(jointId: any): float;
        getPulleyJointSecondGroundAnchorX(jointId: any): float;
        getPulleyJointSecondGroundAnchorY(jointId: any): float;
        getPulleyJointFirstLength(jointId: any): number;
        getPulleyJointSecondLength(jointId: any): number;
        getPulleyJointRatio(jointId: any): any;
        addGearJoint(jointId1: any, jointId2: any, ratio: any, collideConnected: any, variable: any): void;
        getGearJointFirstJoint(jointId: any): number;
        getGearJointSecondJoint(jointId: any): number;
        getGearJointRatio(jointId: any): any;
        setGearJointRatio(jointId: any, ratio: any): void;
        addMouseJoint(targetX: any, targetY: any, maxForce: any, frequency: any, dampingRatio: any, variable: any): void;
        getMouseJointTargetX(jointId: any): float;
        getMouseJointTargetY(jointId: any): float;
        setMouseJointTarget(jointId: any, targetX: any, targetY: any): void;
        getMouseJointMaxForce(jointId: any): any;
        setMouseJointMaxForce(jointId: any, maxForce: any): void;
        getMouseJointFrequency(jointId: any): any;
        setMouseJointFrequency(jointId: any, frequency: any): void;
        getMouseJointDampingRatio(jointId: any): any;
        setMouseJointDampingRatio(jointId: any, dampingRatio: any): void;
        addWheelJoint(x1: any, y1: any, other: any, x2: any, y2: any, axisAngle: any, frequency: any, dampingRatio: any, enableMotor: any, motorSpeed: any, maxMotorTorque: any, collideConnected: any, variable: any): void;
        getWheelJointAxisAngle(jointId: any): float;
        getWheelJointTranslation(jointId: any): number;
        getWheelJointSpeed(jointId: any): number;
        isWheelJointMotorEnabled(jointId: any): boolean;
        enableWheelJointMotor(jointId: any, enable: any): void;
        getWheelJointMotorSpeed(jointId: any): number;
        setWheelJointMotorSpeed(jointId: any, speed: any): void;
        getWheelJointMaxMotorTorque(jointId: any): any;
        setWheelJointMaxMotorTorque(jointId: any, maxTorque: any): void;
        getWheelJointMotorTorque(jointId: any): any;
        getWheelJointFrequency(jointId: any): any;
        setWheelJointFrequency(jointId: any, frequency: any): void;
        getWheelJointDampingRatio(jointId: any): any;
        setWheelJointDampingRatio(jointId: any, dampingRatio: any): void;
        addWeldJoint(x1: any, y1: any, other: any, x2: any, y2: any, referenceAngle: any, frequency: any, dampingRatio: any, collideConnected: any, variable: any): void;
        getWeldJointReferenceAngle(jointId: any): float;
        getWeldJointFrequency(jointId: any): any;
        setWeldJointFrequency(jointId: any, frequency: any): void;
        getWeldJointDampingRatio(jointId: any): any;
        setWeldJointDampingRatio(jointId: any, dampingRatio: any): void;
        addRopeJoint(x1: any, y1: any, other: any, x2: any, y2: any, maxLength: any, collideConnected: any, variable: any): void;
        getRopeJointMaxLength(jointId: any): number;
        setRopeJointMaxLength(jointId: any, maxLength: any): void;
        addFrictionJoint(x1: any, y1: any, other: any, x2: any, y2: any, maxForce: any, maxTorque: any, collideConnected: any, variable: any): void;
        getFrictionJointMaxForce(jointId: any): any;
        setFrictionJointMaxForce(jointId: any, maxForce: any): void;
        getFrictionJointMaxTorque(jointId: any): any;
        setFrictionJointMaxTorque(jointId: any, maxTorque: any): void;
        addMotorJoint(other: any, offsetX: any, offsetY: any, offsetAngle: any, maxForce: any, maxTorque: any, correctionFactor: any, collideConnected: any, variable: any): void;
        getMotorJointOffsetX(jointId: any): float;
        getMotorJointOffsetY(jointId: any): float;
        setMotorJointOffset(jointId: any, offsetX: any, offsetY: any): void;
        getMotorJointAngularOffset(jointId: any): number;
        setMotorJointAngularOffset(jointId: any, offsetAngle: any): void;
        getMotorJointMaxForce(jointId: any): any;
        setMotorJointMaxForce(jointId: any, maxForce: any): void;
        getMotorJointMaxTorque(jointId: any): any;
        setMotorJointMaxTorque(jointId: any, maxTorque: any): void;
        getMotorJointCorrectionFactor(jointId: any): any;
        setMotorJointCorrectionFactor(jointId: any, correctionFactor: any): void;
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
