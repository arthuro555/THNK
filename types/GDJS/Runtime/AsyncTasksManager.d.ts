declare namespace gdjs {
    /**
     * This stores all asynchronous tasks waiting to be completed,
     * for a given scene.
     * @see {@link RuntimeScene.getAsyncTasksManager}.
     */
    class AsyncTasksManager {
        /**
         * Maps a task to the callback to be executed once it is finished.
         */
        private tasksWithCallback;
        /**
         * Run all pending asynchronous tasks.
         */
        processTasks(runtimeScene: RuntimeScene): void;
        /**
         * Adds a task to be processed between frames and a callback for when it is done to the manager.
         * @param asyncTask The {@link AsyncTask} to run.
         * @param callback The callback to execute once the task is finished.
         */
        addTask(asyncTask: AsyncTask, callback: (runtimeScene: RuntimeScene) => void): void;
        /**
         * For testing only - removes all tasks.
         * @internal
         */
        clearTasks(): void;
    }
    /**
     * An asynchronous task to be run between frames.
     */
    abstract class AsyncTask {
        /**
         * Called every frame where the scene is active.
         * @param runtimeScene - The scene the task runs on.
         * @return True if the task is finished, false if it needs to continue running.
         */
        abstract update(runtimeScene: RuntimeScene): boolean;
    }
    class TaskGroup extends AsyncTask {
        private tasks;
        addTask(task: AsyncTask): void;
        update(runtimeScene: gdjs.RuntimeScene): boolean;
    }
    class ResolveTask extends AsyncTask {
        update(): boolean;
    }
    /**
     * A task that resolves with a promise.
     */
    class PromiseTask extends AsyncTask {
        private isResolved;
        promise: Promise<void>;
        constructor(promise: Promise<void>);
        update(): boolean;
    }
}
