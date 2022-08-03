declare namespace gdjs {
    /**
     * VariablesContainer stores variables, usually for a a RuntimeGame, a RuntimeScene
     * or a RuntimeObject.
     */
    class VariablesContainer {
        _variables: Hashtable<gdjs.Variable>;
        _variablesArray: gdjs.Variable[];
        /**
         * @param [initialVariablesData] Optional array containing representations of the base variables.
         */
        constructor(initialVariablesData?: VariableData[]);
        /**
         * Initialize variables from a container data.<br>
         * If `keepOldVariables` is set to false (by default), all already existing variables will be
         * erased, but the new variables will be accessible thanks to getFromIndex. <br>
         * if `keepOldVariables` is set to true, already existing variables won't be erased and will be
         * still accessible thanks to getFromIndex.
         *
         * @param data The array containing data used to initialize variables.
         * @param [keepOldVariables] If set to true, already existing variables won't be erased.
         */
        initFrom(data: VariableData[], keepOldVariables?: Boolean): void;
        /**
         * Add a new variable.
         * This can be costly, don't use in performance sensitive paths.
         *
         * @param name Variable name
         * @param newVariable The variable to be added
         */
        add(name: string, newVariable: gdjs.Variable): void;
        /**
         * Remove a variable.
         * (the variable is not really removed from the container to avoid creating garbage, but marked as undefined)
         * @param name Variable to be removed
         */
        remove(name: string): void;
        /**
         * Get a variable.
         * @param name The variable's name
         * @return The specified variable. If not found, an empty variable is added to the container.
         */
        get(name: string): gdjs.Variable;
        /**
         * Get a variable using its index. If you're unsure about how to use this method, prefer to use `get`.
         * The index of a variable is its index in the data passed to initFrom.
         *
         * This method is generally used by events generated code to increase lookup speed for variables.
         *
         * @param id The variable index
         * @return The specified variable. If not found, an empty variable is added to the container, but it
         * should not happen.
         */
        getFromIndex(id: number): gdjs.Variable;
        /**
         * Check if a variable exists in the container.
         * @param name The variable's name
         * @return true if the variable exists.
         */
        has(name: string): boolean;
        static _deletedVars: Array<string | undefined>;
        /**
         * "Bad" variable container, used by events when no other valid container can be found.
         * This container has no state and always returns the bad variable ( see VariablesContainer.badVariable ).
         * @static
         */
        static badVariablesContainer: VariablesContainer;
        /**
         * "Bad" variable, used by events when no other valid variable can be found.
         * This variable has no state and always return 0 or the empty string.
         * @static
         */
        static badVariable: Variable;
    }
}
