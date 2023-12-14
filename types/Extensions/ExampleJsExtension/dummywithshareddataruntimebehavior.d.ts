declare namespace gdjs {
    class DummyWithSharedDataRuntimeBehavior extends gdjs.RuntimeBehavior {
        _textToSet: string;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
    }
}
