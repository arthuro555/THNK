declare namespace gdjs {
    interface TextContainer {
        /**
         * Get the text displayed by the object.
         */
        getText(): string;
        /**
         * Set the text displayed by the object.
         * @param text The new text
         */
        setText(text: string): void;
    }
    /**
     * A behavior that forwards the Animatable interface to its object.
     */
    class TextContainerBehavior extends gdjs.RuntimeBehavior implements TextContainer {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & TextContainer);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getText(): string;
        setText(text: string): void;
    }
}
