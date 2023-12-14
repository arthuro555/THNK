declare namespace gdjs {
    /**
     * The instance container of a custom object, containing instances of objects rendered on screen.
     *
     * @see gdjs.CustomRuntimeObject
     */
    class CustomRuntimeObjectInstanceContainer extends gdjs.RuntimeInstanceContainer {
        _renderer: gdjs.CustomObjectRenderer;
        _debuggerRenderer: gdjs.DebuggerRenderer;
        _runtimeScene: gdjs.RuntimeScene;
        /** The parent container that contains the object associated with this container. */
        _parent: gdjs.RuntimeInstanceContainer;
        /** The object that is built with the instances of this container. */
        _customObject: gdjs.CustomRuntimeObject;
        _isLoaded: boolean;
        /**
         * @param parent the parent container that contains the object associated
         * with this container.
         * @param customObject the object that is built with the instances of this
         * container.
         */
        constructor(parent: gdjs.RuntimeInstanceContainer, customObject: gdjs.CustomRuntimeObject);
        addLayer(layerData: LayerData): void;
        createObject(objectName: string): gdjs.RuntimeObject | null;
        /**
         * Load the container from the given initial configuration.
         * @param customObjectData An object containing the container data.
         * @see gdjs.RuntimeGame#getSceneData
         */
        loadFrom(customObjectData: ObjectData & CustomObjectConfiguration): void;
        /**
         * Called when the container must be updated using the specified
         * objectData. This is the case during hot-reload, and is only called if
         * the object was modified.
         *
         * @param oldCustomObjectData The previous data for the object.
         * @param newCustomObjectData The new data for the object.
         * @returns true if the object was updated, false if it could not
         * (i.e: hot-reload is not supported).
         */
        updateFrom(oldCustomObjectData: ObjectData & CustomObjectConfiguration, newCustomObjectData: ObjectData & CustomObjectConfiguration): boolean;
        /**
         * Called when the associated object is destroyed (because it is removed
         * from its parent container or the scene is being unloaded).
         *
         * @param instanceContainer The container owning the object.
         */
        onDestroyFromScene(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        _destroy(): void;
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
         * Update the objects before launching the events.
         */
        _updateObjectsPreEvents(): void;
        /**
         * Get the renderer associated to the RuntimeScene.
         */
        getRenderer(): gdjs.CustomObjectRenderer;
        getDebuggerRenderer(): DebuggerPixiRenderer;
        getGame(): RuntimeGame;
        getScene(): RuntimeScene;
        getViewportWidth(): float;
        getViewportHeight(): float;
        getViewportOriginX(): float;
        getViewportOriginY(): float;
        onChildrenLocationChanged(): void;
        convertCoords(x: float, y: float, result: FloatPoint): FloatPoint;
        convertInverseCoords(sceneX: float, sceneY: float, result: FloatPoint): FloatPoint;
        /**
         * Return the time elapsed since the last frame,
         * in milliseconds, for objects on the layer.
         */
        getElapsedTime(): float;
    }
}
