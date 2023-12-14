declare namespace gdjs {
    namespace evtTools {
        namespace tween {
            /**
             * A tween manager that is used for layout tweens or object tweens.
             * @ignore
             */
            class TweenManager {
                /**
                 * All the tweens of a layout or a behavior.
                 */
                private _tweens;
                /**
                 * Allow fast iteration on tween that are active.
                 */
                private _activeTweens;
                constructor();
                /**
                 * Make all active tween step toward the end.
                 * @param timeDelta the duration from the previous step in seconds
                 * @param layoutTimeDelta the duration from the previous step ignoring layer time scale in seconds
                 */
                step(): void;
                /**
                 * Add a tween on one value.
                 */
                addSimpleTween(identifier: string, timeSource: TimeSource, totalDuration: number, easingIdentifier: string, interpolate: Interpolation, initialValue: float, targetedValue: float, setValue: (value: float) => void, onFinish?: (() => void) | null): void;
                /**
                 * Add a tween on several values.
                 */
                addMultiTween(identifier: string, timeSource: TimeSource, totalDuration: number, easingIdentifier: string, interpolate: Interpolation, initialValue: Array<float>, targetedValue: Array<float>, setValue: (value: Array<float>) => void, onFinish?: (() => void) | null): void;
                /**
                 * Tween exists.
                 * @param identifier Unique id to identify the tween
                 * @returns The tween exists
                 */
                exists(identifier: string): boolean;
                /**
                 * Tween is playing.
                 * @param identifier Unique id to identify the tween
                 */
                isPlaying(identifier: string): boolean;
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
                 * Resume a tween.
                 * @param identifier Unique id to identify the tween
                 */
                resumeTween(identifier: string): void;
                /**
                 * Stop a tween.
                 * @param identifier Unique id to identify the tween
                 * @param jumpToDest Move to destination
                 */
                stopTween(identifier: string, jumpToDest: boolean): void;
                /**
                 * Remove a tween.
                 * @param identifier Unique id to identify the tween
                 */
                removeTween(identifier: string): void;
                _addActiveTween(tween: TweenInstance): void;
                _removeActiveTween(tween: TweenInstance): void;
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
            }
            interface TimeSource {
                getElapsedTime(): float;
            }
            /**
             * An interpolation function.
             * @ignore
             */
            type Interpolation = (from: float, to: float, progress: float) => float;
            /**
             * A tween.
             * @ignore
             */
            interface TweenInstance {
                /**
                 * Step toward the end.
                 * @param timeDelta the duration from the previous step in seconds
                 * @param layoutTimeDelta the duration from the previous step ignoring layer time scale in seconds
                 */
                step(): void;
                isPlaying(): boolean;
                hasFinished(): boolean;
                stop(jumpToDest: boolean): void;
                resume(): void;
                pause(): void;
                getProgress(): float;
                getValue(): float;
            }
            /**
             * A tween.
             * @ignore
             */
            abstract class AbstractTweenInstance implements TweenInstance {
                protected elapsedTime: float;
                protected totalDuration: float;
                protected easing: (progress: float) => float;
                protected interpolate: Interpolation;
                protected onFinish: () => void;
                protected timeSource: TimeSource;
                protected isPaused: boolean;
                constructor(timeSource: TimeSource, totalDuration: float, easing: (progress: float) => float, interpolate: Interpolation, onFinish?: (() => void) | null);
                step(): void;
                protected abstract _updateValue(): void;
                abstract getValue(): float;
                isPlaying(): boolean;
                hasFinished(): boolean;
                stop(jumpToDest: boolean): void;
                resume(): void;
                pause(): void;
                getProgress(): float;
            }
            /**
             * A tween with only one value.
             * @ignore
             */
            class SimpleTweenInstance extends AbstractTweenInstance {
                initialValue: float;
                targetedValue: float;
                setValue: (value: float) => void;
                currentValue: float;
                constructor(timeSource: TimeSource, totalDuration: float, easing: (progress: float) => float, interpolate: Interpolation, initialValue: float, targetedValue: float, setValue: (value: float) => void, onFinish?: (() => void) | null);
                protected _updateValue(): void;
                getValue(): float;
            }
            /**
             * A tween with multiple values.
             * @ignore
             */
            class MultiTweenInstance extends AbstractTweenInstance {
                initialValue: Array<float>;
                targetedValue: Array<float>;
                setValue: (value: Array<float>) => void;
                currentValues: number[];
                constructor(timeSource: TimeSource, totalDuration: float, easing: (progress: float) => float, interpolate: Interpolation, initialValue: Array<float>, targetedValue: Array<float>, setValue: (value: Array<float>) => void, onFinish?: (() => void) | null);
                protected _updateValue(): void;
                getValue(): float;
            }
            const rgbToHsl: (r: number, g: number, b: number) => number[];
            const hslToRgb: (h: number, s: number, l: number) => number[];
            /**
             * Tween between 2 values according to an easing function.
             * @param fromValue Start value
             * @param toValue End value
             * @param easingValue Type of easing
             * @param weighting from 0 to 1
             */
            const ease: (easingValue: string, fromValue: float, toValue: float, weighting: float) => number;
            type EasingFunction = (progress: float) => float;
            /*!
             * All equations are adapted from Thomas Fuchs'
             * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
             *
             * Based on Easing Equations (c) 2003 [Robert
             * Penner](http://www.robertpenner.com/), all rights reserved. This work is
             * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
             */
            /*!
             *  TERMS OF USE - EASING EQUATIONS
             *  Open source under the BSD License.
             *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
             */
            /*! Shifty 3.0.3 - https://github.com/jeremyckahn/shifty */
            const easingFunctions: Record<string, EasingFunction>;
        }
    }
}
