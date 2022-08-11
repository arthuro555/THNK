export * as server from "./server";
export * as client from "./client";
export { ClientAdapter, ServerAdapter } from "./Adapter";
export * as settings from "./Settings";
export * as players from "./PlayerContext";

// A sort of polyfill to unify the different text objects get/set APIs.
{
  if (gdjs.BBTextRuntimeObject) {
    gdjs.BBTextRuntimeObject.prototype.getString =
      gdjs.BBTextRuntimeObject.prototype.getBBText;
    gdjs.BBTextRuntimeObject.prototype.setString =
      gdjs.BBTextRuntimeObject.prototype.setBBText;
  }
  if (gdjs.BitmapTextRuntimeObject) {
    gdjs.BitmapTextRuntimeObject.prototype.getString =
      gdjs.BitmapTextRuntimeObject.prototype.getText;
    gdjs.BitmapTextRuntimeObject.prototype.setString =
      gdjs.BitmapTextRuntimeObject.prototype.setText;
  }
}
