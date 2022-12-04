import { type Builder, GameObject, ObjState } from "t-h-n-k";
import { packVariable } from "utils/VariablePacker";
import { serializeRGB } from "./SerializeRGB";

export const makeObjectSnapshot = (
  builder: Builder,
  obj: gdjs.RuntimeObject,
  forPlayer: string
): number => {
  const textOffset = obj.getString
    ? builder.createSharedString(obj.getString())
    : null;

  ObjState.startObjState(builder);

  ObjState.addX(builder, obj.getX());
  ObjState.addY(builder, obj.getY());
  ObjState.addHeight(builder, obj.getHeight());
  ObjState.addWidth(builder, obj.getWidth());
  ObjState.addAngle(builder, obj.getAngle());

  // TODO Remove when optional scalars are fixed
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
  if (obj.getX() === 0) ObjState.addSetXTo0(builder, true);
  if (obj.getY() === 0) ObjState.addSetYTo0(builder, true);
  if (obj.getHeight() === 0) ObjState.addSetHeightTo0(builder, true);
  if (obj.getWidth() === 0) ObjState.addSetWidthTo0(builder, true);
  if (obj.getAngle() === 0) ObjState.addSetAngleTo0(builder, true);
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

  if (obj.getZOrder() <= 65_535) {
    ObjState.addZOrder(
      builder,
      obj.getZOrder() + 1 // TODO: Remove 1 offset once optional scalars are fixed
    );
  } else {
    ObjState.addBigZOrder(
      builder,
      obj.getZOrder() + 1 // TODO: Remove 1 offset once optional scalars are fixed
    );
  }

  // TODO: Convert to boolean once optional scalars are fixed
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
  ObjState.addVisible(builder, obj.isHidden() ? 1 : 2);
  if (obj.isFlippedX) ObjState.addFlippedX(builder, obj.isFlippedX() ? 1 : 2);
  if (obj.isFlippedY) ObjState.addFlippedY(builder, obj.isFlippedY() ? 1 : 2);
  //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

  if (obj.getOpacity) {
    if (obj.getOpacity() !== 0) ObjState.addOpacity(builder, obj.getOpacity());
    else ObjState.addSetOpacityTo0(builder, true); // TODO Remove when optional scalars are fixed
  }

  if (obj.getAnimation) {
    ObjState.addAnimation(
      builder,
      obj.getAnimation() + 1 // TODO: Remove 1 offset once optional scalars are fixed
    );
  }

  if (obj.getColor)
    ObjState.addTint(builder, serializeRGB(builder, obj.getColor()));

  if (textOffset) ObjState.addText(builder, textOffset);

  const objStateOffset = ObjState.endObjState(builder);

  const { stateVariables } = obj;
  const { publicStateVariable, privateStateVariable } = stateVariables;

  const publicStateOffset =
    publicStateVariable.getChildrenCount() !== 0
      ? GameObject.createPackedPublicStateVector(
          builder,
          packVariable(publicStateVariable)
        )
      : null;

  const playerStateVariable = privateStateVariable.getChild(forPlayer);
  const privateStateOffset =
    playerStateVariable.getChildrenCount() !== 0
      ? GameObject.createPackedPrivateStateVector(
          builder,
          packVariable(playerStateVariable)
        )
      : null;

  const name = builder.createSharedString(obj.getName());

  GameObject.startGameObject(builder);
  GameObject.addId(builder, obj.thnkID);
  GameObject.addName(builder, name);
  GameObject.addObjState(builder, objStateOffset);
  if (publicStateOffset)
    GameObject.addPackedPublicState(builder, publicStateOffset);
  if (privateStateOffset)
    GameObject.addPackedPrivateState(builder, privateStateOffset);
  return GameObject.endGameObject(builder);
};
