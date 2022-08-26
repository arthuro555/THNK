import { type Builder, GameObject, Transform } from "../t-h-n-k";

export const diffObject = (
  builder: Builder,
  obj: gdjs.RuntimeObject
): number | null => {
  let transformOffset = null;
  if (
    obj.getX() !== obj.prevX ||
    obj.getY() !== obj.prevY ||
    obj.getHeight() !== obj.prevHeight ||
    obj.getWidth() !== obj.prevWidth ||
    obj.getAngle() !== obj.prevAngle ||
    obj.getZOrder() !== obj.prevZOrder ||
    obj.isHidden() !== obj.prevVisibility ||
    (obj.isFlippedX && obj.isFlippedX() !== obj.prevFlippedX) ||
    (obj.isFlippedY && obj.isFlippedY() !== obj.prevFlippedY) ||
    (obj.getOpacity && obj.getOpacity() !== obj.prevOpacity) ||
    (obj.getAnimation && obj.getAnimation() !== obj.prevAnimation) ||
    (obj.getString && obj.getString() !== obj.prevText)
  ) {
    const textOffset =
      obj.getString && obj.getString() !== obj.prevText
        ? builder.createSharedString(obj.getString())
        : null;

    Transform.startTransform(builder);

    if (obj.getX() !== obj.prevX) {
      obj.prevX = obj.getX();
      if (obj.getX() !== 0) Transform.addX(builder, obj.getX());
      else Transform.addSetXTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getY() !== obj.prevY) {
      obj.prevY = obj.getY();
      if (obj.getY() !== 0) Transform.addY(builder, obj.getY());
      else Transform.addSetYTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getHeight() !== obj.prevHeight) {
      obj.prevHeight = obj.getHeight();
      if (obj.getHeight() !== 0) Transform.addHeight(builder, obj.getHeight());
      else Transform.addSetHeightTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getWidth() !== obj.prevWidth) {
      obj.prevWidth = obj.getWidth();
      if (obj.getWidth() !== 0) Transform.addWidth(builder, obj.getWidth());
      else Transform.addSetWidthTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getAngle() !== obj.prevAngle) {
      obj.prevAngle = obj.getAngle();
      if (obj.getAngle() !== 0) Transform.addAngle(builder, obj.getAngle());
      else Transform.addSetAngleTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    // TODO Remove offset once optional scalars are fixed
    if (obj.getZOrder() !== obj.prevZOrder) {
      obj.prevZOrder = obj.getZOrder();
      if (obj.getZOrder() <= 65_535)
        Transform.addZOrder(builder, obj.getZOrder() + 1);
      else Transform.addBigZOrder(builder, obj.getZOrder() + 1);
    }

    // TODO Replace with real booleans when optional scalars are fixed
    //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
    if (obj.isHidden() !== obj.prevVisibility) {
      obj.prevVisibility = obj.isHidden();
      Transform.addVisible(builder, obj.isHidden() ? 1 : 2);
    }

    if (obj.isFlippedX && obj.isFlippedX() !== obj.prevFlippedX) {
      obj.prevFlippedX = obj.isFlippedX();
      Transform.addFlippedX(builder, obj.isFlippedX() ? 1 : 2);
    }

    if (obj.isFlippedY && obj.isFlippedY() !== obj.prevFlippedY) {
      obj.prevFlippedY = obj.isFlippedY();
      Transform.addFlippedY(builder, obj.isFlippedY() ? 1 : 2);
    }
    //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

    if (obj.getOpacity && obj.getOpacity() !== obj.prevOpacity) {
      obj.prevOpacity = obj.getOpacity();
      if (obj.getOpacity() !== 0)
        Transform.addOpacity(builder, obj.getOpacity());
      else Transform.addSetOpacityTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    // TODO Remove offset once optional scalars are fixed
    if (obj.getAnimation && obj.getAnimation() !== obj.prevAnimation) {
      obj.prevAnimation = obj.getAnimation();
      Transform.addAnimation(builder, obj.getAnimation() + 1);
    }

    if (obj.getString && textOffset) {
      obj.prevText = obj.getString();
      Transform.addText(builder, textOffset);
    }

    transformOffset = Transform.endTransform(builder);
  }

  const { stateVariable } = obj;
  const variableOffset = stateVariable.isDirty()
    ? stateVariable.serialize(builder)
    : null;

  if (!transformOffset && !variableOffset) return null;

  GameObject.startGameObject(builder);
  GameObject.addId(builder, obj.thnkID);
  if (transformOffset) GameObject.addTransform(builder, transformOffset);
  if (variableOffset) GameObject.addVariables(builder, variableOffset);
  return GameObject.endGameObject(builder);
};
