import type { ServerAdapter } from "../Adapter";
import { isDedicated } from "../Settings";
import { SyncedVariable } from "./SyncedVariable";
import { THNKServerContext } from "./THNKServerContext";

/**
 * Sets up a scene's server context, so that it may act as a THNK server.
 */
export const setupSceneAsServer = (
  runtimeScene: gdjs.RuntimeScene,
  adapter: ServerAdapter
) => {
  const syncedVariable = SyncedVariable.setupSyncedVariable(
    runtimeScene.getVariables()
  );
  runtimeScene.getTimeManager().addTimer("__THNK_Ticker");
  runtimeScene.thnkServer = new THNKServerContext(adapter, syncedVariable);

  // Unless "dedicated" is switched on, a server is always also a client to itself.
  // Therefore, it should trigger a connection when connecting, at the server's start.
  if (!isDedicated())
    runtimeScene.thnkServer.playerManager._onConnect(adapter.getServerID());
};
