declare namespace gdjs {
    /** An axis-aligned bounding box. Used to represents a box around an object for example. */
    export type AABB = {
        /** The [x,y] coordinates of the top left point */
        min: FloatPoint;
        /** The [x,y] coordinates of the bottom right point */
        max: FloatPoint;
    };
    type RendererObjectInterface = {
        visible: boolean;
    };
    /**
     * RuntimeObject represents an object being used on a RuntimeScene.
     *
     * A `gdjs.RuntimeObject` should not be instantiated directly, always a child class
     * (because gdjs.RuntimeObject don't call onCreated at the end of its constructor).
     */
    export class RuntimeObject implements EffectsTarget {
        name: string;
        type: string;
        x: float;
        y: float;
        angle: float;
        zOrder: integer;
        hidden: boolean;
        layer: string;
        protected _nameId: integer;
        protected _livingOnScene: boolean;
        readonly id: integer;
        private destroyCallbacks;
        _runtimeScene: gdjs.RuntimeScene;
        /**
         * An optional UUID associated to the object to be used
         * for hot reload. Don't modify or use otherwise.
         */
        persistentUuid: string | null;
        /**
         * A property to be used by external algorithms to indicate if the
         * object is picked or not in an object selection. By construction, this is
         * not "thread safe" or "re-entrant algorithm" safe.
         */
        pick: boolean;
        protected _defaultHitBoxes: gdjs.Polygon[];
        protected hitBoxes: gdjs.Polygon[];
        protected hitBoxesDirty: boolean;
        protected aabb: AABB;
        protected _variables: gdjs.VariablesContainer;
        protected _rendererEffects: Record<string, PixiFiltersTools.Filter>;
        protected _forces: gdjs.Force[];
        _averageForce: gdjs.Force;
        /**
         * Contains the behaviors of the object.
         */
        protected _behaviors: gdjs.RuntimeBehavior[];
        protected _behaviorsTable: Hashtable<gdjs.RuntimeBehavior>;
        protected _timers: Hashtable<gdjs.Timer>;
        /**
         * @param runtimeScene The scene the object belongs to..
         * @param objectData The initial properties of the object.
         */
        constructor(runtimeScene: gdjs.RuntimeScene, objectData: ObjectData);
        /**
         * To be called by the child classes in their constructor, at the very end.
         * Notify the behaviors that they have been constructed (this must be done when
         * the object is ready, otherwise behaviors can do operations on the object which
         * could be not initialized yet).
         *
         * If you redefine this function, **make sure to call the original method**
         * (`RuntimeObject.prototype.onCreated.call(this);`).
         */
        onCreated(): void;
        /**
         * Called to reset the object to its default state. This is used for objects that are
         * "recycled": they are dismissed (at which point `onDestroyFromScene` is called) but still
         * stored in a cache to be reused next time an object must be created. At this point,
         * `reinitialize` will be called. The object must then work as if it was a newly constructed
         * object.
         *
         * To implement this in your object:
         * * Set `gdjs.YourRuntimeObject.supportsReinitialization = true;` to declare support for recycling.
         * * Implement `reinitialize`. It **must** call the `reinitialize` of `gdjs.RuntimeObject`, and call `this.onCreated();`
         * at the end of `reinitizalize`.
         * * It must reset the object as if it was newly constructed (be careful about your renderers and any global state).
         * * The `_runtimeScene`, `_nameId`, `name` and `type` are guaranteed to stay the same and do not
         * need to be set again.
         *
         */
        reinitialize(objectData: ObjectData): void;
        static supportsReinitialization: boolean;
        /**
         * Return the time elapsed since the last frame,
         * in milliseconds, for the object.
         *
         * Objects can have different elapsed time if they are on layers with different time scales.
         *
         * @param runtimeScene The RuntimeScene the object belongs to (deprecated - can be omitted).
         */
        getElapsedTime(runtimeScene?: gdjs.RuntimeScene): float;
        /**
         * The gdjs.RuntimeScene the object belongs to.
         */
        getRuntimeScene(): RuntimeScene;
        /**
         * Called once during the game loop, before events and rendering.
         * @param runtimeScene The gdjs.RuntimeScene the object belongs to.
         */
        update(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Called once during the game loop, after events and before rendering.
         * @param runtimeScene The gdjs.RuntimeScene the object belongs to.
         */
        updatePreRender(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Called when the object is created from an initial instance at the startup of the scene.<br>
         * Note that common properties (position, angle, z order...) have already been setup.
         *
         * @param initialInstanceData The data of the initial instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        /**
         * Called when the object must be updated using the specified objectData. This is the
         * case during hot-reload, and is only called if the object was modified.
         *
         * @param oldObjectData The previous data for the object.
         * @param newObjectData The new data for the object.
         * @returns true if the object was updated, false if it could not (i.e: hot-reload is not supported).
         */
        updateFromObjectData(oldObjectData: ObjectData, newObjectData: ObjectData): boolean;
        /**
         * Remove an object from a scene.
         *
         * Do not change/redefine this method. Instead, redefine the onDestroyFromScene method.
         * @param runtimeScene The RuntimeScene owning the object.
         */
        deleteFromScene(runtimeScene: gdjs.RuntimeScene): void;
        registerDestroyCallback(callback: () => void): void;
        unregisterDestroyCallback(callback: () => void): void;
        /**
         * Called when the object is destroyed (because it is removed from a scene or the scene
         * is being unloaded). If you redefine this function, **make sure to call the original method**
         * (`RuntimeObject.prototype.onDestroyFromScene.call(this, runtimeScene);`).
         *
         * @param runtimeScene The scene owning the object.
         */
        onDestroyFromScene(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Called whenever the scene owning the object is paused.
         * This should *not* impact objects, but some may need to inform their renderer.
         *
         * @param runtimeScene The scene owning the object.
         */
        onScenePaused(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Called whenever the scene owning the object is resumed after a pause.
         * This should *not* impact objects, but some may need to inform their renderer.
         *
         * @param runtimeScene The scene owning the object.
         */
        onSceneResumed(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Called with a callback function that should be called with the internal
         * object used for rendering by the object (PIXI.DisplayObject...)
         *
         * @return The internal rendered object (PIXI.DisplayObject...)
         */
        getRendererObject(): RendererObjectInterface | null | undefined;
        /**
         * Get the name of the object.
         * @return The object's name.
         */
        getName(): string;
        /**
         * Get the name identifier of the object.
         * @return The object's name identifier.
         */
        getNameId(): integer;
        /**
         * Get the unique identifier of the object.<br>
         * The identifier is set by the runtimeScene owning the object.<br>
         * You can also use the id property (this._object.id) for increased efficiency instead of
         * calling this method.
         *
         * @return The object identifier
         */
        getUniqueId(): integer;
        /**
         * Set the position of the object.
         *
         * @param x The new X position
         * @param y The new Y position
         */
        setPosition(x: float, y: float): void;
        /**
         * Set the X position of the object.
         *
         * @param x The new X position
         */
        setX(x: float): void;
        /**
         * Get the X position of the object.
         *
         * @return The X position of the object
         */
        getX(): float;
        /**
         * Set the Y position of the object.
         *
         * @param y The new Y position
         */
        setY(y: float): void;
        /**
         * Get the Y position of the object.
         *
         * @return The Y position of the object
         */
        getY(): float;
        /**
         * Get the X position of the rendered object.
         *
         * For most objects, this will returns the same value as getX(). But if the object
         * has an origin that is not the same as the point (0,0) of the object displayed,
         * getDrawableX will differ.
         *
         * @return The X position of the rendered object.
         */
        getDrawableX(): float;
        /**
         * Get the Y position of the rendered object.
         *
         * For most objects, this will returns the same value as getY(). But if the object
         * has an origin that is not the same as the point (0,0) of the object displayed,
         * getDrawableY will differ.
         *
         * @return The Y position of the rendered object.
         */
        getDrawableY(): float;
        rotateTowardPosition(x: float, y: float, speed: float, scene: gdjs.RuntimeScene): void;
        rotateTowardAngle(angle: float, speed: float, runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Rotate the object at the given speed
         *
         * @param speed The speed, in degrees per second.
         * @param runtimeScene The scene where the object is displayed.
         */
        rotate(speed: float, runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Set the angle of the object.
         *
         * @param angle The new angle of the object
         */
        setAngle(angle: float): void;
        /**
         * Get the rotation of the object.
         *
         * @return The rotation of the object, in degrees.
         */
        getAngle(): float;
        /**
         * Set the layer of the object.
         *
         * @param layer The new layer of the object
         */
        setLayer(layer: string): void;
        /**
         * Get the layer of the object.
         *
         * @return The layer of the object
         */
        getLayer(): string;
        /**
         * Return true if the object is on the specified layer
         *
         * @param layer The layer to be tested.
         * @return true if the object is on the specified layer
         */
        isOnLayer(layer: string): boolean;
        /**
         * Set the Z order of the object.
         *
         * @param z The new Z order position of the object
         */
        setZOrder(z: integer): void;
        /**
         * Get the Z order of the object.
         *
         * @return The Z order of the object
         */
        getZOrder(): float;
        /**
         * Get the container of the object variables
         * @return The variables of the object
         */
        getVariables(): gdjs.VariablesContainer;
        /**
         * Get the value of a variable considered as a number. Equivalent of variable.getAsNumber()
         * @param variable The variable to be accessed
         * @return The value of the specified variable
         * @static
         */
        static getVariableNumber(variable: gdjs.Variable): number;
        /**
         * Return the variable passed as argument without any change.
         * Only for usage by events.
         *
         * @param variable The variable to be accessed
         * @return The specified variable
         * @static
         */
        static returnVariable(variable: gdjs.Variable): gdjs.Variable;
        /**
         * Get the value of a variable considered as a string. Equivalent of variable.getAsString()
         * @param variable The variable to be accessed
         * @return The string of the specified variable
         * @static
         */
        static getVariableString(variable: gdjs.Variable): string;
        /**
         * Shortcut to set the value of a variable considered as a boolean.
         * This shortcut function is needed for events code generation.
         *
         * @private
         * @param {gdjs.Variable} variable
         * @param {boolean} newValue
         */
        static setVariableBoolean: (variable: gdjs.Variable, newValue: boolean) => void;
        /**
         * Shortcut to compare the value of a variable considered as a boolean.
         * This shortcut function is needed for events code generation.
         *
         * @private
         * @param {gdjs.Variable} variable
         * @param {boolean} compareWith
         * @returns {boolean}
         */
        static getVariableBoolean: (variable: gdjs.Variable, compareWith: boolean) => boolean;
        /**
         * Toggles a variable.
         * This shortcut function is needed for events code generation.
         *
         * @private
         * @param {gdjs.Variable} variable
         * @see {gdjs.evtTools.common.toggleVariableBoolean}
         */
        static toggleVariableBoolean: (variable: gdjs.Variable) => void;
        /**
         * Get the number of children from a variable
         * @param variable The variable to be accessed
         * @return The number of children
         * @static
         */
        static getVariableChildCount(variable: gdjs.Variable): integer;
        /**
         * Shortcut to set the value of a variable considered as a number
         * @param variable The variable to be changed
         * @param newValue The value to be set
         */
        static setVariableNumber(variable: gdjs.Variable, newValue: float): void;
        /**
         * Shortcut to set the value of a variable considered as a string
         * @param variable The variable to be changed
         * @param newValue {String} The value to be set
         */
        static setVariableString(variable: gdjs.Variable, newValue: string): void;
        /**
         * @static
         * @param variable The variable to be tested
         * @param childName The name of the child
         */
        private static variableChildExists;
        /**
         * @static
         * @param variable The variable to be changed
         * @param childName The name of the child
         */
        private static variableRemoveChild;
        /**
         * @static
         * @param variable The variable to be cleared
         */
        private static variableClearChildren;
        /**
         * This shortcut function is needed for events code generation.
         * @private
         */
        static variablePushCopy: (array: gdjs.Variable, variable: gdjs.Variable) => void;
        /**
         * This shortcut function is needed for events code generation.
         * @private
         */
        static valuePush: (array: gdjs.Variable, value: string | float | boolean) => void;
        /**
         * This shortcut function is needed for events code generation.
         * @private
         */
        static variableRemoveAt: (array: gdjs.Variable, index: number) => void;
        /**
         * Shortcut to test if a variable exists for the object.
         * @param name The variable to be tested
         * @return true if the variable exists.
         */
        hasVariable(name: string): boolean;
        /**
         * Returns the collection of effects to be rendered by the
         * underlying renderer.
         * @returns The renderer effects.
         */
        getRendererEffects(): Record<string, PixiFiltersTools.Filter>;
        /**
         * Add a new effect, or replace the one with the same name.
         * @param effectData The data describing the effect to add.
         */
        addEffect(effectData: EffectData): boolean;
        /**
         * Remove the effect with the specified name
         * @param effectName The name of the effect.
         */
        removeEffect(effectName: string): boolean;
        /**
         * Remove all effects.
         */
        clearEffects(): boolean;
        /**
         * Change an effect parameter value (for parameters that are numbers).
         * @param name The name of the effect to update.
         * @param parameterName The name of the parameter to update.
         * @param value The new value (number).
         */
        setEffectDoubleParameter(name: string, parameterName: string, value: float): boolean;
        /**
         * Change an effect parameter value (for parameters that are strings).
         * @param name The name of the effect to update.
         * @param parameterName The name of the parameter to update.
         * @param value The new value (string).
         */
        setEffectStringParameter(name: string, parameterName: string, value: string): boolean;
        /**
         * Change an effect parameter value (for parameters that are booleans).
         * @param name The name of the effect to update.
         * @param parameterName The name of the parameter to update.
         * @param value The new value (boolean).
         */
        setEffectBooleanParameter(name: string, parameterName: string, value: boolean): boolean;
        /**
         * Updates all the parameters of an effect.
         * @param effectData The data describing the effect
         */
        updateAllEffectParameters(effectData: EffectData): boolean;
        /**
         * Enable or disable an effect.
         * @param name The name of the effect to enable or disable.
         * @param enable true to enable, false to disable
         */
        enableEffect(name: string, enable: boolean): void;
        /**
         * Check if an effect is enabled
         * @param name The name of the effect
         * @return true if the effect is enabled, false otherwise.
         */
        isEffectEnabled(name: string): boolean;
        /**
         * Check if an effect exists on this object
         * @param name The name of the effect
         * @return true if the effect exists, false otherwise.
         */
        hasEffect(name: string): boolean;
        /**
         * Hide (or show) the object.
         * @param enable Set it to true to hide the object, false to show it.
         */
        hide(enable: boolean): void;
        /**
         * Return true if the object is not hidden.
         *
         * Note: This is unrelated to the actual visibility of the object on the screen.
         * For this, see `getVisibilityAABB` to get the bounding boxes of the object as displayed
         * on the scene.
         *
         * @return true if the object is not hidden.
         */
        isVisible(): boolean;
        /**
         * Return true if the object is hidden.
         * @return true if the object is hidden.
         */
        isHidden(): boolean;
        /**
         * Set the width of the object, if applicable.
         * @param width The new width in pixels.
         */
        setWidth(width: float): void;
        /**
         * Set the height of the object, if applicable.
         * @param height The new height in pixels.
         */
        setHeight(height: float): void;
        /**
         * Return the width of the object.
         * @return The width of the object
         */
        getWidth(): float;
        /**
         * Return the width of the object.
         * @return The height of the object
         */
        getHeight(): float;
        /**
         * Return the X position of the object center, **relative to the object X position** (`getDrawableX`).
         * Use `getCenterXInScene` to get the position of the center in the scene.
         *
         * @return the X position of the object center, relative to `getDrawableX()`.
         */
        getCenterX(): float;
        /**
         * Return the Y position of the object center, **relative to the object position** (`getDrawableY`).
         * Use `getCenterYInScene` to get the position of the center in the scene.
         *
         * @return the Y position of the object center, relative to `getDrawableY()`.
         */
        getCenterY(): float;
        /**
         * Return the X position of the object center, **relative to the scene origin**.
         * @returns the X position of the object center, **relative to the scene origin**.
         */
        getCenterXInScene(): float;
        /**
         * Return the Y position of the object center, **relative to the scene origin**.
         * @returns the Y position of the object center, **relative to the scene origin**.
         */
        getCenterYInScene(): float;
        /**
         * Change the object center position in the scene.
         * @param x The new X position of the center in the scene.
         * @param y The new Y position of the center in the scene.
         */
        setCenterPositionInScene(x: float, y: float): void;
        /**
         * Change the object center X position in the scene.
         * @param x The new X position of the center in the scene.
         */
        setCenterXInScene(x: float): void;
        /**
         * Change the object center Y position in the scene.
         * @param x The new Y position of the center in the scene.
         */
        setCenterYInScene(y: float): void;
        /**
         * Get a force from the garbage, or create a new force is garbage is empty.<br>
         * To be used each time a force is created so as to avoid temporaries objects.
         *
         * @param x The x coordinates of the force
         * @param y The y coordinates of the force
         * @param multiplier Set the force multiplier
         */
        private _getRecycledForce;
        /**
         * Add a force to the object to move it.
         * @param x The x coordinates of the force
         * @param y The y coordinates of the force
         * @param multiplier Set the force multiplier
         */
        addForce(x: float, y: float, multiplier: integer): void;
        /**
         * Add a force using polar coordinates.
         * @param angle The angle of the force, in degrees.
         * @param len The length of the force, in pixels.
         * @param multiplier Set the force multiplier
         */
        addPolarForce(angle: float, len: float, multiplier: integer): void;
        /**
         * Add a force oriented toward a position
         * @param x The target x position
         * @param y The target y position
         * @param len The force length, in pixels.
         * @param multiplier Set the force multiplier
         */
        addForceTowardPosition(x: float, y: float, len: float, multiplier: integer): void;
        /**
         * Add a force oriented toward another object.<br>
         * (Shortcut for addForceTowardPosition)
         * @param object The target object
         * @param len The force length, in pixels.
         * @param multiplier Set the force multiplier
         */
        addForceTowardObject(object: gdjs.RuntimeObject, len: float, multiplier: integer): void;
        /**
         * Deletes all forces applied on the object
         */
        clearForces(): void;
        /**
         * Return true if no forces are applied on the object.
         * @return true if no forces are applied on the object.
         */
        hasNoForces(): boolean;
        /**
         * Called once a step by runtimeScene to update forces magnitudes and
         * remove null ones.
         */
        updateForces(elapsedTime: float): void;
        /**
         * Return a force which is the sum of all forces applied on the object.
         *
         * @return A force object.
         */
        getAverageForce(): gdjs.Force;
        /**
         * Return true if the average angle of the forces applied on the object
         * is in a given range.
         *
         * @param angle The angle to be tested.
         * @param toleranceInDegrees The length of the range :
         * @return true if the difference between the average angle of the forces
         * and the angle parameter is inferior to toleranceInDegrees parameter.
         */
        averageForceAngleIs(angle: float, toleranceInDegrees: float): boolean;
        /**
         * Get all the hit boxes for the object.
         *
         * For collision checks, {@link getHitBoxesAround} should be used instead.
         *
         * The default implementation returns a basic bounding box based the size (getWidth and
         * getHeight) and the center point of the object (getCenterX and getCenterY).
         *
         * You should probably redefine {@link updateHitBoxes} instead of this function.
         *
         * @return An array composed of polygon.
         */
        getHitBoxes(): gdjs.Polygon[];
        /**
         * Return at least all the hit boxes that overlap a given area.
         *
         * The hit boxes don't need to actually overlap the area,
         * (i.e: it's correct to return more hit boxes than those in the specified area)
         * but the ones that do must be returned.
         *
         * The default implementation returns the same as {@link getHitBoxes}.
         *
         * This method can be overridden by grid based objects (or other objects
         * that can quickly compute which hitboxes are touching a given area)
         * to optimize collision checks.
         *
         * When overriding this method, the following ones should be overridden too:
         * * {@link getHitBoxes}
         * * {@link getAABB}
         * * {@link updateHitBoxes}
         * * {@link updateAABB}
         *
         * @param left bound of the area in scene coordinates
         * @param top bound of the area in scene coordinates
         * @param right bound of the area in scene coordinates
         * @param bottom bound of the area in scene coordinates
         *
         * @return at least all the hit boxes that overlap a given area.
         */
        getHitBoxesAround(left: float, top: float, right: float, bottom: float): Iterable<gdjs.Polygon>;
        /**
         * Update the hit boxes for the object.
         *
         * The default implementation set a basic bounding box based on the size (getWidth and
         * getHeight) and the center point of the object (getCenterX and getCenterY).
         * Result is cached until invalidated (by a position change, angle change...).
         *
         * You should not call this function by yourself, it is called when necessary by getHitBoxes method.
         * However, you can redefine it if your object need custom hit boxes.
         */
        updateHitBoxes(): void;
        /**
         * Get the AABB (axis aligned bounding box) for the object.
         *
         * The default implementation uses either the position/size of the object (when angle is 0) or
         * hitboxes (when angle is not 0) to compute the bounding box.
         * Result is cached until invalidated (by a position change, angle change...).
         *
         * You should probably redefine updateAABB instead of this function.
         *
         * @return The bounding box
         */
        getAABB(): AABB;
        /**
         * Get the AABB (axis aligned bounding box) to be used to determine if the object
         * is visible on screen. The gdjs.RuntimeScene will hide the renderer object if
         * the object is not visible on screen ("culling").
         *
         * The default implementation uses the AABB returned by getAABB.
         *
         * If `null` is returned, the object is assumed to be always visible.
         *
         * @return The bounding box or `null`.
         */
        getVisibilityAABB(): AABB | null;
        /**
         * Update the AABB (axis aligned bounding box) for the object.
         *
         * Default implementation uses either the position/size of the object (when angle is 0) or
         * hitboxes (when angle is not 0) to compute the bounding box.
         *
         * You should not call this function by yourself, it is called when necessary by getAABB method.
         * However, you can redefine it if your object can have a faster implementation.
         */
        updateAABB(): void;
        /**
         * Shortcut for `getAABB().min[0]`.
         * See {@link getAABB}.
         */
        getAABBLeft(): float;
        /**
         * Shortcut for `getAABB().min[1]`.
         * See {@link getAABB}.
         */
        getAABBTop(): float;
        /**
         * Shortcut for `getAABB().max[0]`.
         * See {@link getAABB}.
         */
        getAABBRight(): float;
        /**
         * Shortcut for `getAABB().max[1]`.
         * See {@link getAABB}.
         */
        getAABBBottom(): float;
        /**
         * Shortcut for getting the center on the X coordinates of the object AABB.
         * See {@link getAABB}.
         */
        getAABBCenterX(): float;
        /**
         * Shortcut for getting the center on the Y coordinates of the object AABB.
         * See {@link getAABB}.
         */
        getAABBCenterY(): float;
        /**
         * Call each behavior stepPreEvents method.
         */
        stepBehaviorsPreEvents(runtimeScene: any): void;
        /**
         * Call each behavior stepPostEvents method.
         */
        stepBehaviorsPostEvents(runtimeScene: any): void;
        /**
         * Called when the object was hot reloaded, to notify behaviors
         * that the object was modified. Useful for behaviors that
         */
        notifyBehaviorsObjectHotReloaded(): void;
        /**
         * Get a behavior from its name.
         * If the behavior does not exists, `undefined` is returned.
         *
         * **Never keep a reference** to a behavior, as they can be hot-reloaded. Instead,
         * always call getBehavior on the object.
         *
         * @param name {String} The behavior name.
         * @return The behavior with the given name, or undefined.
         */
        getBehavior(name: string): gdjs.RuntimeBehavior | null;
        /**
         * Check if a behavior is used by the object.
         *
         * @param name {String} The behavior name.
         */
        hasBehavior(name: string): boolean;
        /**
         * De/activate a behavior of the object.
         *
         * @param name {String} The behavior name.
         * @param enable {boolean} true to activate the behavior
         */
        activateBehavior(name: string, enable: boolean): void;
        /**
         * Check if a behavior is activated
         *
         * @param name The behavior name.
         * @return true if the behavior is activated.
         */
        behaviorActivated(name: string): boolean;
        /**
         * Remove the behavior with the given name. Usually only used by
         * hot-reloading, as performance of this operation is not guaranteed
         * (in the future, this could lead to re-organization of arrays
         * holding behaviors).
         *
         * @param name The name of the behavior to remove.
         * @returns true if the behavior was properly removed, false otherwise.
         */
        removeBehavior(name: string): boolean;
        /**
         * Create the behavior decribed by the given BehaviorData
         *
         * @param behaviorData The data to be used to construct the behavior.
         * @returns true if the behavior was properly created, false otherwise.
         */
        addNewBehavior(behaviorData: BehaviorData): boolean;
        /**
         * Updates the object timers. Called once during the game loop, before events and rendering.
         * @param elapsedTime The elapsed time since the previous frame in milliseconds.
         */
        updateTimers(elapsedTime: float): void;
        /**
         * Compare a timer elapsed time. If the timer does not exist, it is created.
         *
         * @deprecated prefer using `getTimerElapsedTimeInSecondsOrNaN`.
         *
         * @param timerName The timer name.
         * @param timeInSeconds The time value to check in seconds.
         * @return True if the timer exists and its value is greater than or equal than the given time, false otherwise.
         */
        timerElapsedTime(timerName: string, timeInSeconds: float): boolean;
        /**
         * Test a if a timer is paused.
         * @param timerName The timer name.
         * @return True if the timer exists and is paused, false otherwise.
         */
        timerPaused(timerName: string): boolean;
        /**
         * Reset a timer. If the timer doesn't exist it is created.
         * @param timerName The timer name.
         */
        resetTimer(timerName: string): void;
        /**
         * Pause a timer. If the timer doesn't exist it is created.
         * @param timerName The timer name.
         */
        pauseTimer(timerName: string): void;
        /**
         * Unpause a timer. If the timer doesn't exist it is created.
         * @param timerName The timer name.
         */
        unpauseTimer(timerName: string): void;
        /**
         * Remove a timer
         * @param timerName The timer name.
         */
        removeTimer(timerName: string): void;
        /**
         * Get a timer elapsed time.
         *
         * This is used by expressions to return 0 when a timer doesn't exist
         * because numeric expressions must always return a number.
         *
         * @param timerName The timer name.
         * @return The timer elapsed time in seconds, 0 if the timer doesn't exist.
         */
        getTimerElapsedTimeInSeconds(timerName: string): float;
        /**
         * Get a timer elapsed time.
         *
         * This is used by conditions to return false when a timer doesn't exist,
         * no matter the relational operator.
         *
         * @param timerName The timer name.
         * @return The timer elapsed time in seconds, NaN if the timer doesn't exist.
         */
        getTimerElapsedTimeInSecondsOrNaN(timerName: string): float;
        /**
         * Separate the object from others objects, using their hitboxes.
         * @param objects Objects
         * @param ignoreTouchingEdges If true, then edges that are touching each other, without the hitbox polygons actually overlapping, won't be considered in collision.
         * @return true if the object was moved
         */
        separateFromObjects(objects: RuntimeObject[], ignoreTouchingEdges: boolean): boolean;
        /**
         * Separate the object from others objects, using their hitboxes.
         * @param objectsLists Tables of objects
         * @param ignoreTouchingEdges If true, then edges that are touching each other, without the hitbox polygons actually overlapping, won't be considered in collision.
         * @return true if the object was moved
         */
        separateFromObjectsList(objectsLists: ObjectsLists, ignoreTouchingEdges: boolean): boolean;
        /**
         * Get the distance, in pixels, between *the center* of this object and another object.
         * @param otherObject The other object
         */
        getDistanceToObject(otherObject: gdjs.RuntimeObject): float;
        /**
         * Get the squared distance, in pixels, between *the center* of this object and another object.
         * @param otherObject The other object
         */
        getSqDistanceToObject(otherObject: gdjs.RuntimeObject): float;
        /**
         * Get the distance, in pixels, between *the center* of this object and a position.
         * @param targetX Target X position
         * @param targetY Target Y position
         */
        getDistanceToPosition(targetX: float, targetY: float): float;
        /**
         * Get the squared distance, in pixels, between *the center* of this object and a position.
         * @param targetX Target X position
         * @param targetY Target Y position
         */
        getSqDistanceToPosition(targetX: float, targetY: float): float;
        /**
         * Get the angle, in degrees, from the *object center* to another object.
         * @param otherObject The other object
         */
        getAngleToObject(otherObject: gdjs.RuntimeObject): float;
        /**
         * Compute the X position when given an angle and distance relative to the starting object.
         * This is also known as getting the cartesian coordinates of a 2D vector, using its polar coordinates.
         * @param angle The angle, in degrees.
         * @param distance The distance from the object, in pixels
         */
        getXFromAngleAndDistance(angle: float, distance: float): float;
        /**
         * Compute the Y position when given an angle and distance relative to the starting object.
         * This is also known as getting the cartesian coordinates of a 2D vector, using its polar coordinates.
         * @param angle The angle, in degrees.
         * @param distance The distance from the object, in pixels
         */
        getYFromAngleAndDistance(angle: float, distance: float): float;
        /**
         * Get the angle, in degrees, from the *object center* to a position.
         * @param targetX Target X position
         * @param targetY Target Y position
         */
        getAngleToPosition(targetX: float, targetY: float): float;
        /**
         * Put the object around a position, with a specific distance and angle.
         * The distance and angle are computed between the position and *the center of the object*.
         *
         * @param x The x position of the target
         * @param y The y position of the target
         * @param distance The distance between the object and the target, in pixels.
         * @param angleInDegrees The angle between the object and the target, in degrees.
         */
        putAround(x: float, y: float, distance: float, angleInDegrees: float): void;
        /**
         * Put the object around another object, with a specific distance and angle.
         * The distance and angle are computed between *the centers of the objects*.
         *
         * @param obj The target object
         * @param distance The distance between the object and the target
         * @param angleInDegrees The angle between the object and the target, in degrees.
         */
        putAroundObject(obj: gdjs.RuntimeObject, distance: float, angleInDegrees: float): void;
        /**
         * @deprecated
         * @param objectsLists Tables of objects
         */
        separateObjectsWithoutForces(objectsLists: ObjectsLists): void;
        /**
         * @deprecated
         * @param objectsLists Tables of objects
         */
        separateObjectsWithForces(objectsLists: ObjectsLists): void;
        /**
         * Return true if the hitboxes of two objects are overlapping
         * @static
         * @param obj1 The first runtimeObject
         * @param obj2 The second runtimeObject
         * @param ignoreTouchingEdges If true, then edges that are touching each other, without the hitbox polygons actually overlapping, won't be considered in collision.
         * @return true if obj1 and obj2 are in collision
         */
        static collisionTest(obj1: gdjs.RuntimeObject, obj2: gdjs.RuntimeObject, ignoreTouchingEdges: boolean): boolean;
        /**
         * @param x The raycast source X
         * @param y The raycast source Y
         * @param endX The raycast end position X
         * @param endY The raycast end position Y
         * @param closest Get the closest or farthest collision mask result?
         * @return A raycast result with the contact points and distances
         */
        raycastTest(x: float, y: float, endX: float, endY: float, closest: boolean): RaycastTestResult;
        /**
         * Return true if the specified position is inside object bounding box.
         *
         * The position should be in "world" coordinates, i.e use gdjs.Layer.convertCoords
         * if you need to pass the mouse or a touch position that you get from gdjs.InputManager.
         * To check if a point is inside the object collision mask, you can use `isCollidingWithPoint` instead.
         *
         */
        insideObject(x: float, y: float): boolean;
        /**
         * Check the distance between two objects.
         * @static
         */
        static distanceTest(obj1: RuntimeObject, obj2: RuntimeObject, distance: float): boolean;
        /**
         * Return true if the cursor, or any touch, is on the object.
         *
         * @return true if the cursor, or any touch, is on the object.
         */
        cursorOnObject(runtimeScene: RuntimeScene): boolean;
        /**
         * Check if a point is inside the object collision hitboxes.
         * @param pointX The point x coordinate.
         * @param pointY The point y coordinate.
         * @return true if the point is inside the object collision hitboxes.
         */
        isCollidingWithPoint(pointX: float, pointY: float): boolean;
        /**
         * Get the identifier associated to an object name.
         * Some features may want to compare objects name a large number of time. In this case,
         * it may be more efficient to compare objects name identifiers.
         *
         * @static
         */
        static getNameIdentifier(name: string): integer;
        /**
         * Table containing the id corresponding to an object name. Do not use directly or modify.
         * @static
         */
        static _identifiers: Hashtable<number>;
        /**
         * The next available unique identifier for an object. Do not use directly or modify.
         * @static
         */
        static _newId: number;
        /**
         * Global container for unused forces, avoiding recreating forces each tick.
         * @static
         */
        static forcesGarbage: Array<gdjs.Force>;
        getVariableNumber: typeof RuntimeObject.getVariableNumber;
        returnVariable: typeof RuntimeObject.returnVariable;
        getVariableString: typeof RuntimeObject.getVariableString;
        setVariableNumber: typeof RuntimeObject.setVariableNumber;
        setVariableString: typeof RuntimeObject.setVariableString;
        getVariableBoolean: (variable: gdjs.Variable, compareWith: boolean) => boolean;
        setVariableBoolean: (variable: gdjs.Variable, newValue: boolean) => void;
        toggleVariableBoolean: (variable: gdjs.Variable) => void;
        variableChildExists: typeof RuntimeObject.variableChildExists;
        variableRemoveChild: typeof RuntimeObject.variableRemoveChild;
        variableClearChildren: typeof RuntimeObject.variableClearChildren;
        variablePushCopy: (array: gdjs.Variable, variable: gdjs.Variable) => void;
        valuePush: (array: gdjs.Variable, value: string | float | boolean) => void;
        variableRemoveAt: (array: gdjs.Variable, index: number) => void;
        /**
         * Get the squared distance, in pixels, from the *object center* to a position.
         * @param pointX X position
         * @param pointY Y position
         * @deprecated Use `getSqDistanceToPosition` instead.
         */
        getSqDistanceTo: (targetX: float, targetY: float) => float;
    }
    export {};
}
