declare namespace gdjs {
    /**
     * The renderer for a gdjs.Layer using Pixi.js.
     */
    class LayerPixiRenderer {
        private _pixiContainer;
        private _layer;
        /** For a lighting layer, the sprite used to display the render texture. */
        private _lightingSprite;
        private _isLightingLayer;
        private _clearColor;
        /**
         * The render texture where the whole 2D layer is rendered.
         * The render texture is then used for lighting (if it's a light layer)
         * or to be rendered in a 3D scene (for a 2D+3D layer).
         */
        private _renderTexture;
        private _oldWidth;
        private _oldHeight;
        private _threeGroup;
        private _threeScene;
        private _threeCamera;
        private _threeCameraDirty;
        private _threePlaneTexture;
        private _threePlaneGeometry;
        private _threePlaneMaterial;
        private _threePlaneMesh;
        /**
         * Pixi doesn't sort children with zIndex == 0.
         */
        private static readonly zeroZOrderForPixi;
        private static vectorForProjections;
        /**
         * @param layer The layer
         * @param runtimeInstanceContainerRenderer The scene renderer
         */
        constructor(layer: gdjs.RuntimeLayer, runtimeInstanceContainerRenderer: gdjs.RuntimeInstanceContainerRenderer, runtimeGameRenderer: gdjs.RuntimeGameRenderer);
        onCreated(): void;
        onGameResolutionResized(): void;
        private _update3DCameraAspectAndPosition;
        getRendererObject(): PIXI.Container;
        getThreeScene(): THREE.Scene | null;
        getThreeCamera(): THREE.PerspectiveCamera | null;
        /**
         * The sprite, displaying the "render texture" of the layer, to display
         * for a lighting layer.
         */
        getLightingSprite(): PIXI.Sprite | null;
        /**
         * Create, or re-create, Three.js objects for 3D rendering of this layer.
         */
        private _setup3DRendering;
        setThreeCameraDirty(enable: boolean): void;
        show2DRenderingPlane(enable: boolean): void;
        /**
         * Update the position of the PIXI container. To be called after each change
         * made to position, zoom or rotation of the camera.
         */
        updatePosition(): void;
        isCameraRotatedIn3D(): boolean | null;
        transformTo3DWorld(screenX: float, screenY: float, worldZ: float, cameraId: integer, result: FloatPoint): FloatPoint;
        updateVisibility(visible: boolean): void;
        updatePreRender(): void;
        /**
         * Add a child to the pixi container associated to the layer.
         * All objects which are on this layer must be children of this container.
         *
         * @param pixiChild The child (PIXI object) to be added.
         * @param zOrder The z order of the associated object.
         */
        addRendererObject(pixiChild: any, zOrder: float): void;
        /**
         * Change the z order of a child associated to an object.
         *
         * @param pixiChild The child (PIXI object) to be modified.
         * @param newZOrder The z order of the associated object.
         */
        changeRendererObjectZOrder(pixiChild: any, newZOrder: float): void;
        /**
         * Remove a child from the internal pixi container.
         * Should be called when an object is deleted or removed from the layer.
         *
         * @param child The child (PIXI object) to be removed.
         */
        removeRendererObject(child: any): void;
        has3DObjects(): boolean;
        has2DObjects(): boolean;
        add3DRendererObject(object: THREE.Object3D): void;
        remove3DRendererObject(object: THREE.Object3D): void;
        updateClearColor(): void;
        /**
         * Create the PixiJS RenderTexture used to display the whole layer.
         * Can be used either for lighting or for rendering the layer in a texture
         * so it can then be consumed by Three.js to render it in 3D.
         */
        private _createPixiRenderTexture;
        /**
         * Render the layer of the PixiJS RenderTexture, so that it can be then displayed
         * with a blend mode (for a lighting layer) or consumed by Three.js (for 2D+3D layers).
         */
        renderOnPixiRenderTexture(pixiRenderer: PIXI.Renderer): void;
        /**
         * Set the texture of the 2D plane in the 3D world to be the same WebGL texture
         * as the PixiJS RenderTexture - so that the 2D rendering can be shown in the 3D world.
         */
        updateThreePlaneTextureFromPixiRenderTexture(threeRenderer: THREE.WebGLRenderer, pixiRenderer: PIXI.Renderer): void;
        /**
         * Enable the use of a PIXI.RenderTexture to render the PIXI.Container
         * of the layer and, in the scene PIXI container, replace the container
         * of the layer by a sprite showing this texture.
         * used only in lighting for now as the sprite could have MULTIPLY blend mode.
         */
        private _setupLightingRendering;
    }
    type LayerRenderer = gdjs.LayerPixiRenderer;
    const LayerRenderer: typeof LayerPixiRenderer;
}
