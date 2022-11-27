import { Builder, RGB } from "t-h-n-k";

export type RGBString = string | `${number};${number};${number}`;
export const serializeRGB = (builder: Builder, rgb: RGBString) => {
  const [r, g, b] = rgb.split(";").map((color) => parseInt(color, 10));
  return RGB.createRGB(builder, r, g, b);
};
