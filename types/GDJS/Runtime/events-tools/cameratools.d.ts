declare namespace gdjs {
    namespace evtTools {
        namespace camera {
            const setCameraX: (runtimeScene: gdjs.RuntimeScene, x: float, layer: string, cameraId: integer) => void;
            const setCameraY: (runtimeScene: gdjs.RuntimeScene, y: float, layer: string, cameraId: integer) => void;
            const getCameraX: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraY: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraWidth: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraHeight: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraBorderLeft: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraBorderRight: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraBorderTop: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraBorderBottom: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const showLayer: (runtimeScene: gdjs.RuntimeScene, layer: string) => void;
            const hideLayer: (runtimeScene: gdjs.RuntimeScene, layer: string) => void;
            const layerIsVisible: (runtimeScene: gdjs.RuntimeScene, layer: string) => boolean;
            const setCameraRotation: (runtimeScene: gdjs.RuntimeScene, rotation: float, layer: string, cameraId: integer) => void;
            const getCameraRotation: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const getCameraZoom: (runtimeScene: gdjs.RuntimeScene, layer: string, cameraId: integer) => number;
            const setCameraZoom: (runtimeScene: gdjs.RuntimeScene, newZoom: float, layer: string, cameraId: integer) => void;
            const centerCamera: (runtimeScene: gdjs.RuntimeScene, object: gdjs.RuntimeObject | null, anticipateMove: boolean, layerName: string, cameraId: integer) => void;
            /**
             * @deprecated prefer using centerCamera and clampCamera.
             */
            const centerCameraWithinLimits: (runtimeScene: gdjs.RuntimeScene, object: gdjs.RuntimeObject | null, left: number, top: number, right: number, bottom: number, anticipateMove: boolean, layerName: string, cameraId: integer) => void;
            const clampCamera: (runtimeScene: gdjs.RuntimeScene, left: float, top: float, right: float, bottom: float, layerName: string, cameraId: integer) => void;
            /**
             * Update a layer effect parameter (with a number).
             * @param runtimeScene The scene
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param parameter The parameter to update
             * @param value The new value
             */
            const setLayerEffectDoubleParameter: (runtimeScene: gdjs.RuntimeScene, layer: string, effect: string, parameter: string, value: float) => void;
            /**
             * Update a layer effect parameter (with a string).
             * @param runtimeScene The scene
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param parameter The parameter to update
             * @param value The new value
             */
            const setLayerEffectStringParameter: (runtimeScene: gdjs.RuntimeScene, layer: string, effect: string, parameter: string, value: string) => void;
            /**
             * Enable or disable a layer effect parameter (boolean).
             * @param runtimeScene The scene
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param parameter The parameter to update
             * @param value The new value
             */
            const setLayerEffectBooleanParameter: (runtimeScene: gdjs.RuntimeScene, layer: string, effect: string, parameter: string, value: boolean) => void;
            /**
             * Enable, or disable, an effect of a layer.
             * @param runtimeScene The scene
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @param enabled true to enable, false to disable.
             */
            const enableLayerEffect: (runtimeScene: gdjs.RuntimeScene, layer: string, effect: string, enabled: boolean) => void;
            /**
             * Check if an effect is enabled.
             * @param runtimeScene The scene
             * @param layer The name of the layer
             * @param effect The name of the effect
             * @return true if the effect is enabled, false otherwise.
             */
            const layerEffectEnabled: (runtimeScene: gdjs.RuntimeScene, layer: string, effect: string) => boolean;
            const setLayerTimeScale: (runtimeScene: gdjs.RuntimeScene, layer: string, timeScale: float) => void;
            const getLayerTimeScale: (runtimeScene: gdjs.RuntimeScene, layer: string) => number;
            const setLayerDefaultZOrder: (runtimeScene: gdjs.RuntimeScene, layer: string, defaultZOrder: integer) => void;
            const getLayerDefaultZOrder: (runtimeScene: gdjs.RuntimeScene, layer: string) => number;
            /**
             * @param layerName The lighting layer with the ambient color.
             * @param rgbColor The color, in RGB format ("128;200;255").
             */
            const setLayerAmbientLightColor: (runtimeScene: gdjs.RuntimeScene, layerName: string, rgbColor: string) => void;
        }
    }
}
