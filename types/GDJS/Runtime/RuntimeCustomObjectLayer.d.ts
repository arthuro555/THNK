declare namespace gdjs {
    /**
     * Represents a layer of a custom object. It doesn't allow to move any camera
     * because it doesn't make sense inside an object.
     */
    class RuntimeCustomObjectLayer extends gdjs.RuntimeLayer {
        /**
         * @param layerData The data used to initialize the layer
         * @param instanceContainer The container in which the layer is used
         */
        constructor(layerData: LayerData, instanceContainer: gdjs.RuntimeInstanceContainer);
        onGameResolutionResized(oldGameResolutionOriginX: float, oldGameResolutionOriginY: float): void;
        getCameraX(cameraId?: integer): float;
        getCameraY(cameraId?: integer): float;
        setCameraX(x: float, cameraId?: integer): void;
        setCameraY(y: float, cameraId?: integer): void;
        getCameraWidth(cameraId?: integer): float;
        getCameraHeight(cameraId?: integer): float;
        setCameraZoom(newZoom: float, cameraId?: integer): void;
        getCameraZoom(cameraId?: integer): float;
        setCameraZ(z: float, fov: float, cameraId?: integer): void;
        getCameraZ(fov?: float, cameraId?: integer): float;
        getCameraRotation(cameraId?: integer): float;
        setCameraRotation(rotation: float, cameraId?: integer): void;
        convertCoords(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        convertInverseCoords(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        applyLayerInverseTransformation(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        applyLayerTransformation(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
    }
}
