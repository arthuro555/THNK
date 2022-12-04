import {
  Builder,
  Variable,
  CollectionOperation,
  CollectionOperationType,
  VariableTypes,
} from "t-h-n-k";

/**
 * A modified {@link gdjs.Variable} that keeps track of all modifications that were made to it.
 * This allows to only serialize the children that were modified, for minimal payloads.
 */
export class SyncedVariable extends gdjs.Variable {
  dirty: boolean = true;
  operations: {
    type: CollectionOperationType;
    targetName?: string | number;
    targetVariable?: SyncedVariable;
  }[] = [];

  static setupSyncedVariable(
    container: gdjs.VariablesContainer,
    variableName: string
  ) {
    const syncedVariable = new SyncedVariable();
    if (container.has(variableName))
      gdjs.Variable.copy(container.get(variableName), syncedVariable);
    container.add(variableName, syncedVariable);
    return syncedVariable;
  }

  static setupStateVariables(container: gdjs.VariablesContainer) {
    const publicStateVariable = SyncedVariable.setupSyncedVariable(
      container,
      "State"
    );
    const privateStateVariable = SyncedVariable.setupSyncedVariable(
      container,
      "PlayerState"
    );
    const teamStateVariable = SyncedVariable.setupSyncedVariable(
      container,
      "TeamState"
    );
    return { publicStateVariable, privateStateVariable, teamStateVariable };
  }

  reinitialize(varData?: VariableData | undefined) {
    this._type = "number";
    this._value = 0;
    this._str = "0";
    this._bool = false;
    this._children = {};
    this._childrenArray = [];
    this._undefinedInContainer = false;

    if (varData !== undefined) {
      this._type = varData.type || "number";
      if (this._type === "number") {
        this._value = parseFloat((varData.value as string) || "0");
        // Protect against NaN.
        if (this._value !== this._value) this._value = 0;
      } else if (this._type === "string") {
        this._str = "" + varData.value || "0";
      } else if (this._type === "boolean") {
        this._bool = !!varData.value;
      } else if (this._type === "structure") {
        if (varData.children !== undefined) {
          for (var i = 0, len = varData.children.length; i < len; ++i) {
            var childData = varData.children[i];
            if (childData.name === undefined) continue;
            const child = new SyncedVariable(childData);
            this._children[childData.name] = child;
            this.operations.push({
              type: CollectionOperationType.set,
              targetName: childData.name,
              targetVariable: child,
            });
          }
        }
      } else if (this._type === "array" && varData.children) {
        for (const childData of varData.children) {
          const child = new SyncedVariable(childData);
          this._childrenArray.push(child);
          this.operations.push({
            type: CollectionOperationType.set,
            targetName: childData.name,
            targetVariable: child,
          });
        }
      }
    }
  }

  setBoolean(newValue: boolean): void {
    if (newValue !== this._bool) this.dirty = true;
    super.setBoolean(newValue);
  }
  setNumber(newValue: number): void {
    if (newValue !== this._value) this.dirty = true;
    super.setNumber(newValue);
  }
  setString(newValue: string): void {
    if (newValue !== this._str) this.dirty = true;
    super.setString(newValue);
  }

  clearChildren(): void {
    this.dirty = true;
    this.operations.length = 0;
    this.operations.push({ type: CollectionOperationType.clear });
    super.clearChildren();
  }

  static _convertToSyncedVariable(v: gdjs.Variable): SyncedVariable {
    const sv = v as SyncedVariable;
    if (Object.getPrototypeOf(sv) !== SyncedVariable.prototype) {
      Object.setPrototypeOf(sv, SyncedVariable.prototype);
      sv.operations = [];
      sv.dirty = true;

      if (sv._type === "array") {
        const len = sv._childrenArray.length;
        for (let i = 0; i < len; i++) {
          sv.operations.push({
            type: CollectionOperationType.set,
            targetName: i,
            targetVariable: this._convertToSyncedVariable(sv._childrenArray[i]),
          });
        }
      } else if (sv._type === "structure") {
        for (const childName in sv._children) {
          sv.operations.push({
            type: CollectionOperationType.set,
            targetName: childName,
            targetVariable: this._convertToSyncedVariable(
              sv._children[childName]
            ),
          });
        }
      }
    }
    return sv;
  }

  addChild(childName: string, childVariable: gdjs.Variable): this {
    this.dirty = true;
    childVariable = SyncedVariable._convertToSyncedVariable(childVariable);
    this.operations.push({
      type: CollectionOperationType.set,
      targetName: childName,
      targetVariable: childVariable as SyncedVariable,
    });
    return super.addChild(childName, childVariable);
  }
  getChild(childName: string): gdjs.Variable {
    if (this.isPrimitive()) this.castTo("structure");

    if (this._type === "array")
      return this.getChildAt(parseInt(childName, 10) || 0);

    if (
      this._children[childName] === undefined ||
      this._children[childName] === null
    ) {
      this.dirty = true;
      const newChild = new SyncedVariable();
      this._children[childName] = newChild;
      this.operations.push({
        type: CollectionOperationType.set,
        targetName: childName,
        targetVariable: newChild,
      });
    }
    return this._children[childName];
  }
  getChildAt(index: integer) {
    this.castTo("array");
    if (
      this._childrenArray[index] === undefined ||
      this._childrenArray[index] === null
    ) {
      this.dirty = true;
      const newChild = new SyncedVariable();
      this._childrenArray[index] = newChild;
      this.operations.push({
        type: CollectionOperationType.set,
        targetName: index,
        targetVariable: newChild,
      });
    }
    return this._childrenArray[index];
  }
  removeChild(childName: string): void {
    super.removeChild(childName);
    this.operations.push({
      type: CollectionOperationType.remove,
      targetName: childName,
    });
  }
  removeAtIndex(index: number): void {
    super.removeAtIndex(index);
    this.operations.push({
      type: CollectionOperationType.remove,
      targetName: index,
    });
  }
  pushValue(value: string | number | boolean): void {
    this.dirty = true;
    const lastIndex = this._childrenArray.length;
    this.castTo("array");
    this._childrenArray.push(
      new SyncedVariable({
        type: typeof value as "string" | "number" | "boolean",
        value,
      })
    );
    this.operations.push({
      type: CollectionOperationType.set,
      targetName: lastIndex,
      targetVariable: this._childrenArray[lastIndex] as SyncedVariable,
    });
  }
  pushVariableCopy(variable: gdjs.Variable): void {
    this.dirty = true;
    const lastIndex = this._childrenArray.length;
    this.castTo("array");
    this._childrenArray.push(
      gdjs.Variable.copy(variable, new SyncedVariable())
    );
    this.operations.push({
      type: CollectionOperationType.set,
      targetName: lastIndex,
      targetVariable: this._childrenArray[lastIndex] as SyncedVariable,
    });
  }

  getAllChildrenArray(): SyncedVariable[] {
    return super.getAllChildrenArray() as SyncedVariable[];
  }
  getAllChildren(): { [x: string]: SyncedVariable } {
    return super.getAllChildren() as { [x: string]: SyncedVariable };
  }

  /**
   * Checks whether the current variable or any children have been modified,
   * as that means it should get serialized.
   */
  isDirty(): boolean {
    if (this.dirty) return true;
    if (!this.isPrimitive()) {
      for (const child of this.getAllChildrenArray() as SyncedVariable[]) {
        if (child.isDirty()) {
          this.dirty = true;
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Serialize the current variable and mark it back as unmodified.
   *
   * Deserialization is a standalone functions, as there is no need
   * for mutation tracking on client variables and therefore this
   * SyncedVariable is not used there.
   */
  serialize(builder: Builder): number {
    this.dirty = false;

    switch (this.getType()) {
      case "number":
        Variable.startVariable(builder);
        Variable.addType(builder, VariableTypes.number);
        Variable.addNumber(builder, this._value);
        return Variable.endVariable(builder);
      case "string":
        const str = builder.createSharedString(this._str);
        Variable.startVariable(builder);
        Variable.addType(builder, VariableTypes.text);
        Variable.addText(builder, str);
        return Variable.endVariable(builder);
      case "boolean":
        Variable.startVariable(builder);
        Variable.addType(builder, VariableTypes.boolean);
        Variable.addBoolean(builder, this._bool);
        return Variable.endVariable(builder);
    }

    const operations = [];
    for (const operation of this.operations) {
      const targetName =
        typeof operation.targetName === "string"
          ? builder.createString(operation.targetName)
          : null;
      const targetIndex =
        typeof operation.targetName === "number" ? operation.targetName : null;
      const targetVariable = operation.targetVariable
        ? operation.targetVariable.serialize(builder)
        : null;

      CollectionOperation.startCollectionOperation(builder);
      CollectionOperation.addOperation(builder, operation.type);
      if (targetName) CollectionOperation.addName(builder, targetName);
      if (targetIndex) CollectionOperation.addIndex(builder, targetIndex);
      if (targetVariable) CollectionOperation.addVal(builder, targetVariable);
      operations.push(CollectionOperation.endCollectionOperation(builder));
    }

    this.operations.length = 0;

    if (this._type === "array") {
      for (const _index in this._childrenArray) {
        const index = +_index;
        const child = this._childrenArray[index] as SyncedVariable;
        if (child.isDirty()) {
          const childOffset = child.serialize(builder);
          CollectionOperation.startCollectionOperation(builder);
          CollectionOperation.addOperation(
            builder,
            CollectionOperationType.set
          );
          CollectionOperation.addIndex(builder, index);
          CollectionOperation.addVal(builder, childOffset);
          operations.push(CollectionOperation.endCollectionOperation(builder));
        }
      }
    } else {
      for (const [childName, child] of Object.entries(this.getAllChildren())) {
        if (child.isDirty()) {
          const childNameOffset = builder.createString(childName);
          const childOffset = child.serialize(builder);
          CollectionOperation.startCollectionOperation(builder);
          CollectionOperation.addOperation(
            builder,
            CollectionOperationType.set
          );
          CollectionOperation.addName(builder, childNameOffset);
          CollectionOperation.addVal(builder, childOffset);
          operations.push(CollectionOperation.endCollectionOperation(builder));
        }
      }
    }

    const operationsOffset = Variable.createOperationsVector(
      builder,
      operations
    );

    Variable.startVariable(builder);
    Variable.addType(
      builder,
      this._type === "structure" ? VariableTypes.structure : VariableTypes.array
    );
    Variable.addOperations(builder, operationsOffset);
    return Variable.endVariable(builder);
  }

  serializeToBinary() {
    const builder = new Builder(64);
    builder.finish(this.serialize(builder));
    return builder.asUint8Array();
  }
}
