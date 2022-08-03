/// <reference types="extensions/tweenbehavior/shifty" />
declare namespace gdjs {
    interface RuntimeScene {
        _tweens: Map<string, shifty.Tweenable>;
    }
    namespace evtTools {
        namespace tween {
            /**
             * Tween between 2 values according to an easing function.
             * @param fromValue Start value
             * @param toValue End value
             * @param easingValue Type of easing
             * @param weighting from 0 to 1
             */
            const ease: (easingValue: string, fromValue: float, toValue: float, weighting: float) => number;
            const sceneTweenExists: (runtimeScene: RuntimeScene, id: string) => boolean;
            const sceneTweenIsPlaying: (runtimeScene: RuntimeScene, id: string) => boolean;
            const sceneTweenHasFinished: (runtimeScene: RuntimeScene, id: string) => boolean;
            const resumeSceneTween: (runtimeScene: RuntimeScene, id: string) => void;
            const pauseSceneTween: (runtimeScene: RuntimeScene, id: string) => void;
            const stopSceneTween: (runtimeScene: RuntimeScene, id: string, shouldGoToEnd: boolean) => void;
            const removeSceneTween: (runtimeScene: RuntimeScene, id: string) => void;
            const tweenVariableNumber: (runtimeScene: RuntimeScene, identifier: string, variable: Variable, from: number, to: number, duration: number, easing: shifty.easingFunction) => void;
            const tweenCamera: (runtimeScene: RuntimeScene, identifier: string, toX: number, toY: number, layerName: string, duration: number, easing: shifty.easingFunction) => void;
        }
    }
}
