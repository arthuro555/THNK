declare namespace gdjs {
    /**
     * The TextEntryRuntimeObject allows to capture text typed on the keyboard.
     */
    class TextEntryRuntimeObject extends gdjs.RuntimeObject {
        _str: string;
        _activated: boolean;
        _renderer: gdjs.TextEntryRuntimeObjectRenderer;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param textEntryObjectData The initial properties of the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, textEntryObjectData: ObjectData);
        updateFromObjectData(oldObjectData: any, newObjectData: any): boolean;
        onDestroyFromScene(runtimeScene: any): void;
        update(runtimeScene: gdjs.RuntimeScene): void;
        getString(): string;
        setString(str: string): void;
        isActivated(): boolean;
        activate(enable: boolean): void;
    }
}
