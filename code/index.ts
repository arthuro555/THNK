export * as server from "server";
export * as client from "client";
export { ClientAdapter, ServerAdapter } from "adapters/Adapter";
export * as settings from "utils/Settings";
export * as players from "server/PlayerContext";

// A sort of polyfill to unify the different text objects get/set APIs.
// Since THNK loads as GDJS files are still loading, the callback is 
// necessary to ensure the polyfill is ran once the objects classes
// are loaded.
gdjs.registerFirstRuntimeSceneLoadedCallback(() => {
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
      gdjs.BitmapTextRuntimeObject.prototype.getColor =
        gdjs.BitmapTextRuntimeObject.prototype.getTint;
      gdjs.BitmapTextRuntimeObject.prototype.setColor =
        gdjs.BitmapTextRuntimeObject.prototype.setTint;
    }
  }
});
