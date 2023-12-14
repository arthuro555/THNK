declare namespace gdjs {
    /**
     * A render for instance container.
     *
     * @see gdjs.RuntimeInstanceContainer
     */
    interface RuntimeInstanceContainerPixiRenderer {
        /**
         * Change the position of a layer.
         *
         * @param layer The layer to reorder
         * @param index The new position in the list of layers
         *
         * @see gdjs.RuntimeInstanceContainer.setLayerIndex
         */
        setLayerIndex(layer: gdjs.RuntimeLayer, index: integer): void;
        getRendererObject(): PIXI.Container;
        get3DRendererObject(): THREE.Object3D | null;
    }
    type RuntimeInstanceContainerRenderer = gdjs.RuntimeInstanceContainerPixiRenderer;
}
