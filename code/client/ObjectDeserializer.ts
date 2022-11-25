import { ByteBuffer, GameObject, Variable } from "t-h-n-k";
import { unpackVariable } from "utils/VariablePacker";
import { deserializeVariable } from "client/VariableDeserializer";

export const deserializeObject = (
  gameObject: GameObject,
  obj: gdjs.RuntimeObject
) => {
  const objState = gameObject.objState();
  if (objState) {
    const x = objState.x();
    if (x !== null) obj.setX(x);

    const y = objState.y();
    if (y !== null) obj.setY(y);

    const height = objState.height();
    if (height !== null) obj.setHeight(height);

    const width = objState.width();
    if (width !== null) obj.setWidth(width);

    const angle = objState.angle();
    if (angle !== null) obj.setAngle(angle);

    // prettier-ignore
    {
      // TODO Remove once optional scalars are fixed
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┐
      if (objState.setXTo0()) obj.setX(0);            // │
      if (objState.setYTo0()) obj.setY(0);            // │
      if (objState.setHeightTo0()) obj.setHeight(0);  // │
      if (objState.setWidthTo0()) obj.setWidth(0);    // │
      if (objState.setAngleTo0()) obj.setAngle(0);    // │
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┘
    }

    // prettier-ignore
    {
      // TODO Use a boolean once it becomes possible
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┐
      const visibility = objState.visible();                         // │
      if (visibility !== null) obj.hide(visibility === 1);           // │
                                                                     // │
      const flippedX = objState.flippedX();                          // │
      if (flippedX !== null && obj.flipX) obj.flipX(flippedX === 1); // │
                                                                     // │
      const flippedY = objState.flippedY();                          // │
      if (flippedY !== null && obj.flipY) obj.flipY(flippedY === 1); // │
      //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅//╶┘
    }

    const zOrder = objState.zOrder() ?? objState.bigZOrder();
    if (zOrder !== null) obj.setZOrder(zOrder - 1); // TODO Remove

    const opacity = objState.opacity();
    if (obj.setOpacity) {
      if (opacity !== null) obj.setOpacity(opacity);
      // TODO Remove once optional scalars are fixed
      if (objState.setOpacityTo0()) obj.setOpacity(0);
    }

    const animation = objState.animation();
    if (animation !== null && obj.setAnimation) obj.setAnimation(animation - 1);

    const text = objState.text();
    if (text !== null && obj.setString) obj.setString(text);
  }

  const stateVariable = obj.getVariables().get("State");
  const variables = gameObject.publicStateDiffArray();
  if (variables) {
    deserializeVariable(
      stateVariable,
      Variable.getRootAsVariable(new ByteBuffer(variables))
    );
  } else {
    const packedVariables = gameObject.packedVariablesArray();
    if (packedVariables) unpackVariable(stateVariable, packedVariables);
  }
};
