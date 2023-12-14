declare namespace gdjs {
    class TweenRuntimeBehavior extends gdjs.RuntimeBehavior {
        private _tweens;
        private _isActive;
        /**
         * @param instanceContainer The instance container the behavior belongs to.
         * @param behaviorData The data to initialize the behavior
         * @param owner The runtime object the behavior belongs to.
         */
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: BehaviorData, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: BehaviorData, newBehaviorData: BehaviorData): boolean;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        private _deleteFromScene;
        /**
         * Add an object variable tween.
         * @deprecated Use addVariableTween3 instead.
         * This function is misleading since one could think that the tween starts
         * right at the moment this function is called whereas the value of the variable
         * will change at the next frame only. Moreover, the variable will not start from
         * the start value exactly since time will have passed at the moment the next
         * frame is rendered.
         * See https://github.com/4ian/GDevelop/issues/4270
         * @param identifier Unique id to identify the tween
         * @param variable The object variable to store the tweened value
         * @param fromValue Start value
         * @param toValue End value
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addVariableTween(identifier: string, variable: gdjs.Variable, fromValue: float, toValue: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object variable.
         * @deprecated Use addVariableTween3 instead.
         * @param identifier Unique id to identify the tween
         * @param variable The object variable to store the tweened value
         * @param toValue End value
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addVariableTween2(identifier: string, variable: gdjs.Variable, toValue: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object variable.
         * @param identifier Unique id to identify the tween
         * @param variable The object variable to store the tweened value
         * @param toValue End value
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addVariableTween3(identifier: string, variable: gdjs.Variable, toValue: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addVariableTween;
        /**
         * Add an object value tween.
         * @param identifier Unique id to identify the tween
         * @param fromValue Start value
         * @param toValue End value
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param useExponentialInterpolation Set it to true to use a exponential
         * It's useful for values that are factors like a scale or a zoom.
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addValueTween(identifier: string, fromValue: float, toValue: float, easing: string, duration: float, useExponentialInterpolation: boolean, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object position.
         * @deprecated Use addObjectPositionTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toX The target X position
         * @param toY The target Y position
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionTween(identifier: string, toX: number, toY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object position.
         * @param identifier Unique id to identify the tween
         * @param toX The target X position
         * @param toY The target Y position
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionTween2(identifier: string, toX: number, toY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectPositionTween;
        /**
         * Tween an object X position.
         * @deprecated Use addObjectPositionXTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toX The target X position
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionXTween(identifier: string, toX: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object X position.
         * @param identifier Unique id to identify the tween
         * @param toX The target X position
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionXTween2(identifier: string, toX: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectPositionXTween;
        /**
         * Tween an object Y position.
         * @deprecated Use addObjectPositionYTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toY The target Y position
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionYTween(identifier: string, toY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object Y position.
         * @param identifier Unique id to identify the tween
         * @param toY The target Y position
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionYTween2(identifier: string, toY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectPositionYTween;
        /**
         * Tween an object Z position.
         * @deprecated Use the 3D Tween extension instead.
         * @param identifier Unique id to identify the tween
         * @param toZ The target Z position
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionZTween(identifier: string, toZ: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object angle.
         * @deprecated Use addObjectAngleTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toAngle The target angle
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectAngleTween(identifier: string, toAngle: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object angle.
         * @param identifier Unique id to identify the tween
         * @param toAngle The target angle
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectAngleTween2(identifier: string, toAngle: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectAngleTween;
        /**
         * Tween an object scale.
         * @deprecated Use addObjectScaleTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toScaleX The target X-scale
         * @param toScaleY The target Y-scale
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleTween(identifier: string, toScaleX: number, toScaleY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        /**
         * Tween an object scale.
         * @param identifier Unique id to identify the tween
         * @param toScaleX The target X-scale
         * @param toScaleY The target Y-scale
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleTween2(identifier: string, toScaleX: number, toScaleY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        private _addObjectScaleTween;
        /**
         * Tween an object X-scale.
         * @deprecated Use addObjectScaleXTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toScaleX The target X-scale
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleXTween(identifier: string, toScaleX: number, easing: string, duration: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        /**
         * Tween an object X-scale.
         * @param identifier Unique id to identify the tween
         * @param toScaleX The target X-scale
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleXTween2(identifier: string, toScaleX: number, easing: string, duration: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        private _addObjectScaleXTween;
        /**
         * Tween an object Y-scale.
         * @deprecated Use addObjectScaleYTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toScaleY The target Y-scale
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleYTween(identifier: string, toScaleY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        /**
         * Tween an object Y-scale.
         * @param identifier Unique id to identify the tween
         * @param toScaleY The target Y-scale
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleYTween2(identifier: string, toScaleY: number, easing: string, duration: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        private _addObjectScaleYTween;
        /**
         * Tween an object opacity.
         * @deprecated Use addObjectOpacityTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toOpacity The target opacity
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectOpacityTween(identifier: string, toOpacity: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object opacity.
         * @param identifier Unique id to identify the tween
         * @param toOpacity The target opacity
         * @param easing Easing function identifier
         * @param duration Duration in second
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectOpacityTween2(identifier: string, toOpacity: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectOpacityTween;
        /**
         * Tween a numeric object effect property.
         * @param effectBehavior Only used by events can be set to null
         * @param identifier Unique id to identify the tween
         * @param toValue The targeted value
         * @param effectName Effect name
         * @param propertyName Property name
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addNumberEffectPropertyTween(effectBehavior: any, identifier: string, toValue: float, effectName: string, propertyName: string, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween a color object effect property.
         * @param effectBehavior Only used by events can be set to null
         * @param identifier Unique id to identify the tween
         * @param toColorStr The target RGB color (format "128;200;255" with values between 0 and 255 for red, green and blue)
         * @param effectName Effect name
         * @param propertyName Property name
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addColorEffectPropertyTween(effectBehavior: any, identifier: string, toColorStr: string, effectName: string, propertyName: string, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object color.
         * @deprecated Use addObjectColorTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toColorStr The target RGB color (format "128;200;255" with values between 0 and 255 for red, green and blue)
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param useHSLColorTransition Tween using HSL color mappings, rather than direct RGB line
         */
        addObjectColorTween(identifier: string, toColorStr: string, easing: string, duration: float, destroyObjectWhenFinished: boolean, useHSLColorTransition: boolean): void;
        /**
         * Tween an object color.
         * @param identifier Unique id to identify the tween
         * @param toColorStr The target RGB color (format "128;200;255" with values between 0 and 255 for red, green and blue)
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param useHSLColorTransition Tween using HSL color mappings, rather than direct RGB line
         */
        addObjectColorTween2(identifier: string, toColorStr: string, easing: string, duration: float, destroyObjectWhenFinished: boolean, useHSLColorTransition?: boolean): void;
        private _addObjectColorTween;
        /**
         * Tween an object HSL color, with the "to" color given using HSL (H: any number, S and L: 0-100).
         * @deprecated Use addObjectColorHSLTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toHue The target hue, or the same as the from color's hue if blank
         * @param animateHue, include hue in calculations, as can't set this to -1 as default to ignore
         * @param toSaturation The target saturation, or the same as the from color's saturation if blank
         * @param toLightness The target lightness, or the same as the from color's lightness if blank
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectColorHSLTween(identifier: string, toHue: number, animateHue: boolean, toSaturation: number, toLightness: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object HSL color, with the "to" color given using HSL (H: any number, S and L: 0-100).
         * @param identifier Unique id to identify the tween
         * @param toHue The target hue, or the same as the from color's hue if blank
         * @param animateHue, include hue in calculations, as can't set this to -1 as default to ignore
         * @param toSaturation The target saturation, or the same as the from color's saturation if blank
         * @param toLightness The target lightness, or the same as the from color's lightness if blank
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectColorHSLTween2(identifier: string, toHue: number, animateHue: boolean, toSaturation: number, toLightness: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectColorHSLTween;
        /**
         * Tween a text object character size.
         * @deprecated Use addTextObjectCharacterSizeTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toSize The target character size
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addTextObjectCharacterSizeTween(identifier: string, toSize: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween a text object character size.
         * @param identifier Unique id to identify the tween
         * @param toSize The target character size
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addTextObjectCharacterSizeTween2(identifier: string, toSize: number, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addTextObjectCharacterSizeTween;
        /**
         * Tween an object width.
         * @deprecated Use addObjectWidthTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toWidth The target width
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectWidthTween(identifier: string, toWidth: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object width.
         * @param identifier Unique id to identify the tween
         * @param toWidth The target width
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectWidthTween2(identifier: string, toWidth: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectWidthTween;
        /**
         * Tween an object height.
         * @deprecated Use addObjectHeightTween2 instead.
         * @param identifier Unique id to identify the tween
         * @param toHeight The target height
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectHeightTween(identifier: string, toHeight: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween an object height.
         * @param identifier Unique id to identify the tween
         * @param toHeight The target height
         * @param easing Easing function identifier
         * @param duration Duration in seconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectHeightTween2(identifier: string, toHeight: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        private _addObjectHeightTween;
        /**
         * Tween an object depth.
         * @deprecated Use the 3D Tween extension instead.
         * @param identifier Unique id to identify the tween
         * @param toDepth The target depth
         * @param easing Easing function identifier
         * @param duration Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectDepthTween(identifier: string, toDepth: float, easing: string, duration: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Tween is playing.
         * @param identifier Unique id to identify the tween
         */
        isPlaying(identifier: string): boolean;
        /**
         * Tween exists.
         * @param identifier Unique id to identify the tween
         * @returns The tween exists
         */
        exists(identifier: string): boolean;
        /**
         * Tween has finished.
         * @param identifier Unique id to identify the tween
         */
        hasFinished(identifier: string): boolean;
        /**
         * Pause a tween.
         * @param identifier Unique id to identify the tween
         */
        pauseTween(identifier: string): void;
        /**
         * Stop a tween.
         * @param identifier Unique id to identify the tween
         * @param jumpToDest Move to destination
         */
        stopTween(identifier: string, jumpToDest: boolean): void;
        /**
         * Resume a tween.
         * @param identifier Unique id to identify the tween
         */
        resumeTween(identifier: string): void;
        /**
         * Remove a tween.
         * @param identifier Unique id to identify the tween
         */
        removeTween(identifier: string): void;
        /**
         * Get tween progress.
         * @param identifier Unique id to identify the tween
         * @returns Progress of playing tween animation (between 0.0 and 1.0)
         */
        getProgress(identifier: string): float;
        /**
         * Get tween value.
         *
         * It returns 0 for tweens with several values.
         *
         * @param identifier Unique id to identify the tween
         * @returns Value of playing tween animation
         */
        getValue(identifier: string): float;
        onDeActivate(): void;
        onActivate(): void;
    }
}
