declare namespace gdjs {
    interface Flippable {
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
    }
    /**
     * A behavior that forwards the Flippable interface to its object.
     */
    class FlippableBehavior extends gdjs.RuntimeBehavior implements Flippable {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & Flippable);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
    }
}
