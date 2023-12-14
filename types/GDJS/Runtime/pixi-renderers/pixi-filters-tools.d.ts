declare namespace gdjs {
    namespace PixiFiltersTools {
        const clampValue: (value: any, min: any, max: any) => number;
        const clampKernelSize: (value: any, min: any, max: any) => any;
        /**
         * Return the creator for the filter with the given name, if any.
         * @param filterName The name of the filter to get
         * @return The filter creator, if any (null otherwise).
         */
        const getFilterCreator: (filterName: string) => FilterCreator | null;
        /**
         * Register a new PIXI filter creator, to be used by GDJS.
         * @param filterName The name of the filter to get
         * @param filterCreator The object used to create the filter.
         */
        const registerFilterCreator: (filterName: string, filterCreator: FilterCreator) => void;
        /**
         * Convert a string RGB color ("rrr;ggg;bbb") or a hex string (#rrggbb) to a hex number.
         * @param value The color as a RGB string or hex string
         */
        const rgbOrHexToHexNumber: (value: string) => number;
        /** A wrapper allowing to create an effect. */
        interface FilterCreator {
            /** Function to call to create the filter */
            makeFilter(target: EffectsTarget, effectData: EffectData): Filter;
        }
        /** An effect. */
        interface Filter {
            /**
             * Check if an effect is enabled.
             * @return true if the filter is enabled
             */
            isEnabled(target: EffectsTarget): boolean;
            /**
             * Enable an effect.
             * @param enabled Set to true to enable, false to disable
             */
            setEnabled(target: EffectsTarget, enabled: boolean): boolean;
            /**
             * Apply the effect on the PixiJS DisplayObject.
             * Called after the effect is initialized.
             * @param rendererObject The renderer object
             * @param effect The effect to be applied.
             */
            applyEffect(target: EffectsTarget): boolean;
            removeEffect(target: EffectsTarget): boolean;
            /** The function to be called to update the filter at every frame before the rendering. */
            updatePreRender(target: gdjs.EffectsTarget): any;
            /** The function to be called to update a parameter (with a number) */
            updateDoubleParameter(parameterName: string, value: number): void;
            /** The function to be called to update a parameter (with a string) */
            updateStringParameter(parameterName: string, value: string): void;
            /** The function to be called to update a parameter (with a boolean) */
            updateBooleanParameter(parameterName: string, value: boolean): void;
            updateColorParameter(parameterName: string, value: number): void;
            getDoubleParameter(parameterName: string): number;
            getColorParameter(parameterName: string): number;
        }
        /** A wrapper allowing to create a PIXI filter and update it using a common interface */
        abstract class PixiFilterCreator implements FilterCreator {
            /** Function to call to create the filter */
            makeFilter(target: EffectsTarget, effectData: EffectData): Filter;
            /** Function to call to create the filter */
            abstract makePIXIFilter(target: EffectsTarget, effectData: EffectData): any;
            /** The function to be called to update the filter at every frame before the rendering. */
            abstract updatePreRender(filter: PIXI.Filter, target: gdjs.EffectsTarget): any;
            /** The function to be called to update a parameter (with a number) */
            abstract updateDoubleParameter(filter: PIXI.Filter, parameterName: string, value: number): void;
            /** The function to be called to update a parameter (with a string) */
            abstract updateStringParameter(filter: PIXI.Filter, parameterName: string, value: string): void;
            /** The function to be called to update a parameter (with a boolean) */
            abstract updateBooleanParameter(filter: PIXI.Filter, parameterName: string, value: boolean): void;
            abstract updateColorParameter(filter: PIXI.Filter, parameterName: string, value: number): void;
            abstract getDoubleParameter(filter: PIXI.Filter, parameterName: string): number;
            abstract getColorParameter(filter: PIXI.Filter, parameterName: string): number;
        }
        /**An effect used to manipulate a Pixi filter. */
        class PixiFilter implements Filter {
            /** The PIXI filter */
            pixiFilter: PIXI.Filter;
            filterCreator: gdjs.PixiFiltersTools.PixiFilterCreator;
            constructor(pixiFilter: PIXI.Filter, filterCreator: gdjs.PixiFiltersTools.PixiFilterCreator);
            isEnabled(target: EffectsTarget): boolean;
            setEnabled(target: EffectsTarget, enabled: boolean): boolean;
            applyEffect(target: EffectsTarget): boolean;
            removeEffect(target: EffectsTarget): boolean;
            updatePreRender(target: gdjs.EffectsTarget): any;
            updateDoubleParameter(parameterName: string, value: number): void;
            updateStringParameter(parameterName: string, value: string): void;
            updateBooleanParameter(parameterName: string, value: boolean): void;
            updateColorParameter(parameterName: string, value: number): void;
            getDoubleParameter(parameterName: string): number;
            getColorParameter(parameterName: string): number;
        }
        class EmptyFilter implements Filter {
            isEnabled(target: EffectsTarget): boolean;
            setEnabled(target: EffectsTarget, enabled: boolean): boolean;
            applyEffect(target: EffectsTarget): boolean;
            removeEffect(target: EffectsTarget): boolean;
            updatePreRender(target: gdjs.EffectsTarget): any;
            updateDoubleParameter(parameterName: string, value: number): void;
            updateStringParameter(parameterName: string, value: string): void;
            updateBooleanParameter(parameterName: string, value: boolean): void;
            updateColorParameter(parameterName: string, value: number): void;
            getDoubleParameter(parameterName: string): number;
            getColorParameter(parameterName: string): number;
        }
    }
}
