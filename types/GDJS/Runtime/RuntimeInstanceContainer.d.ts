declare namespace gdjs {
    /**
     * A container of object instances rendered on screen.
     */
    abstract class RuntimeInstanceContainer {
        _initialBehaviorSharedData: Hashtable<BehaviorSharedData | null>;
        /** Contains the instances living on the container */
        _instances: Hashtable<RuntimeObject[]>;
        /**
         * An array used to create a list of all instance when necessary.
         * @see gdjs.RuntimeInstanceContainer#_constructListOfAllInstances}
         */
        private _allInstancesList;
        _allInstancesListIsUpToDate: boolean;
        /** Used to recycle destroyed instance instead of creating new ones. */
        _instancesCache: Hashtable<RuntimeObject[]>;
        /** The instances removed from the container and waiting to be sent to the cache. */
        _instancesRemoved: gdjs.RuntimeObject[];
        /** Contains the objects data stored in the project */
        _objects: Hashtable<ObjectData>;
        _objectsCtor: Hashtable<typeof RuntimeObject>;
        _layers: Hashtable<RuntimeLayer>;
        _orderedLayers: RuntimeLayer[];
        _layersCameraCoordinates: Record<string, [float, float, float, float]>;
        _debugDrawEnabled: boolean;
        _debugDrawShowHiddenInstances: boolean;
        _debugDrawShowPointsNames: boolean;
        _debugDrawShowCustomPoints: boolean;
        constructor();
        /**
         * Return the time elapsed since the last frame,
         * in milliseconds, for objects on the layer.
         */
        abstract getElapsedTime(): float;
        /**
         * Get the renderer associated to the container.
         */
        abstract getRenderer(): gdjs.RuntimeInstanceContainerRenderer;
        /**
         * Get the renderer for visual debugging associated to the container.
         */
        abstract getDebuggerRenderer(): gdjs.DebuggerRenderer;
        /**
         * Get the {@link gdjs.RuntimeGame} associated to this.
         */
        abstract getGame(): gdjs.RuntimeGame;
        /**
         * Get the {@link gdjs.RuntimeScene} associated to this.
         */
        abstract getScene(): gdjs.RuntimeScene;
        /**
         * Convert a point from the canvas coordinates (for example,
         * the mouse position) to the container coordinates.
         *
         * @param x The x position, in container coordinates.
         * @param y The y position, in container coordinates.
         * @param result The point instance that is used to return the result.
         */
        abstract convertCoords(x: float, y: float, result?: FloatPoint): FloatPoint;
        /**
         * Convert a point from the container coordinates (for example,
         * an object position) to the canvas coordinates.
         *
         * @param sceneX The x position, in container coordinates.
         * @param sceneY The y position, in container coordinates.
         * @param result The point instance that is used to return the result.
         */
        abstract convertInverseCoords(sceneX: float, sceneY: float, result: FloatPoint): FloatPoint;
        /**
         * @return the width of:
         * - the game resolution for a {@link gdjs.RuntimeScene}
         * - the default dimensions (the AABB of all its children) for a
         * {@link gdjs.CustomRuntimeObject}.
         */
        abstract getViewportWidth(): float;
        /**
         * @return the height of:
         * - the game resolution for a {@link gdjs.RuntimeScene}
         * - the default dimensions (the AABB of all its children) for a
         * {@link gdjs.CustomRuntimeObject}.
         */
        abstract getViewportHeight(): float;
        /**
         * @return the center X of:
         * - the game resolution for a {@link gdjs.RuntimeScene}
         * - the default dimensions (the AABB of all its children) for a
         * {@link gdjs.CustomRuntimeObject}.
         */
        abstract getViewportOriginX(): float;
        /**
         * @return the center Y of:
         * - the game resolution for a {@link gdjs.RuntimeScene}
         * - the default dimensions (the AABB of all its children) for a
         * {@link gdjs.CustomRuntimeObject}.
         */
        abstract getViewportOriginY(): float;
        /**
         * Triggered when the AABB of a child of the container could have changed.
         */
        abstract onChildrenLocationChanged(): void;
        /**
         * Activate or deactivate the debug visualization for collisions and points.
         */
        enableDebugDraw(enableDebugDraw: boolean, showHiddenInstances: boolean, showPointsNames: boolean, showCustomPoints: boolean): void;
        /**
         * Check if an object is registered, meaning that instances of it can be
         * created and lives in the container.
         * @see gdjs.RuntimeInstanceContainer#registerObject
         */
        isObjectRegistered(objectName: string): boolean;
        /**
         * Register a {@link gdjs.RuntimeObject} so that instances of it can be
         * used in the container.
         * @param objectData The data for the object to register.
         */
        registerObject(objectData: ObjectData): void;
        /**
         * Update the data of a {@link gdjs.RuntimeObject} so that instances use
         * this when constructed.
         * @param objectData The data for the object to register.
         */
        updateObject(objectData: ObjectData): void;
        /**
         * Unregister a {@link gdjs.RuntimeObject}. Instances will be destroyed.
         * @param objectName The name of the object to unregister.
         */
        unregisterObject(objectName: string): void;
        /**
         * Create objects from initial instances data (for example, the initial instances
         * of the scene or the instances of an external layout).
         *
         * @param data The instances data
         * @param xPos The offset on X axis
         * @param yPos The offset on Y axis
         * @param zPos The offset on Z axis
         * @param trackByPersistentUuid If true, objects are tracked by setting their `persistentUuid`
         * to the same as the associated instance. Useful for hot-reloading when instances are changed.
         */
        createObjectsFrom(data: InstanceData[], xPos: float, yPos: float, zPos: float, trackByPersistentUuid: boolean): void;
        /**
         * Get the data representing the initial shared data of the scene for the specified behavior.
         * @param name The name of the behavior
         * @returns The shared data for the behavior, if any.
         */
        getInitialSharedDataForBehavior(name: string): BehaviorSharedData | null;
        /**
         * Set the data representing the initial shared data of the scene for the specified behavior.
         * @param name The name of the behavior
         * @param sharedData The shared data for the behavior, or null to remove it.
         */
        setInitialSharedDataForBehavior(name: string, sharedData: BehaviorSharedData | null): void;
        /**
         * Set the default Z order for each layer, which is the highest Z order found on each layer.
         * Useful as it ensures that instances created from events are, by default, shown in front
         * of other instances.
         */
        _setLayerDefaultZOrders(): void;
        _updateLayersCameraCoordinates(scale: float): void;
        /**
         * Called to update effects of layers before rendering.
         */
        _updateLayersPreRender(): void;
        /**
         * Called to update visibility of the renderers of objects
         * rendered on the scene ("culling"), update effects (of visible objects)
         * and give a last chance for objects to update before rendering.
         *
         * Visibility is set to false if object is hidden, or if
         * object is too far from the camera of its layer ("culling").
         */
        _updateObjectsPreRender(): void;
        /**
         * Empty the list of the removed objects:
         *
         * When an object is removed from the container, it is still kept in
         * {@link gdjs.RuntimeInstanceContainer#_instancesRemoved}.
         *
         * This method should be called regularly (after events or behaviors steps) so as to clear this list
         * and allows the removed objects to be cached (or destroyed if the cache is full).
         *
         * The removed objects could not be sent directly to the cache, as events may still be using them after
         * removing them from the scene for example.
         */
        _cacheOrClearRemovedInstances(): void;
        /**
         * Tool function filling _allInstancesList member with all the living object instances.
         */
        private _constructListOfAllInstances;
        /**
         * @param objectName The name of the object
         * @returns the instances of a given object in the container.
         */
        getInstancesOf(objectName: string): gdjs.RuntimeObject[];
        /**
         * Get a list of all {@link gdjs.RuntimeObject} living in the container.
         * You should not, normally, need this method at all. It's only to be used
         * in exceptional use cases where you need to loop through all objects,
         * and it won't be performant.
         *
         * @returns The list of all runtime objects in the container
         */
        getAdhocListOfAllInstances(): gdjs.RuntimeObject[];
        /**
         * Update the objects before launching the events.
         */
        _updateObjectsPreEvents(): void;
        /**
         * Update the objects (update positions, time management...)
         */
        _updateObjectsPostEvents(): void;
        /**
         * Add an object to the instances living in the container.
         * @param obj The object to be added.
         */
        addObject(obj: gdjs.RuntimeObject): void;
        /**
         * Get all the instances of the object called name.
         * @param name Name of the object for which the instances must be returned.
         * @return The list of objects with the given name
         */
        getObjects(name: string): gdjs.RuntimeObject[] | undefined;
        /**
         * Create a new object from its name. The object is also added to the instances
         * living in the container (No need to call {@link gdjs.RuntimeScene.addObject})
         * @param objectName The name of the object to be created
         * @return The created object
         */
        createObject(objectName: string): gdjs.RuntimeObject | null;
        /**
         * Must be called whenever an object must be removed from the container.
         * @param obj The object to be removed.
         */
        markObjectForDeletion(obj: gdjs.RuntimeObject): void;
        /**
         * Get the layer with the given name
         * @param name The name of the layer
         * @returns The layer, or the base layer if not found
         */
        getLayer(name: string): gdjs.RuntimeLayer;
        /**
         * Check if a layer exists
         * @param name The name of the layer
         */
        hasLayer(name: string): boolean;
        /**
         * Add a layer.
         * @param layerData The data to construct the layer
         */
        abstract addLayer(layerData: LayerData): any;
        /**
         * Remove a layer. All {@link gdjs.RuntimeObject} on this layer will
         * be moved back to the base layer.
         * @param layerName The name of the layer to remove
         */
        removeLayer(layerName: string): void;
        /**
         * Change the position of a layer.
         *
         * @param layerName The name of the layer to reorder
         * @param index The new position in the list of layers
         */
        setLayerIndex(layerName: string, newIndex: integer): void;
        /**
         * Fill the array passed as argument with the names of all layers
         * @param result The array where to put the layer names
         */
        getAllLayerNames(result: string[]): void;
        /**
         * Return the number of instances of the specified object living in the container.
         * @param objectName The object name for which instances must be counted.
         */
        getInstancesCountOnScene(objectName: string): integer;
        /**
         * Update the objects positions according to their forces
         */
        updateObjectsForces(): void;
        /**
         * Clear any data structures to make sure memory is freed as soon as
         * possible.
         */
        _destroy(): void;
    }
}
