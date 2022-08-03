declare namespace gdjs {
    type HotReloaderLog = {
        message: string;
        kind: 'fatal' | 'error' | 'warning' | 'info';
    };
    type ChangedRuntimeBehavior = {
        oldBehaviorConstructor: Function;
        newBehaviorConstructor: Function;
        behaviorTypeName: string;
    };
    /**
     * Reload scripts/data of an exported game and applies the changes
     * to the running runtime game.
     */
    class HotReloader {
        _runtimeGame: gdjs.RuntimeGame;
        _reloadedScriptElement: Record<string, HTMLScriptElement>;
        _logs: HotReloaderLog[];
        _alreadyLoadedScriptFiles: Record<string, boolean>;
        /**
         * @param runtimeGame - The `gdjs.RuntimeGame` to be hot-reloaded.
         */
        constructor(runtimeGame: gdjs.RuntimeGame);
        static groupByPersistentUuid<ObjectWithPersistentId extends {
            persistentUuid: string | null;
        }>(objectsWithPersistentId: ObjectWithPersistentId[]): Record<string, ObjectWithPersistentId>;
        _canReloadScriptFile(srcFilename: string): boolean;
        _reloadScript(srcFilename: string): Promise<void>;
        hotReload(): Promise<HotReloaderLog[]>;
        _computeChangedRuntimeBehaviors(oldBehaviorConstructors: Record<string, Function>, newBehaviorConstructors: Record<string, Function>): ChangedRuntimeBehavior[];
        reloadScriptFiles(newProjectData: ProjectData, oldScriptFiles: RuntimeGameOptionsScriptFile[], newScriptFiles: RuntimeGameOptionsScriptFile[], projectDataOnlyExport: boolean): Promise<void[]>;
        _hotReloadRuntimeGame(oldProjectData: ProjectData, newProjectData: ProjectData, changedRuntimeBehaviors: ChangedRuntimeBehavior[], runtimeGame: gdjs.RuntimeGame): Promise<void>;
        _hotReloadVariablesContainer(oldVariablesData: RootVariableData[], newVariablesData: RootVariableData[], variablesContainer: gdjs.VariablesContainer): void;
        _hotReloadStructureVariable(oldChildren: RootVariableData[], newChildren: RootVariableData[], variable: gdjs.Variable): void;
        _hotReloadRuntimeScene(oldLayoutData: LayoutData, newLayoutData: LayoutData, changedRuntimeBehaviors: ChangedRuntimeBehavior[], runtimeScene: gdjs.RuntimeScene): void;
        _hotReloadRuntimeSceneBehaviorsSharedData(oldBehaviorsSharedData: BehaviorSharedData[], newBehaviorsSharedData: BehaviorSharedData[], runtimeScene: gdjs.RuntimeScene): void;
        _reinstantiateRuntimeSceneRuntimeBehaviors(changedRuntimeBehaviors: ChangedRuntimeBehavior[], newObjects: ObjectData[], runtimeScene: gdjs.RuntimeScene): void;
        _reinstantiateRuntimeObjectRuntimeBehavior(behaviorData: BehaviorData, runtimeObject: gdjs.RuntimeObject): void;
        _hotReloadRuntimeSceneObjects(oldObjects: ObjectData[], newObjects: ObjectData[], runtimeScene: gdjs.RuntimeScene): void;
        _hotReloadRuntimeSceneObject(oldObjectData: ObjectData, newObjectData: ObjectData, runtimeScene: gdjs.RuntimeScene): void;
        _hotReloadRuntimeObjectsBehaviors(oldBehaviors: BehaviorData[], newBehaviors: BehaviorData[], runtimeObjects: gdjs.RuntimeObject[]): void;
        _hotReloadRuntimeObjectsEffects(oldEffects: EffectData[], newEffects: EffectData[], runtimeObjects: RuntimeObject[]): void;
        /**
         * @returns true if hot-reload succeeded, false otherwise.
         */
        _hotReloadRuntimeBehavior(oldBehaviorData: BehaviorData, newBehaviorData: BehaviorData, runtimeBehavior: gdjs.RuntimeBehavior): boolean;
        _hotReloadRuntimeSceneLayers(oldLayers: LayerData[], newLayers: LayerData[], runtimeScene: gdjs.RuntimeScene): void;
        _hotReloadRuntimeLayer(oldLayer: LayerData, newLayer: LayerData, runtimeLayer: gdjs.Layer): void;
        _hotReloadRuntimeLayerEffects(oldEffectsData: EffectData[], newEffectsData: EffectData[], runtimeLayer: gdjs.Layer): void;
        _hotReloadRuntimeLayerEffect(oldEffectData: EffectData, newEffectData: EffectData, runtimeLayer: gdjs.Layer, effectName: string): void;
        _hotReloadRuntimeSceneInstances(oldInstances: InstanceData[], newInstances: InstanceData[], runtimeScene: gdjs.RuntimeScene): void;
        _hotReloadRuntimeInstance(oldInstance: InstanceData, newInstance: InstanceData, runtimeObject: gdjs.RuntimeObject): void;
        /**
         * Deep check equality between the two objects/arrays/primitives.
         *
         * Inspired from https://github.com/epoberezkin/fast-deep-equal
         * @param a The first object/array/primitive to compare
         * @param b The second object/array/primitive to compare
         */
        static deepEqual(a: any, b: any): boolean;
    }
}
