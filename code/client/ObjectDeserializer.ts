import { GameObject } from "../t-h-n-k";
import { unpackVariable } from "../VariablePacker";
import { deserializeVariable } from "./VariableDeserializer";

export const deserializeObject = (
  gameObject: GameObject,
  obj: gdjs.RuntimeObject
) => {
  const transform = gameObject.transform();
  if (transform) {
    const x = transform.x();
    if (x !== null) obj.setX(x);

    const y = transform.y();
    if (y !== null) obj.setY(y);

    const height = transform.height();
    if (height !== null) obj.setHeight(height);

    const width = transform.width();
    if (width !== null) obj.setWidth(width);

    const angle = transform.angle();
    if (angle !== null) obj.setAngle(angle);

    const visibility = transform.visible();
    if (visibility !== null) obj.hide(visibility);

    const flippedX = transform.flippedX();
    if (flippedX !== null && obj.flipX) obj.flipX(flippedX);

    const flippedY = transform.flippedY();
    if (flippedY !== null && obj.flipY) obj.flipY(flippedY);

    const zOrder = transform.zOrder() ?? transform.bigZOrder();
    if (zOrder !== null) obj.setZOrder(zOrder);

    const opacity = transform.opacity();
    if (opacity !== null && obj.setOpacity) obj.setOpacity(opacity);

    const animation = transform.animation();
    if (animation !== null && obj.setAnimation) obj.setAnimation(animation);

    const text = transform.text();
    if (text !== null && obj.setString) obj.setString(text);
  }

  const stateVariable = obj.getVariables().get("State");
  const variables = gameObject.variables();
  if (variables) deserializeVariable(stateVariable, variables);
  else {
    const packedVariables = gameObject.packedVariablesArray();
    if (packedVariables) unpackVariable(stateVariable, packedVariables);
  }
};
