declare namespace gdjs {
    /**
     * The TextEntryRuntimeObject allows to capture text typed on the keyboard.
     */
    class TextEntryRuntimeObject extends gdjs.RuntimeObject {
        _str: string;
        _activated: boolean;
        _renderer: gdjs.TextEntryRuntimeObjectRenderer;
        /**
         * @param instanceContainer The container the object belongs to.
         * @param textEntryObjectData The initial properties of the object
         */
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, textEntryObjectData: ObjectData);
        updateFromObjectData(oldObjectData: any, newObjectData: any): boolean;
        onDestroyed(): void;
        update(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getString(): string;
        setString(str: string): void;
        isActivated(): boolean;
        activate(enable: boolean): void;
    }
}
