declare namespace gdjs {
    class Cube3DRuntimeObjectPixiRenderer extends gdjs.RuntimeObject3DRenderer {
        private _cube3DRuntimeObject;
        private _boxMesh;
        constructor(runtimeObject: gdjs.Cube3DRuntimeObject, instanceContainer: gdjs.RuntimeInstanceContainer);
        updateFace(faceIndex: integer): void;
        updateSize(): void;
        /**
         * Updates the UV mapping of the geometry in order to repeat a material
         * over the different faces of the cube.
         * The mesh must be configured with a list of materials in order
         * for the method to work.
         * @param faceIndex The face index to update. If undefined, updates all the faces.
         */
        updateTextureUvMapping(faceIndex?: number): void;
        _updateMaterials(): void;
    }
    export const Cube3DRuntimeObjectRenderer: typeof Cube3DRuntimeObjectPixiRenderer;
    export type Cube3DRuntimeObjectRenderer = Cube3DRuntimeObjectPixiRenderer;
    export {};
}
