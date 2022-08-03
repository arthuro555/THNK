import { type ServerAdapter } from "../Adapter";
import { setupSceneAsServer } from "./SetupServerScene";

const logger = new gdjs.Logger("THNK - Server");
/**
 * Starts a THNK server. Can either start one on a new scene or the current one.
 */
export const startServer = async (
  adapter: ServerAdapter,
  runtimeScene: gdjs.RuntimeScene,
  sceneName?: string
) => {
  try {
    // The adapter is responsible for initiating a server on which we can listen to Uint8Arrays from clients.
    // Once the promise resolves, we assume we are all set to start receiving clients, and begin listening to
    // incoming messages.
    await adapter.prepare();
  } catch (e) {
    logger.error("Adapter crashed while starting server! Error: ", e);
    // Abort server startup
    return;
  }

  const scene = sceneName
    ? runtimeScene.getGame().getSceneStack().replace(sceneName, true)
    : runtimeScene;

  // The scene setup will allow for the adapter to be bound to it and the server lifetime events to apply to it.
  setupSceneAsServer(scene, adapter);
};
