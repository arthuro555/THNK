declare namespace gdjs {
    namespace PixiFiltersTools {
        const clampValue: (value: any, min: any, max: any) => number;
        const clampKernelSize: (value: any, min: any, max: any) => any;
        /**
         * Enable an effect.
         * @param filter The filter to enable or disable
         * @param value Set to true to enable, false to disable
         */
        const enableEffect: (filter: Filter, value: boolean) => void;
        /**
         * Check if an effect is enabled.
         * @param filter The filter to be checked
         * @return true if the filter is enabled
         */
        const isEffectEnabled: (filter: Filter) => boolean;
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
        /** A wrapper allowing to create a PIXI filter and update it using a common interface */
        type FilterCreator = {
            /** Function to call to create the filter */
            makePIXIFilter: (target: EffectsTarget, effectData: EffectData) => any;
            /** The function to be called to update the filter at every frame before the rendering. */
            updatePreRender: (filter: PIXI.Filter, target: gdjs.EffectsTarget) => any;
            /** The function to be called to update a parameter (with a number) */
            updateDoubleParameter: (filter: PIXI.Filter, parameterName: string, value: number) => void;
            /** The function to be called to update a parameter (with a string) */
            updateStringParameter: (filter: PIXI.Filter, parameterName: string, value: string) => void;
            /** The function to be called to update a parameter (with a boolean) */
            updateBooleanParameter: (filter: PIXI.Filter, parameterName: string, value: boolean) => void;
        };
        /** The type of a filter used to manipulate a Pixi filter. */
        type Filter = {
            /** The PIXI filter */
            pixiFilter: PIXI.Filter;
            /** The function to be called to update the filter at every frame before the rendering. */
            updatePreRender: (filter: PIXI.Filter, target: gdjs.EffectsTarget) => any;
            /** The function to be called to update a parameter (with a number) */
            updateDoubleParameter: (filter: PIXI.Filter, parameterName: string, value: number) => void;
            /** The function to be called to update a parameter (with a string) */
            updateStringParameter: (filter: PIXI.Filter, parameterName: string, value: string) => void;
            /** The function to be called to update a parameter (with a boolean) */
            updateBooleanParameter: (filter: PIXI.Filter, parameterName: string, value: boolean) => void;
        };
    }
}
