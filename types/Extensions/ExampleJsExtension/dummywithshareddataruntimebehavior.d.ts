declare namespace gdjs {
    class DummyWithSharedDataRuntimeBehavior extends gdjs.RuntimeBehavior {
        _textToSet: string;
        constructor(runtimeScene: gdjs.RuntimeScene, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        doStepPreEvents(runtimeScene: any): void;
        doStepPostEvents(runtimeScene: any): void;
    }
}
