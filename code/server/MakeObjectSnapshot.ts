import { type Builder, GameObject, Transform } from "../t-h-n-k";
import { packVariable } from "../VariablePacker";

export const makeObjectSnapshot = (
  builder: Builder,
  obj: gdjs.RuntimeObject
): number => {
  const textOffset = obj.getString
    ? builder.createSharedString(obj.getString())
    : null;

  Transform.startTransform(builder);

  Transform.addX(builder, obj.getX());
  Transform.addY(builder, obj.getY());
  Transform.addHeight(builder, obj.getHeight());
  Transform.addWidth(builder, obj.getWidth());
  Transform.addAngle(builder, obj.getAngle());

  // TODO Remove when optional scalars are fixed
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
  if (obj.getX() === 0) Transform.addSetXTo0(builder, true);
  if (obj.getY() === 0) Transform.addSetYTo0(builder, true);
  if (obj.getHeight() === 0) Transform.addSetHeightTo0(builder, true);
  if (obj.getWidth() === 0) Transform.addSetWidthTo0(builder, true);
  if (obj.getWidth() === 0) Transform.addSetAngleTo0(builder, true);
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

  if (obj.getZOrder() <= 65_535) {
    Transform.addZOrder(
      builder,
      obj.getZOrder() + 1 // TODO: Remove 1 offset once optional scalars are fixed
    );
  } else {
    Transform.addBigZOrder(
      builder,
      obj.getZOrder() + 1 // TODO: Remove 1 offset once optional scalars are fixed
    );
  }

  // TODO: Convert to boolean once optional scalars are fixed
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
  Transform.addVisible(builder, obj.isHidden() ? 1 : 2);
  if (obj.isFlippedX) Transform.addFlippedX(builder, obj.isFlippedX() ? 1 : 2);
  if (obj.isFlippedY) Transform.addFlippedY(builder, obj.isFlippedY() ? 1 : 2);
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

  if (obj.getOpacity) {
    if (obj.getOpacity() !== 0) Transform.addOpacity(builder, obj.getOpacity());
    else Transform.addSetOpacityTo0(builder, true); // TODO Remove when optional scalars are fixed
  }

  if (obj.getAnimation) {
    Transform.addAnimation(
      builder,
      obj.getAnimation() + 1 // TODO: Remove 1 offset once optional scalars are fixed
    );
  }

  if (textOffset) Transform.addText(builder, textOffset);

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
  if (variableOffset) GameObject.addPackedVariables(builder, variableOffset);
  return GameObject.endGameObject(builder);
};
