declare namespace gdjs {
    namespace evtTools {
        /**
         * A namespace of functional equivalents to the gdjs.Variable methods, needed for events code generation.
         * @private
         * @namespace
         */
        namespace variable {
            /**
             * Get the value of a variable. Equivalent to `variable.getAsNumber()`.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const getVariableNumber: (variable: gdjs.Variable) => number;
            /**
             * Get the string of a variable. Equivalent to `variable.getAsString()`.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const getVariableString: (variable: gdjs.Variable) => string;
            /**
             * Compares the boolean value of a variable.
             * Equivalent to `variable.getAsBoolean() === boolean`.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const getVariableBoolean: (variable: gdjs.Variable, compareWith: boolean) => boolean;
            /**
             * Set the boolean value of a variable. Equivalent to `variable.setBoolean()`.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const setVariableBoolean: (variable: gdjs.Variable, newValue: boolean) => void;
            /**
             * Toggles the boolean value of a variable.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const toggleVariableBoolean: (variable: gdjs.Variable) => void;
            /**
             * Check if a scene variable exists.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const sceneVariableExists: (runtimeScene: gdjs.RuntimeScene, variableName: string) => boolean;
            /**
             * Check if a global variable exists.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const globalVariableExists: (instanceContainer: gdjs.RuntimeInstanceContainer, variableName: string) => boolean;
            /**
             * Check if a child exists in a variable.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const variableChildExists: (variable: gdjs.Variable, childName: string) => boolean;
            /**
             * Remove the child with the given name in a variable.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const variableRemoveChild: (variable: gdjs.Variable, childName: string) => void;
            /**
             * Clear the children in a variable.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const variableClearChildren: (variable: gdjs.Variable) => void;
            /**
             * Pushes a variable onto an array.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const variablePushCopy: (array: gdjs.Variable, variable: gdjs.Variable) => void;
            /**
             * Pushes a value onto an array.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const valuePush: (array: gdjs.Variable, value: string | float | boolean) => void;
            /**
             * Removes an index from an array.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const variableRemoveAt: (array: gdjs.Variable, index: number) => void;
            /**
             * Get the number of children in a variable.
             * This shortcut function is needed for events code generation.
             * @private
             */
            const getVariableChildCount: (variable: gdjs.Variable) => number;
            /**
             * Shortcut to get the first value of an array variable as a number.
             */
            const getFirstVariableNumber: (array: gdjs.Variable) => number;
            /**
             * Shortcut to get the last value of an array variable as a string.
             */
            const getFirstVariableString: (array: gdjs.Variable) => string;
            /**
             * Shortcut to get the last value of an array variable as a number.
             */
            const getLastVariableNumber: (array: gdjs.Variable) => number;
            /**
             * Shortcut to get the last value of an array variable as a string.
             */
            const getLastVariableString: (array: gdjs.Variable) => string;
        }
        namespace common {
            /** @deprecated */
            const getVariableNumber: (variable: Variable) => number;
            /** @deprecated */
            const getVariableString: (variable: Variable) => string;
            /** @deprecated */
            const getVariableBoolean: (variable: Variable, compareWith: boolean) => boolean;
            /** @deprecated */
            const setVariableBoolean: (variable: Variable, newValue: boolean) => void;
            /** @deprecated */
            const toggleVariableBoolean: (variable: Variable) => void;
            /** @deprecated */
            const sceneVariableExists: (runtimeScene: RuntimeScene, variableName: string) => boolean;
            /** @deprecated */
            const globalVariableExists: (instanceContainer: RuntimeInstanceContainer, variableName: string) => boolean;
            /** @deprecated */
            const variableChildExists: (variable: Variable, childName: string) => boolean;
            /** @deprecated */
            const variableRemoveChild: (variable: Variable, childName: string) => void;
            /** @deprecated */
            const variableClearChildren: (variable: Variable) => void;
            /** @deprecated */
            const variablePushCopy: (array: Variable, variable: Variable) => void;
            /** @deprecated */
            const valuePush: (array: Variable, value: string | number | boolean) => void;
            /** @deprecated */
            const variableRemoveAt: (array: Variable, index: number) => void;
            /** @deprecated */
            const getVariableChildCount: (variable: Variable) => number;
        }
    }
}
