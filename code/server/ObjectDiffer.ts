import { type Builder, GameObject, ObjState } from "../t-h-n-k";

export const diffObject = (
  builder: Builder,
  obj: gdjs.RuntimeObject
): number | null => {
  let objStateOffset = null;
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

    ObjState.startObjState(builder);

    if (obj.getX() !== obj.prevX) {
      obj.prevX = obj.getX();
      if (obj.getX() !== 0) ObjState.addX(builder, obj.getX());
      else ObjState.addSetXTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getY() !== obj.prevY) {
      obj.prevY = obj.getY();
      if (obj.getY() !== 0) ObjState.addY(builder, obj.getY());
      else ObjState.addSetYTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getHeight() !== obj.prevHeight) {
      obj.prevHeight = obj.getHeight();
      if (obj.getHeight() !== 0) ObjState.addHeight(builder, obj.getHeight());
      else ObjState.addSetHeightTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getWidth() !== obj.prevWidth) {
      obj.prevWidth = obj.getWidth();
      if (obj.getWidth() !== 0) ObjState.addWidth(builder, obj.getWidth());
      else ObjState.addSetWidthTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    if (obj.getAngle() !== obj.prevAngle) {
      obj.prevAngle = obj.getAngle();
      if (obj.getAngle() !== 0) ObjState.addAngle(builder, obj.getAngle());
      else ObjState.addSetAngleTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    // TODO Remove offset once optional scalars are fixed
    if (obj.getZOrder() !== obj.prevZOrder) {
      obj.prevZOrder = obj.getZOrder();
      if (obj.getZOrder() <= 65_535)
        ObjState.addZOrder(builder, obj.getZOrder() + 1);
      else ObjState.addBigZOrder(builder, obj.getZOrder() + 1);
    }

    // TODO Replace with real booleans when optional scalars are fixed
    //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
    if (obj.isHidden() !== obj.prevVisibility) {
      obj.prevVisibility = obj.isHidden();
      ObjState.addVisible(builder, obj.isHidden() ? 1 : 2);
    }

    if (obj.isFlippedX && obj.isFlippedX() !== obj.prevFlippedX) {
      obj.prevFlippedX = obj.isFlippedX();
      ObjState.addFlippedX(builder, obj.isFlippedX() ? 1 : 2);
    }

    if (obj.isFlippedY && obj.isFlippedY() !== obj.prevFlippedY) {
      obj.prevFlippedY = obj.isFlippedY();
      ObjState.addFlippedY(builder, obj.isFlippedY() ? 1 : 2);
    }
    //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

    if (obj.getOpacity && obj.getOpacity() !== obj.prevOpacity) {
      obj.prevOpacity = obj.getOpacity();
      if (obj.getOpacity() !== 0)
        ObjState.addOpacity(builder, obj.getOpacity());
      else ObjState.addSetOpacityTo0(builder, true); // TODO Remove once optional scalars are fixed
    }

    // TODO Remove offset once optional scalars are fixed
    if (obj.getAnimation && obj.getAnimation() !== obj.prevAnimation) {
      obj.prevAnimation = obj.getAnimation();
      ObjState.addAnimation(builder, obj.getAnimation() + 1);
    }

    if (obj.getString && textOffset) {
      obj.prevText = obj.getString();
      ObjState.addText(builder, textOffset);
    }

    objStateOffset = ObjState.endObjState(builder);
  }

  const { stateVariable } = obj;
  const variableOffset = stateVariable.isDirty()
    ? stateVariable.serialize(builder)
    : null;

  if (!objStateOffset && !variableOffset) return null;

  GameObject.startGameObject(builder);
  GameObject.addId(builder, obj.thnkID);
  if (objStateOffset) GameObject.addObjState(builder, objStateOffset);
  if (variableOffset) GameObject.addVariables(builder, variableOffset);
  return GameObject.endGameObject(builder);
};
