declare namespace gdjs {
    type RendererEffects = Record<string, gdjs.PixiFiltersTools.Filter>;
    export interface EffectsTarget {
        getRuntimeScene: () => gdjs.RuntimeInstanceContainer;
        getElapsedTime: (instanceContainer?: gdjs.RuntimeInstanceContainer) => number;
        getHeight: () => number;
        getWidth: () => number;
        isLightingLayer?: () => boolean;
        getName: () => string;
        getRendererObject: () => RendererObjectInterface | null | undefined;
        get3DRendererObject: () => THREE.Object3D | null | undefined;
    }
    /**
     * Handle effects (aka PixiJS "filters") on PixiJS objects.
     */
    class PixiEffectsManager {
        /**
         * Initialize the renderer effect (PixiJS filter) from the effect data.
         * Call the applyEffect method afterwards, to correctly apply the
         * initialized effects on the object.
         * @param effectData The effect data
         * @param rendererEffects The collection of PixiJS filters
         * @param target The effects target
         */
        initializeEffect(effectData: EffectData, rendererEffects: RendererEffects, target: EffectsTarget): boolean;
        /**
         * Update the filters applied on a PixiJS DisplayObject.
         * This must be called after the events and before the rendering.
         *
         * This allows effects to be sure that they are up to date and ready
         * to render. This is not called on objects that are not rendered on screen
         * ("culling"). This is always called on layers.
         */
        updatePreRender(rendererEffects: RendererEffects, target: EffectsTarget): void;
        /**
         * Add a new effect on a PixiJS DisplayObject, or replace the one
         * with the same name.
         * @param effectData The effect data
         * @param rendererEffects The renderer effects
         * @param target The effects target
         */
        addEffect(effectData: EffectData, rendererEffects: RendererEffects, target: EffectsTarget): boolean;
        /**
         * Remove the effect with the specified name from a PixiJS DisplayObject.
         * @param rendererEffects The collection of PixiJS filters.
         * @param rendererObject The renderer object.
         * @param effectName The name of the effect.
         */
        removeEffect(rendererEffects: RendererEffects, target: EffectsTarget, effectName: string): boolean;
        /**
         * Remove all effects from a PixiJS DisplayObject.
         * @param rendererObject The renderer object.
         */
        clearEffects(rendererObject: PIXI.DisplayObject): boolean;
        /**
         * Update the property of an effect (with a number).
         * @param rendererEffects The collection of PixiJS filters.
         * @param name The effect name
         * @param parameterName The property name
         * @param value The new value for the property
         */
        setEffectDoubleParameter(rendererEffects: RendererEffects, name: string, parameterName: string, value: float): boolean;
        /**
         * Update the property of an effect (with a string).
         * @param rendererEffects The collection of PixiJS filters.
         * @param name The effect name
         * @param parameterName The property name
         * @param value The new value for the property
         */
        setEffectStringParameter(rendererEffects: RendererEffects, name: string, parameterName: string, value: string): boolean;
        /**
         * Enable or disable the property of an effect (boolean).
         * @param rendererEffects The collection of PixiJS filters.
         * @param name The effect name
         * @param parameterName The property name
         * @param value The new value for the property
         */
        setEffectBooleanParameter(rendererEffects: RendererEffects, name: string, parameterName: string, value: boolean): boolean;
        /**
         * Updates all the effect properties.
         * @param rendererEffects
         * @param effectData
         */
        updateAllEffectParameters(rendererEffects: RendererEffects, effectData: EffectData): boolean;
        /**
         * Check if an effect exists.
         * @param rendererEffects The collection of PixiJS filters.
         * @param name The effect name
         * @returns True if the effect exists, false otherwise
         */
        hasEffect(rendererEffects: RendererEffects, name: string): boolean;
        /**
         * Enable an effect.
         * @param rendererEffects The collection of PixiJS filters.
         * @param name The effect name
         * @param value Set to true to enable, false to disable
         */
        enableEffect(rendererEffects: RendererEffects, target: EffectsTarget, name: string, value: boolean): void;
        /**
         * Check if an effect is enabled.
         * @param rendererEffects The collection of PixiJS filters.
         * @param name The effect name
         * @return true if the filter is enabled
         */
        isEffectEnabled(rendererEffects: RendererEffects, target: EffectsTarget, name: string): boolean;
    }
    export const EffectsManager: typeof PixiEffectsManager;
    export type EffectsManager = PixiEffectsManager;
    export {};
}
