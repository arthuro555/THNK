import { pack, unpack } from "msgpackr";

export const packVariable = (variable: gdjs.Variable) => {
  return pack(variable.toJSObject());
};

export const unpackVariable = (
  variable: gdjs.Variable,
  packedVar: Uint8Array
) => {
  return variable.fromJSObject(unpack(packedVar));
};
