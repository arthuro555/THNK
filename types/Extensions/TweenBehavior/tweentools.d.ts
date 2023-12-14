declare namespace gdjs {
    interface RuntimeScene {
        _tweens: gdjs.evtTools.tween.TweenManager;
    }
    namespace evtTools {
        namespace tween {
            const getTweensMap: (runtimeScene: RuntimeScene) => TweenManager;
            const sceneTweenExists: (runtimeScene: RuntimeScene, id: string) => boolean;
            const sceneTweenIsPlaying: (runtimeScene: RuntimeScene, id: string) => boolean;
            const sceneTweenHasFinished: (runtimeScene: RuntimeScene, id: string) => boolean;
            const resumeSceneTween: (runtimeScene: RuntimeScene, id: string) => void;
            const pauseSceneTween: (runtimeScene: RuntimeScene, id: string) => void;
            const stopSceneTween: (runtimeScene: RuntimeScene, id: string, shouldGoToEnd: boolean) => void;
            const removeSceneTween: (runtimeScene: RuntimeScene, id: string) => void;
            /**
             * Get tween progress.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @returns Progress of playing tween animation (between 0.0 and 1.0)
             */
            const getProgress: (runtimeScene: RuntimeScene, identifier: string) => float;
            /**
             * Get tween value.
             *
             * It returns 0 for tweens with several values.
             *
             * @param identifier Unique id to identify the tween
             * @returns Value of playing tween animation
             */
            const getValue: (runtimeScene: RuntimeScene, identifier: string) => float;
            /**
             * Add a layout value tween.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param fromValue Start value
             * @param toValue End value
             * @param easing Easing function identifier
             * @param duration Duration in seconds
             * @param useExponentialInterpolation Set it to true to use a exponential
             * It's useful for values that are factors like a scale or a zoom.
             */
            const addLayoutValueTween: (runtimeScene: RuntimeScene, identifier: string, fromValue: float, toValue: float, easing: string, duration: float, useExponentialInterpolation: boolean) => void;
            /**
             * Add a layer value tween. The layer time scale is taken into account.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param fromValue Start value
             * @param toValue End value
             * @param easing Easing function identifier
             * @param duration Duration in seconds
             * @param useExponentialInterpolation Set it to true to use a exponential
             * It's useful for values that are factors like a scale or a zoom.
             * @param layerName The name of layer
             */
            const addLayerValueTween: (runtimeScene: RuntimeScene, identifier: string, fromValue: float, toValue: float, easing: string, duration: float, useExponentialInterpolation: boolean, layerName: string) => void;
            /**
             * @deprecated Use tweenVariableNumber3 instead.
             * This function is misleading since one could think that the tween starts
             * right at the moment this function is called whereas the value of the variable
             * will change at the next frame only. Moreover, the variable will not start from
             * the start value exactly since time will have passed at the moment the next
             * frame is rendered.
             * See https://github.com/4ian/GDevelop/issues/4270
             */
            const tweenVariableNumber: (runtimeScene: RuntimeScene, identifier: string, variable: Variable, from: number, to: number, duration: number, easing: string) => void;
            /**
             * @deprecated Use tweenVariableNumber3 instead.
             */
            const tweenVariableNumber2: (runtimeScene: RuntimeScene, identifier: string, variable: Variable, toValue: number, duration: number, easing: string) => void;
            /**
             * Tween a scene variable.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param variable The scene variable which is set to the tweened value
             * @param toValue End value
             * @param easing Easing function identifier
             * @param duration Duration in seconds
             */
            const tweenVariableNumber3: (runtimeScene: RuntimeScene, identifier: string, variable: Variable, toValue: number, easing: string, duration: number) => void;
            /**
             * @deprecated Use tweenCamera2 instead.
             */
            const tweenCamera: (runtimeScene: RuntimeScene, identifier: string, toX: number, toY: number, layerName: string, duration: number, easing: string) => void;
            /**
             * Tween a layer camera position.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param toX The targeted position on X axis
             * @param toY The targeted position on Y axis
             * @param layerName The name of the layer to move
             * @param duration Duration in seconds
             * @param easing Easing function identifier
             */
            const tweenCamera2: (runtimeScene: RuntimeScene, identifier: string, toX: number, toY: number, layerName: string, easing: string, duration: number) => void;
            /**
             * @deprecated Use tweenCameraZoom2 instead.
             */
            const tweenCameraZoom: (runtimeScene: RuntimeScene, identifier: string, toZoom: number, layerName: string, duration: number, easing: string) => void;
            /**
             * Tween a layer camera zoom factor.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param toZoom The targeted zoom factor
             * @param layerName The name of the layer to zoom
             * @param duration Duration in seconds
             * @param easing Easing function identifier
             */
            const tweenCameraZoom2: (runtimeScene: RuntimeScene, identifier: string, toZoom: number, layerName: string, easing: string, duration: number) => void;
            const tweenCameraRotation: (runtimeScene: RuntimeScene, identifier: string, toRotation: number, layerName: string, duration: number, easing: string) => void;
            /**
             * Tween a layer camera rotation angle.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param toRotation The targeted angle in degrees
             * @param layerName The name of the layer to rotate
             * @param duration Duration in seconds
             * @param easing Easing function identifier
             */
            const tweenCameraRotation2: (runtimeScene: RuntimeScene, identifier: string, toRotation: number, layerName: string, easing: string, duration: number) => void;
            /**
             * Tween a numeric object effect property.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param toValue The targeted value
             * @param layerName Layer name
             * @param effectName Effect name
             * @param propertyName Property name
             * @param easing Easing function identifier
             * @param duration Duration in seconds
             */
            const tweenNumberEffectPropertyTween: (runtimeScene: RuntimeScene, identifier: string, toValue: float, layerName: string, effectName: string, propertyName: string, easing: string, duration: float) => void;
            /**
             * Tween a color object effect property.
             * @param runtimeScene The scene
             * @param identifier Unique id to identify the tween
             * @param toColorStr The target RGB color (format "128;200;255" with values between 0 and 255 for red, green and blue)
             * @param layerName Layer name
             * @param effectName Effect name
             * @param propertyName Property name
             * @param easing Easing function identifier
             * @param duration Duration in seconds
             */
            const tweenColorEffectPropertyTween: (runtimeScene: RuntimeScene, identifier: string, toColorStr: string, layerName: string, effectName: string, propertyName: string, easing: string, duration: float) => void;
        }
    }
}
