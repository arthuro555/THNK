import type { ServerAdapter } from "adapters/Adapter";
import { PlayerManager } from "server/PlayersManager";
import { ServerObjectsRegistery } from "server/ServerObjectsRegistery";
import type { SyncedVariable } from "server/SyncedVariable";
import { SnapshotsManager } from "server/SnaphsotManager";

export interface StateVariables {
  publicStateVariable: SyncedVariable;
  privateStateVariable: SyncedVariable;
  teamStateVariable: SyncedVariable;
}

export class THNKServerContext {
  /** The adapter used by the scene to get new messages from the client. */
  adapter: ServerAdapter;
  /** A reference to the `State` scene variable. */
  stateVariables: StateVariables;
  /** The registery of synced objects. */
  objectsRegistery = new ServerObjectsRegistery();
  /** Component that manages player, their (dis)connections, their game snapshots... */
  playerManager = new PlayerManager();
  /** Set to true to run a server tick on the next frame. */
  runServerCode: boolean = true;
  /** List of users that already know this scene, used when unpausing a scene to only send a snapshot to those who do not have it in memory already. */
  previouslyConnectedUsers?: Set<string>;
  /** Stores snapshots of the diffs of a handful of previous frames. */
  snapshotsManager = new SnapshotsManager();

  constructor(adapter: ServerAdapter, stateVariables: StateVariables) {
    this.adapter = adapter;
    this.stateVariables = stateVariables;
  }
}
