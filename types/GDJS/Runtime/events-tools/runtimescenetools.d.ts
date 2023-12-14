declare namespace gdjs {
    namespace evtTools {
        namespace runtimeScene {
            const sceneJustBegins: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const sceneJustResumed: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const getSceneName: (runtimeScene: gdjs.RuntimeScene) => string;
            const setBackgroundColor: (runtimeScene: gdjs.RuntimeScene, rgbColor: string) => void;
            const getElapsedTimeInSeconds: (runtimeScene: gdjs.RuntimeScene) => number;
            const setTimeScale: (runtimeScene: gdjs.RuntimeScene, timeScale: float) => void;
            const getTimeScale: (runtimeScene: gdjs.RuntimeScene) => number;
            /**
             * Test a timer elapsed time, if the timer doesn't exist it is created.
             *
             * @deprecated prefer using getTimerElapsedTimeInSecondsOrNaN
             *
             * @param runtimeScene The scene owning the timer
             * @param timeInSeconds The time value to check in seconds
             * @param timerName The timer name
             * @return True if the timer exists and its value is greater than or equal than the given time, false otherwise
             */
            const timerElapsedTime: (runtimeScene: gdjs.RuntimeScene, timeInSeconds: float, timerName: string) => boolean;
            const timerPaused: (runtimeScene: gdjs.RuntimeScene, timerName: string) => boolean;
            const resetTimer: (runtimeScene: gdjs.RuntimeScene, timerName: string) => void;
            const pauseTimer: (runtimeScene: gdjs.RuntimeScene, timerName: string) => void;
            const unpauseTimer: (runtimeScene: gdjs.RuntimeScene, timerName: string) => void;
            const removeTimer: (runtimeScene: gdjs.RuntimeScene, timerName: string) => void;
            class WaitTask extends gdjs.AsyncTask {
                private duration;
                private timeElapsedOnScene;
                constructor(durationInMilliseconds: float);
                update(runtimeScene: RuntimeScene): boolean;
            }
            const wait: (durationInSeconds: float) => AsyncTask;
            /**
             * This is used by expressions to return 0 when a timer doesn't exist,
             * because numeric expressions must always return a number.
             *
             * @param runtimeScene The scene owning the timer.
             * @param timerName The timer name.
             * @returns The timer elapsed time in seconds or 0 if the timer doesn't exist.
             */
            const getTimerElapsedTimeInSeconds: (runtimeScene: gdjs.RuntimeScene, timerName: string) => number;
            /**
             * This is used by conditions to return false when a timer doesn't exist,
             * no matter the relational operator.
             *
             * @param runtimeScene The scene owning the timer.
             * @param timerName The timer name.
             * @returns The timer elapsed time in seconds or NaN if the timer doesn't exist.
             */
            const getTimerElapsedTimeInSecondsOrNaN: (runtimeScene: gdjs.RuntimeScene, timerName: string) => number;
            const getTimeFromStartInSeconds: (runtimeScene: gdjs.RuntimeScene) => number;
            const getTime: (runtimeScene: gdjs.RuntimeScene, what: string) => number;
            const replaceScene: (runtimeScene: gdjs.RuntimeScene, newSceneName: string, clearOthers: boolean) => void;
            const pushScene: (runtimeScene: gdjs.RuntimeScene, newSceneName: string) => void;
            const popScene: (runtimeScene: gdjs.RuntimeScene) => void;
            const stopGame: (runtimeScene: gdjs.RuntimeScene) => void;
            const createObjectsFromExternalLayout: (scene: gdjs.RuntimeInstanceContainer, externalLayout: string, xPos: float, yPos: float, zPos: float) => void;
            /**
             * Check if the game has just resumed from being hidden
             */
            const hasGameJustResumed: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            /**
             * Check if a scene exists.
             */
            const doesSceneExist: (runtimeScene: gdjs.RuntimeScene, sceneName: string) => boolean;
            /**
             * Preload a scene assets as soon as possible in background.
             */
            const prioritizeLoadingOfScene: (runtimeScene: gdjs.RuntimeScene, sceneName: string) => void;
            /**
             * @return The progress of assets loading in background for a scene (between 0 and 1).
             */
            const getSceneLoadingProgress: (runtimeScene: gdjs.RuntimeScene, sceneName: string) => float;
            /**
             * Check if scene assets have finished to load in background.
             */
            const areSceneAssetsLoaded: (runtimeScene: gdjs.RuntimeScene, sceneName: string) => boolean;
        }
    }
}
