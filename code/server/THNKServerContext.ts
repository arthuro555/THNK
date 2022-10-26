import type { ServerAdapter } from "adapters/Adapter";
import { PlayerManager } from "server/PlayersManager";
import { ServerObjectsRegistery } from "server/ServerObjectsRegistery";
import type { SyncedVariable } from "server/SyncedVariable";

export class THNKServerContext {
  /** The adapter used by the scene to get new messages from the client. */
  adapter: ServerAdapter;
  /** A reference to the `State` scene variable. */
  syncedVariable: SyncedVariable;
  /** The registery of synced objects. */
  objectsRegistery = new ServerObjectsRegistery();
  /** Component that manages player, their (dis)connections, their game snapshots... */
  playerManager = new PlayerManager();
  /** Set to true to run a server tick on the next frame. */
  runServerCode: boolean = true;
  /** List of users that already know this scene, used when unpausing a scene to only send a snapshot to those who do not have it in memory already. */
  previouslyConnectedUsers?: Set<string>;

  constructor(adapter: ServerAdapter, syncedVariable: SyncedVariable) {
    this.adapter = adapter;
    this.syncedVariable = syncedVariable;
  }
}
