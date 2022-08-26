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

    // prettier-ignore
    {
      // TODO Remove once optional scalars are fixed
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┐
      if (transform.setXTo0()) obj.setX(0);           // │
      if (transform.setYTo0()) obj.setY(0);           // │
      if (transform.setHeightTo0()) obj.setHeight(0); // │
      if (transform.setWidthTo0()) obj.setWidth(0);   // │
      if (transform.setAngleTo0()) obj.setAngle(0);   // │
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┘
    }

    // prettier-ignore
    {
      // TODO Use a boolean once it becomes possible
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┐
      const visibility = transform.visible();                        // │
      if (visibility !== null) obj.hide(visibility === 1);           // │
                                                                     // │
      const flippedX = transform.flippedX();                         // │
      if (flippedX !== null && obj.flipX) obj.flipX(flippedX === 1); // │
                                                                     // │
      const flippedY = transform.flippedY();                         // │
      if (flippedY !== null && obj.flipY) obj.flipY(flippedY === 1); // │
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┘
    }

    const zOrder = transform.zOrder() ?? transform.bigZOrder();
    if (zOrder !== null) obj.setZOrder(zOrder - 1); // TODO Remove

    const opacity = transform.opacity();
    if (obj.setOpacity) {
      if (opacity !== null) obj.setOpacity(opacity);
      // TODO Remove once optional scalars are fixed
      if (transform.setOpacityTo0()) obj.setOpacity(0);
    }

    const animation = transform.animation();
    if (animation !== null && obj.setAnimation) obj.setAnimation(animation - 1);

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
