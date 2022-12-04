import type { ServerAdapter } from "adapters/Adapter";
import { isDedicated } from "utils/Settings";
import { SyncedVariable } from "server/SyncedVariable";
import { THNKServerContext } from "server/THNKServerContext";

/**
 * Sets up a scene's server context, so that it may act as a THNK server.
 */
export const setupSceneAsServer = (
  runtimeScene: gdjs.RuntimeScene,
  adapter: ServerAdapter
) => {
  runtimeScene.thnkServer = new THNKServerContext(
    adapter,
    SyncedVariable.setupStateVariables(runtimeScene.getVariables())
  );

  // Unless "dedicated" is switched on, a server is always also a client to itself.
  // Therefore, a connection should be triggered for the server's client manually,
  // since it does not connect through the adapter to itself.
  if (!isDedicated())
    runtimeScene.thnkServer.playerManager._onConnect(adapter.getServerID());
};
