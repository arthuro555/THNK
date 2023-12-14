declare namespace gdjs {
    namespace evtTools {
        namespace camera {
            const setCameraX: (instanceContainer: gdjs.RuntimeInstanceContainer, x: float, layer: string, cameraId: integer) => void;
            const setCameraY: (instanceContainer: gdjs.RuntimeInstanceContainer, y: float, layer: string, cameraId: integer) => void;
            const getCameraX: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraY: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraWidth: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraHeight: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraBorderLeft: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraBorderRight: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraBorderTop: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraBorderBottom: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const showLayer: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string) => void;
            const hideLayer: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string) => void;
            const layerIsVisible: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string) => boolean;
            const setCameraRotation: (instanceContainer: gdjs.RuntimeInstanceContainer, rotation: float, layer: string, cameraId: integer) => void;
            const getCameraRotation: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const getCameraZoom: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, cameraId: integer) => number;
            const setCameraZoom: (instanceContainer: gdjs.RuntimeInstanceContainer, newZoom: float, layer: string, cameraId: integer) => void;
            const centerCamera: (instanceContainer: gdjs.RuntimeInstanceContainer, object: gdjs.RuntimeObject | null, anticipateMove: boolean, layerName: string, cameraId: integer) => void;
            /**
             * @deprecated prefer using centerCamera and clampCamera.
             */
            const centerCameraWithinLimits: (instanceContainer: gdjs.RuntimeInstanceContainer, object: gdjs.RuntimeObject | null, left: number, top: number, right: number, bottom: number, anticipateMove: boolean, layerName: string, cameraId: integer) => void;
            const clampCamera: (instanceContainer: gdjs.RuntimeInstanceContainer, left: float, top: float, right: float, bottom: float, layerName: string, cameraId: integer) => void;
            /**
             * Update a layer effect property (with a number).
             * @param instanceContainer the container owning the layer
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param parameter The property to update
             * @param value The new value
             */
            const setLayerEffectDoubleParameter: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, effect: string, parameter: string, value: float) => void;
            /**
             * Update a layer effect property (with a string).
             * @param instanceContainer the container owning the layer
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param parameter The property to update
             * @param value The new value
             */
            const setLayerEffectStringParameter: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, effect: string, parameter: string, value: string) => void;
            /**
             * Enable or disable a layer effect property (boolean).
             * @param instanceContainer the container owning the layer
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param parameter The property to update
             * @param value The new value
             */
            const setLayerEffectBooleanParameter: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, effect: string, parameter: string, value: boolean) => void;
            /**
             * Enable, or disable, an effect of a layer.
             * @param instanceContainer the container owning the layer
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param enabled true to enable, false to disable.
             */
            const enableLayerEffect: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, effect: string, enabled: boolean) => void;
            /**
             * Check if an effect is enabled.
             * @param instanceContainer the container owning the layer
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @return true if the effect is enabled, false otherwise.
             */
            const layerEffectEnabled: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, effect: string) => boolean;
            const setLayerTimeScale: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, timeScale: float) => void;
            const getLayerTimeScale: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string) => number;
            const setLayerDefaultZOrder: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, defaultZOrder: integer) => void;
            const getLayerDefaultZOrder: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string) => number;
            /**
             * @param instanceContainer the container owning the layer
             * @param layerName The lighting layer with the ambient color.
             * @param rgbColor The color, in RGB format ("128;200;255").
             */
            const setLayerAmbientLightColor: (instanceContainer: gdjs.RuntimeInstanceContainer, layerName: string, rgbColor: string) => void;
        }
    }
}
