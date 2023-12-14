declare namespace gdjs {
    /**
     * The DummyRuntimeBehavior changes a variable in the object that is owning
     * it, at every tick before events are run, to set it to the string that was
     * set in one of the behavior property.
     * @ignore
     */
    class DummyRuntimeBehavior extends gdjs.RuntimeBehavior {
        _textToSet: string;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
    }
}
