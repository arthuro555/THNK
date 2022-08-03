declare namespace gdjs {
  /**
   * Children of a structure.
   */
  type Children = Record<string, gdjs.Variable>;
  /**
   * A Variable is an object storing a value (number or a string) or children variables.
   */
  export class Variable {
    _type: VariableType;
    _value: float;
    _str: string;
    _bool: boolean;
    _children: Children;
    _childrenArray: gdjs.Variable[];
    _undefinedInContainer: boolean;
    /**
     * @param [varData] The optional initial content of the variable.
     */
    constructor(varData?: VariableData);
    reinitialize(varData?: VariableData | undefined): void;
    /**
     * Return true if the variable type is a primitive type.
     */
    static isPrimitive(
      type: VariableType
    ): type is "string" | "number" | "boolean";
    /**
     * Deeply copies a variable into another.
     * @param source The source variable.
     * @param target The target variable.
     * @param merge Should the target be merged with the source, or be an exact copy?
     * @returns The target variable.
     */
    static copy(
      source: gdjs.Variable,
      target: gdjs.Variable,
      merge?: boolean
    ): gdjs.Variable;
    /**
     * Converts a JavaScript object into a value compatible
     * with GDevelop variables and store it inside this variable.
     * @param obj - The value to convert.
     */
    fromJSObject(obj: any): this;
    /**
     * Unserialize a JSON string into this variable.
     *
     * This just logs an error if the JSON is invalid.
     *
     * @param json - A JSON string.
     */
    fromJSON(json: string): this;
    /**
     * Converts this variable into an equivalent JavaScript object.
     * @returns A JavaScript object equivalent to the variable.
     */
    toJSObject(): any;
    /**
     * Return true if the type of the variable is a primitive type.
     */
    isPrimitive(): boolean;
    /**
     * Returns a deep copy of this variable.
     */
    clone(): gdjs.Variable;
    /**
     * Used (usually by gdjs.VariablesContainer) to set that the variable must be
     * considered as not existing in the container.
     */
    setUndefinedInContainer(): void;
    /**
     * Check if the variable must be considered as not existing in its container
     * (usually a gdjs.VariablesContainer).
     * @return true if the container must consider that the variable does not exist.
     */
    isUndefinedInContainer(): boolean;
    /**
     * Converts the variable into another type.
     * @param newType The new type of the variable
     */
    castTo(newType: VariableType): void;
    /**
     * Get the child with the specified name.
     *
     * If the variable has not the specified child, an empty variable with the specified name
     * is added as child.
     * @returns The child variable
     */
    getChild(childName: string): gdjs.Variable;
    /**
     * Add a child variable with the specified name.
     *
     * If there is an existing child variable with this name, it is erased.
     * @param childName The name of the variable to add
     * @param childVariable The variable to add as a child
     * @returns The variable (for chaining calls)
     */
    addChild(childName: string, childVariable: gdjs.Variable): this;
    /**
     * Return the child in a variable.
     *
     * Check if the variable has the specified children
     * @return true if variable has the children with the specified name
     */
    hasChild(childName: string): boolean;
    /**
     * Remove the child with the specified name.
     *
     * If the variable has not the specified child, nothing is done.
     * @param childName The name of the child to be removed
     */
    removeChild(childName: string): void;
    /**
     * Remove all the children.
     */
    clearChildren(): void;
    /**
     * Replaces all the children with a new map of children.
     * @param newChildren The map of new children.
     */
    replaceChildren(newChildren: Children): void;
    /**
     * Replaces all the children with a new array of children.
     * @param newChildren The array of new children.
     */
    replaceChildrenArray(newChildren: gdjs.Variable[]): void;
    /**
     * Get the value of the variable, considered as a number
     * @return The number stored in the variable
     */
    getAsNumber(): float;
    /**
     * Change the value of the variable, considered as a number
     * @param newValue The new value to be set
     */
    setNumber(newValue: float): void;
    /**
     * Get the value of the variable, considered as a string
     * @return The string stored in the variable
     */
    getAsString(): string;
    /**
     * Change the value of the variable, considered as a string
     * @param newValue The new string to be set
     */
    setString(newValue: string): void;
    /**
     * Get the value of the variable, considered as a boolean
     * @return The boolean value of the variable.
     */
    getAsBoolean(): boolean;
    /**
     * Change the value of the variable, considered as a boolean
     * @param newValue The new boolean to be set.
     */
    setBoolean(newValue: boolean): void;
    /**
     * Sets the primitive value using the setter of the current type.
     * @param newValue The primitive value of the variable.
     */
    setValue(newValue: string | float | boolean): void;
    /**
     * Gets the primitive value using the getter of the current type.
     */
    getValue(): string | float | boolean;
    /**
     * Return true if the variable is a structure.
     * @return true if the variable is a structure.
     * @deprecated Use {@link gdjs.Variable.getType} instead.
     */
    isStructure(): boolean;
    /**
     * Return true if the variable is a number.
     * @return true if the variable is a number.
     * @deprecated Use {@link gdjs.Variable.getType} instead.
     */
    isNumber(): boolean;
    /**
     * Returns the type of the variable.
     */
    getType(): VariableType;
    /**
     * Return the object containing all the children of the variable.
     * @return All the children of the variable
     */
    getAllChildren(): Children;
    /**
     * Return an Array containing all the children of the variable.
     */
    getAllChildrenArray(): gdjs.Variable[];
    /**
     * Return the length of the collection.
     */
    getChildrenCount(): integer;
    /**
     * Add the given number to the variable value
     * @param val the number to add
     */
    add(val: float): void;
    /**
     * Subtract the given number to the variable value
     * @param val the number to subtract
     */
    sub(val: float): void;
    /**
     * Multiply the variable value by the given number
     * @param val the factor
     */
    mul(val: float): void;
    /**
     * Divide the variable value by the given number
     * @param val the divisor
     */
    div(val: float): void;
    /**
     * Concatenate the given string at the end of the variable value
     * @param str the string to append
     */
    concatenateString(str: string): void;
    /**
     * @deprecated
     * @private
     * @alias concatenateString
     */
    concatenate(str: string): void;
    /**
     * Get a variable at a given index of the array.
     */
    getChildAt(index: integer): Variable;
    /**
     * Removes a variable at a given index of the array.
     */
    removeAtIndex(index: integer): void;
    /**
     * Pushes a copy of a variable into the array.
     */
    pushVariableCopy(variable: gdjs.Variable): void;
    /**
     * Pushes a value into the array.
     */
    pushValue(value: string | float | boolean): void;
  }
  export {};
}
