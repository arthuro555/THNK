import { VariableTypes, CollectionOperationType, Variable } from "t-h-n-k";

export const deserializeVariable = (
  variable: gdjs.Variable,
  fbVariable: Variable
) => {
  switch (fbVariable.type()) {
    case VariableTypes.text:
      variable.setString(fbVariable.text()!);
      return variable;
    case VariableTypes.number:
      variable.setNumber(fbVariable.number());
      return variable;
    case VariableTypes.boolean:
      variable.setBoolean(fbVariable.boolean());
      return variable;
  }

  if (fbVariable.type() === VariableTypes.structure) {
    variable.castTo("structure");
    for (
      let len = fbVariable.operationsLength(),
        i = 0,
        op = fbVariable.operations(0)!;
      i < len;
      op = fbVariable.operations(++i)!
    ) {
      switch (op.operation()) {
        case CollectionOperationType.set:
          const childName = op.name();
          const child = op.val();
          if (childName && child)
            deserializeVariable(variable.getChild(childName), child);
          continue;
        case CollectionOperationType.remove:
          const childToRemove = op.name();
          if (childToRemove) variable.removeChild(childToRemove);
          continue;
        case CollectionOperationType.clear:
          variable.clearChildren();
          continue;
      }
    }
  } else {
    variable.castTo("array");
    for (
      let len = fbVariable.operationsLength(),
        i = 0,
        op = fbVariable.operations(0)!;
      i < len;
      op = fbVariable.operations(++i)!
    ) {
      switch (op.operation()) {
        case CollectionOperationType.set:
          const child = op.val();
          if (child)
            deserializeVariable(variable.getChildAt(op.index()), child);
          continue;
        case CollectionOperationType.remove:
          variable.removeAtIndex(op.index());
          continue;
        case CollectionOperationType.clear:
          variable.clearChildren();
          continue;
      }
    }
  }

  return variable;
};
