declare namespace gdjs {
    /**
     * Pixi renderer for light runtime objects.
     */
    class LightRuntimeObjectPixiRenderer {
        _object: gdjs.LightRuntimeObject;
        _runtimeScene: gdjs.RuntimeScene;
        _manager: gdjs.LightObstaclesManager;
        _radius: number;
        _color: [number, number, number];
        _texture: PIXI.Texture | null;
        _center: Float32Array;
        _defaultVertexBuffer: Float32Array;
        _vertexBuffer: Float32Array;
        _indexBuffer: Uint16Array;
        _light: PIXI.Mesh<PIXI.Shader> | null;
        _isPreview: boolean;
        _debugMode: boolean;
        _debugLight: PIXI.Container | null;
        _debugGraphics: PIXI.Graphics | null;
        /**
         * A polygon updated when vertices of the light are computed
         * to be a polygon bounding the light and its obstacles.
         */
        _lightBoundingPoly: gdjs.Polygon;
        constructor(runtimeObject: gdjs.LightRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        static _verticesWithAngleComparator(vertexWithAngleA: any, vertexWithAngleB: any): 1 | 0 | -1;
        static _computeClosestIntersectionPoint(lightObject: gdjs.LightRuntimeObject, angle: float, polygons: Array<gdjs.Polygon>, boundingSquareHalfDiag: float): (number | null)[] | null;
        getRendererObject(): PIXI.Mesh | null | PIXI.Container;
        ensureUpToDate(): void;
        updateMesh(): void;
        updateRadius(): void;
        updateColor(): void;
        updateTexture(): void;
        updateDebugMode(): void;
        _updateDebugGraphics(): void;
        _updateBuffers(): void;
        /**
         * Computes the vertices of mesh using raycasting.
         * @returns the vertices of mesh.
         */
        _computeLightVertices(): Array<FloatPoint>;
        static _defaultIndexBuffer: Uint16Array;
        static defaultVertexShader: string;
        static defaultFragmentShader: string;
        static texturedFragmentShader: string;
    }
    const LightRuntimeObjectRenderer: typeof LightRuntimeObjectPixiRenderer;
    type LightRuntimeObjectRenderer = LightRuntimeObjectPixiRenderer;
}
