import { type Builder, GameObject, Transform } from "../t-h-n-k";

export const diffObject = (
  builder: Builder,
  obj: gdjs.RuntimeObject
): number | null => {
  let transformOffset = null;
  if (
    obj.getX() !== obj.prevX ||
    obj.getY() !== obj.prevY ||
    obj.getAngle() !== obj.prevAngle ||
    (obj.getScale && obj.getScale() !== obj.prevScale)
  ) {
    Transform.startTransform(builder);

    if (obj.getX() !== obj.prevX) {
      obj.prevX = obj.getX();
      Transform.addX(builder, obj.getX());
    }

    if (obj.getY() !== obj.prevY) {
      obj.prevY = obj.getY();
      Transform.addY(builder, obj.getY());
    }

    if (obj.getHeight() !== obj.prevHeight) {
      obj.prevHeight = obj.getHeight();
      Transform.addHeight(builder, obj.getHeight());
    }

    if (obj.getWidth() !== obj.prevWidth) {
      obj.prevWidth = obj.getWidth();
      Transform.addWidth(builder, obj.getWidth());
    }

    if (obj.getAngle() !== obj.prevAngle) {
      obj.prevAngle = obj.getAngle();
      Transform.addAngle(builder, obj.getAngle());
    }

    if (obj.getScale && obj.getScale() !== obj.prevScale) {
      obj.prevScale = obj.getScale();
      Transform.addScale(builder, obj.getScale());
    }

    if (obj.getZOrder() !== obj.prevZOrder) {
      obj.prevZOrder = obj.getZOrder();
      if (obj.getZOrder() <= 65_535)
        Transform.addZOrder(builder, obj.getZOrder());
      else Transform.addBigZOrder(builder, obj.getZOrder());
    }

    if (obj.isHidden() !== obj.prevVisibility) {
      obj.prevVisibility = obj.isHidden();
      Transform.addVisible(builder, obj.isHidden());
    }

    if (obj.getOpacity && obj.getOpacity() !== obj.prevOpacity) {
      obj.prevOpacity = obj.getOpacity();
      Transform.addOpacity(builder, obj.getOpacity());
    }

    if (obj.getAnimation && obj.getAnimation() !== obj.prevAnimation) {
      obj.prevAnimation = obj.getAnimation();
      Transform.addAnimation(builder, obj.getAnimation());
    }

    if (obj.getString && obj.getString() !== obj.prevText) {
      obj.prevText = obj.getString();
      const textOffset = builder.createSharedString(obj.getString());
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
