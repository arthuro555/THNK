/// <reference types="extensions/tweenbehavior/shifty" />
declare namespace gdjs {
    class TweenRuntimeBehavior extends gdjs.RuntimeBehavior {
        private _tweens;
        private _runtimeScene;
        private _isActive;
        /**
         * @param runtimeScene The runtime scene the behavior belongs to.
         * @param behaviorData The data to initialize the behavior
         * @param owner The runtime object the behavior belongs to.
         */
        constructor(runtimeScene: gdjs.RuntimeScene, behaviorData: BehaviorData, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: BehaviorData, newBehaviorData: BehaviorData): boolean;
        onDestroy(): void;
        private _addTween;
        private _tweenExists;
        private _tweenIsPlaying;
        private _pauseTween;
        private _resumeTween;
        private _stopTween;
        private _tweenHasFinished;
        /**
         * Add an object variable tween.
         * @param identifier Unique id to identify the tween
         * @param variable The object variable to store the tweened value
         * @param fromValue Start value
         * @param toValue End value
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addVariableTween(identifier: string, variable: gdjs.Variable, fromValue: float, toValue: float, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object position tween.
         * @param identifier Unique id to identify the tween
         * @param toX The target X position
         * @param toY The target Y position
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionTween(identifier: string, toX: number, toY: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object X position tween.
         * @param identifier Unique id to identify the tween
         * @param toX The target X position
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionXTween(identifier: string, toX: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object Y position tween.
         * @param identifier Unique id to identify the tween
         * @param toY The target Y position
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectPositionYTween(identifier: string, toY: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object angle tween.
         * @param identifier Unique id to identify the tween
         * @param toAngle The target angle
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectAngleTween(identifier: string, toAngle: float, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object scale tween.
         * @param identifier Unique id to identify the tween
         * @param toScaleX The target X-scale
         * @param toScaleY The target Y-scale
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleTween(identifier: string, toScaleX: number, toScaleY: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        /**
         * Add an object X-scale tween.
         * @param identifier Unique id to identify the tween
         * @param toScaleX The target X-scale
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleXTween(identifier: string, toScaleX: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        /**
         * Add an object scale y tween.
         * @param identifier Unique id to identify the tween
         * @param toScaleY The target Y-scale
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param scaleFromCenterOfObject Scale the transform from the center of the object (or point that is called center), not the top-left origin
         */
        addObjectScaleYTween(identifier: string, toScaleY: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean, scaleFromCenterOfObject: boolean): void;
        /**
         * Add an object opacity tween.
         * @param identifier Unique id to identify the tween
         * @param toOpacity The target opacity
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectOpacityTween(identifier: string, toOpacity: float, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object color tween.
         * @param identifier Unique id to identify the tween
         * @param toColorStr The target color
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         * @param useHSLColorTransition Tween using HSL color mappings, rather than direct RGB line
         */
        addObjectColorTween(identifier: string, toColorStr: string, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean, useHSLColorTransition: boolean): void;
        /**
         * Add an object color HSL tween, with the "to" color given using HSL (H: any number, S and L: 0-100).
         * @param identifier Unique id to identify the tween
         * @param toHue The target hue, or the same as the from color's hue if blank
         * @param animateHue, include hue in calculations, as can't set this to -1 as default to ignore
         * @param toSaturation The target saturation, or the same as the from color's saturation if blank
         * @param toHue The target lightness, or the same as the from color's lightness if blank
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectColorHSLTween(identifier: string, toHue: number, animateHue: boolean, toSaturation: number, toLightness: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add a text object character size tween.
         * @param identifier Unique id to identify the tween
         * @param toSize The target character size
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addTextObjectCharacterSizeTween(identifier: string, toSize: number, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object width tween.
         * @param identifier Unique id to identify the tween
         * @param toWidth The target width
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectWidthTween(identifier: string, toWidth: float, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
        /**
         * Add an object height tween.
         * @param identifier Unique id to identify the tween
         * @param toHeight The target height
         * @param easingValue Type of easing
         * @param durationValue Duration in milliseconds
         * @param destroyObjectWhenFinished Destroy this object when the tween ends
         */
        addObjectHeightTween(identifier: string, toHeight: float, easingValue: string, durationValue: float, destroyObjectWhenFinished: boolean): void;
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
        onDeActivate(): void;
        onActivate(): void;
        static easings: string[];
        static _currentTweenTime: number;
    }
    namespace TweenRuntimeBehavior {
        /**
         * A tween being played in a behavior.
         * @ignore
         */
        class TweenInstance {
            instance: shifty.Tweenable;
            hasFinished: boolean;
            startTime: float;
            totalDuration: float;
            resumeOnActivate: boolean;
            /**
             * @param instance The Shifty tween that is played
             * @param hasFinished If the tween is finished already
             * @param startTime The time at which the tween starts
             * @param totalDuration The time of the whole tween
             */
            constructor(instance: shifty.Tweenable, hasFinished: boolean, startTime: float, totalDuration: float);
        }
    }
}
