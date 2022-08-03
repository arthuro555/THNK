declare namespace gdjs {
    /**
     * The renderer for a gdjs.Layer using Pixi.js.
     */
    class LayerPixiRenderer {
        _pixiContainer: PIXI.Container;
        _layer: gdjs.Layer;
        _renderTexture: PIXI.RenderTexture | null;
        _lightingSprite: PIXI.Sprite | null;
        _runtimeSceneRenderer: any;
        _pixiRenderer: PIXI.Renderer | null;
        _oldWidth: float | null;
        _oldHeight: float | null;
        _isLightingLayer: boolean;
        _clearColor: Array<integer>;
        /**
         * @param layer The layer
         * @param runtimeSceneRenderer The scene renderer
         */
        constructor(layer: gdjs.Layer, runtimeSceneRenderer: gdjs.RuntimeScenePixiRenderer);
        getRendererObject(): PIXI.Container;
        getLightingSprite(): PIXI.Sprite | null;
        /**
         * Update the position of the PIXI container. To be called after each change
         * made to position, zoom or rotation of the camera.
         */
        updatePosition(): void;
        updateVisibility(visible: boolean): void;
        updatePreRender(): void;
        /**
         * Add a child to the pixi container associated to the layer.
         * All objects which are on this layer must be children of this container.
         *
         * @param child The child (PIXI object) to be added.
         * @param zOrder The z order of the associated object.
         */
        addRendererObject(child: any, zOrder: integer): void;
        /**
         * Change the z order of a child associated to an object.
         *
         * @param child The child (PIXI object) to be modified.
         * @param newZOrder The z order of the associated object.
         */
        changeRendererObjectZOrder(child: any, newZOrder: integer): void;
        /**
         * Remove a child from the internal pixi container.
         * Should be called when an object is deleted or removed from the layer.
         *
         * @param child The child (PIXI object) to be removed.
         */
        removeRendererObject(child: any): void;
        updateClearColor(): void;
        /**
         * Updates the render texture, if it exists.
         * Also, render texture is cleared with a specified clear color.
         */
        _updateRenderTexture(): void;
        /**
         * Enable the use of a PIXI.RenderTexture to render the PIXI.Container
         * of the layer and, in the scene PIXI container, replace the container
         * of the layer by a sprite showing this texture.
         * used only in lighting for now as the sprite could have MULTIPLY blend mode.
         */
        private _replaceContainerWithSprite;
    }
    type LayerRenderer = gdjs.LayerPixiRenderer;
    const LayerRenderer: typeof LayerPixiRenderer;
}
