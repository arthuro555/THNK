import { type Builder, GameObject, Transform } from "../t-h-n-k";
import { packVariable } from "../VariablePacker";

export const makeObjectSnapshot = (
  builder: Builder,
  obj: gdjs.RuntimeObject
): number => {
  Transform.startTransform(builder);

  Transform.addX(builder, obj.getX());
  Transform.addY(builder, obj.getY());
  Transform.addHeight(builder, obj.getHeight());
  Transform.addWidth(builder, obj.getWidth());
  Transform.addAngle(builder, obj.getAngle());
  Transform.addVisible(builder, obj.isHidden());
  if (obj.getScale) Transform.addScale(builder, obj.getScale());
  if (obj.getZOrder() <= 65_535) Transform.addZOrder(builder, obj.getZOrder());
  else Transform.addBigZOrder(builder, obj.getZOrder());
  if (obj.getOpacity) Transform.addOpacity(builder, obj.getOpacity());
  if (obj.getAnimation) Transform.addAnimation(builder, obj.getAnimation());
  if (obj.getString) {
    const textOffset = builder.createSharedString(obj.getString());
    Transform.addText(builder, textOffset);
  }

  const transformOffset = Transform.endTransform(builder);

  const { stateVariable } = obj;
  const variableOffset =
    stateVariable.getChildrenCount() !== 0
      ? GameObject.createPackedVariablesVector(
          builder,
          packVariable(stateVariable)
        )
      : null;

  const name = builder.createSharedString(obj.getName());

  GameObject.startGameObject(builder);
  GameObject.addId(builder, obj.thnkID);
  GameObject.addName(builder, name);
  GameObject.addTransform(builder, transformOffset);
  if (variableOffset) GameObject.addVariables(builder, variableOffset);
  return GameObject.endGameObject(builder);
};
