declare namespace gdjs {
    /**
     * Represents a layer of a scene, used to display objects.
     */
    class Layer extends gdjs.RuntimeLayer {
        _cameraRotation: float;
        _zoomFactor: float;
        _cameraX: float;
        _cameraY: float;
        _cameraZ: float;
        /**
         * `_cameraZ` is dirty when the zoom factor is set last.
         */
        _isCameraZDirty: boolean;
        /**
         * @param layerData The data used to initialize the layer
         * @param instanceContainer The container in which the layer is used
         */
        constructor(layerData: LayerData, instanceContainer: gdjs.RuntimeInstanceContainer);
        /**
         * Called by the RuntimeScene whenever the game resolution size is changed.
         * Updates the layer width/height and position.
         */
        onGameResolutionResized(oldGameResolutionOriginX: float, oldGameResolutionOriginY: float): void;
        /**
         * Change the camera center X position.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The x position of the camera
         */
        getCameraX(cameraId?: integer): float;
        /**
         * Change the camera center Y position.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The y position of the camera
         */
        getCameraY(cameraId?: integer): float;
        /**
         * Set the camera center X position.
         *
         * @param x The new x position
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraX(x: float, cameraId?: integer): void;
        /**
         * Set the camera center Y position.
         *
         * @param y The new y position
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraY(y: float, cameraId?: integer): void;
        /**
         * Get the camera width (which can be different than the game resolution width
         * if the camera is zoomed).
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The width of the camera
         */
        getCameraWidth(cameraId?: integer): float;
        /**
         * Get the camera height (which can be different than the game resolution height
         * if the camera is zoomed).
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The height of the camera
         */
        getCameraHeight(cameraId?: integer): float;
        /**
         * Set the zoom of a camera.
         *
         * @param newZoom The new zoom. Must be superior to 0. 1 is the default zoom.
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraZoom(newZoom: float, cameraId?: integer): void;
        /**
         * Get the zoom of a camera.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The zoom.
         */
        getCameraZoom(cameraId?: integer): float;
        /**
         * Set the camera center Z position.
         *
         * @param z The new y position.
         * @param fov The field of view.
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraZ(z: float, fov?: float, cameraId?: integer): void;
        /**
         * Get the camera center Z position.
         *
         * @param fov The field of view.
         * @param cameraId The camera number. Currently ignored.
         * @return The z position of the camera
         */
        getCameraZ(fov?: float, cameraId?: integer): float;
        /**
         * Get the rotation of the camera, expressed in degrees.
         *
         * @param cameraId The camera number. Currently ignored.
         * @return The rotation, in degrees.
         */
        getCameraRotation(cameraId?: integer): float;
        /**
         * Set the rotation of the camera, expressed in degrees.
         * The rotation is made around the camera center.
         *
         * @param rotation The new rotation, in degrees.
         * @param cameraId The camera number. Currently ignored.
         */
        setCameraRotation(rotation: float, cameraId?: integer): void;
        /**
         * Convert a point from the canvas coordinates (for example,
         * the mouse position) to the container coordinates.
         *
         * This method handles 3D rotations.
         *
         * @param x The x position, in canvas coordinates.
         * @param y The y position, in canvas coordinates.
         * @param cameraId The camera number. Currently ignored.
         * @param result The point instance that is used to return the result.
         */
        convertCoords(x: float, y: float, cameraId: number | undefined, result: FloatPoint): FloatPoint;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in layer local coordinates (as opposed to the parent coordinates).
         *
         * All transformations (scale, rotation) are supported.
         *
         * This method doesn't handle 3D rotations.
         *
         * @param x The X position of the point, in parent coordinates.
         * @param y The Y position of the point, in parent coordinates.
         * @param result Array that will be updated with the result
         * @param result The point instance that is used to return the result.
         * (x and y position of the point in layer coordinates).
         */
        applyLayerInverseTransformation(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        /**
         * Convert a point from the container coordinates (for example,
         * an object position) to the canvas coordinates.
         *
         * This method doesn't handle 3D rotations.
         *
         * @param x The x position, in container coordinates.
         * @param y The y position, in container coordinates.
         * @param cameraId The camera number. Currently ignored.
         * @param result The point instance that is used to return the result.
         */
        convertInverseCoords(x: float, y: float, cameraId: number | undefined, result: FloatPoint): FloatPoint;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in parent coordinate coordinates (as opposed to the layer local coordinates).
         *
         * All transformations (scale, rotation) are supported.
         *
         * This method doesn't handle 3D rotations.
         *
         * @param x The X position of the point, in layer coordinates.
         * @param y The Y position of the point, in layer coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in parent coordinates).
         */
        applyLayerTransformation(x: float, y: float, cameraId: integer, result: FloatPoint): FloatPoint;
        /**
         * This ensure that the viewport dimensions are up to date.
         *
         * It's needed because custom objects dimensions are only updated on
         * demand for efficiency reasons.
         */
        private _forceDimensionUpdate;
    }
}
