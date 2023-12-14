declare namespace gdjs {
    interface Animatable {
        /**
         * Get the index of the animation being played.
         * @return The index of the new animation being played
         */
        getAnimationIndex(): integer;
        /**
         * Change the animation being played.
         * @param animationIndex The index of the new animation to be played
         */
        setAnimationIndex(animationIndex: integer): void;
        /**
         * Get the name of the animation being played.
         * @return The name of the new animation being played
         */
        getAnimationName(): string;
        /**
         * Change the animation being played.
         * @param newAnimationName The name of the new animation to be played
         */
        setAnimationName(newAnimationName: string): void;
        isCurrentAnimationName(name: string): boolean;
        /**
         * Return true if animation has ended.
         * The animation had ended if:
         * - it's not configured as a loop;
         * - the current frame is the last frame;
         * - the last frame has been displayed long enough.
         */
        hasAnimationEnded(): boolean;
        isAnimationPaused(): boolean;
        pauseAnimation(): void;
        resumeAnimation(): void;
        getAnimationSpeedScale(): float;
        setAnimationSpeedScale(ratio: float): void;
        /**
         * @return The elapsed time from the start of the animation in seconds.
         */
        getAnimationElapsedTime(): float;
        /**
         * Set the elapsed time from the start of the animation in seconds.
         * @param time The time in seconds
         */
        setAnimationElapsedTime(time: float): void;
        /**
         * @return The duration of the current animation in seconds.
         */
        getAnimationDuration(): float;
    }
    /**
     * A behavior that forwards the Animatable interface to its object.
     */
    class AnimatableBehavior extends gdjs.RuntimeBehavior implements Animatable {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & Animatable);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getAnimationIndex(): integer;
        setAnimationIndex(animationIndex: integer): void;
        getAnimationName(): string;
        setAnimationName(newAnimationName: string): void;
        isCurrentAnimationName(name: string): boolean;
        hasAnimationEnded(): boolean;
        isAnimationPaused(): boolean;
        pauseAnimation(): void;
        resumeAnimation(): void;
        getAnimationSpeedScale(): float;
        setAnimationSpeedScale(ratio: float): void;
        getAnimationElapsedTime(): float;
        setAnimationElapsedTime(time: float): void;
        getAnimationDuration(): float;
    }
}
