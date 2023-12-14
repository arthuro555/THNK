declare namespace gdjs {
    interface EffectHandler {
        /**
         * Change an effect property value (for properties that are numbers).
         * @param name The name of the effect to update.
         * @param parameterName The name of the property to update.
         * @param value The new value (number).
         */
        setEffectDoubleParameter(name: string, parameterName: string, value: float): boolean;
        /**
         * Change an effect property value (for properties that are strings).
         * @param name The name of the effect to update.
         * @param parameterName The name of the property to update.
         * @param value The new value (string).
         */
        setEffectStringParameter(name: string, parameterName: string, value: string): boolean;
        /**
         * Change an effect property value (for properties that are booleans).
         * @param name The name of the effect to update.
         * @param parameterName The name of the property to update.
         * @param value The new value (boolean).
         */
        setEffectBooleanParameter(name: string, parameterName: string, value: boolean): boolean;
        /**
         * Enable or disable an effect.
         * @param name The name of the effect to enable or disable.
         * @param enable true to enable, false to disable
         */
        enableEffect(name: string, enable: boolean): void;
        /**
         * Check if an effect is enabled
         * @param name The name of the effect
         * @return true if the effect is enabled, false otherwise.
         */
        isEffectEnabled(name: string): boolean;
    }
    /**
     * A behavior that forwards the EffectBehavior interface to its object.
     */
    class EffectBehavior extends gdjs.RuntimeBehavior implements EffectHandler {
        private object;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, behaviorData: any, owner: gdjs.RuntimeObject & EffectHandler);
        usesLifecycleFunction(): boolean;
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onDeActivate(): void;
        onDestroy(): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        setEffectDoubleParameter(name: string, parameterName: string, value: float): boolean;
        setEffectStringParameter(name: string, parameterName: string, value: string): boolean;
        setEffectBooleanParameter(name: string, parameterName: string, value: boolean): boolean;
        enableEffect(name: string, enable: boolean): void;
        isEffectEnabled(name: string): boolean;
    }
}
