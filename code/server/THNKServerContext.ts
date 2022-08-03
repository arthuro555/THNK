import type { ServerAdapter } from "../Adapter";
import { switchPlayerContext } from "../PlayerContext";
import { ServerObjectsRegistery } from "./ServerObjectsRegistery";
import type { SyncedVariable } from "./SyncedVariable";

export class THNKServerContext {
  /** The adapter used by the scene to get new messages from the client. */
  adapter: ServerAdapter;
  /** A reference to the `State` scene variable. */
  syncedVariable: SyncedVariable;
  /** The registery of synced objects. */
  objectsRegistery = new ServerObjectsRegistery();
  /** Set to true to run a server tick on the next frame */
  runServerCode: boolean = true;
  /** List of users that already know this scene, used when unpausing a scene to only send a snapshot to those who do not have it in memory already. */
  previouslyConnectedUsers?: Set<string>;
  /** The queue of clients that connected to the scene that need to be initialized. */
  connectionsQueue: string[] = [];
  /** The queue of clients that disconnected from the scene that need to be destroyed. */
  disconnectionsQueue: string[] = [];

  constructor(adapter: ServerAdapter, syncedVariable: SyncedVariable) {
    this.adapter = adapter;
    this.syncedVariable = syncedVariable;
  }

  addConnectionToTheQueue(playerID: string) {
    this.connectionsQueue.push(playerID);
  }

  popConnection() {
    if (this.connectionsQueue.length) {
      switchPlayerContext(this.connectionsQueue.shift()!);
      return true;
    }

    return false;
  }

  addDisconnectionToTheQueue(playerID: string) {
    this.disconnectionsQueue.push(playerID);
  }

  popDisconnection() {
    if (this.disconnectionsQueue.length) {
      switchPlayerContext(this.disconnectionsQueue.shift()!);
      return true;
    }

    return false;
  }
}
