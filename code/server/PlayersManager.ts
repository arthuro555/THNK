import { switchPlayerContext } from "server/PlayerContext";
import { SyncedVariable } from "server/SyncedVariable";

class Player {
  variable = new SyncedVariable();
}

export class PlayerManager {
  private readonly players = new Map<string, Player>();
  private readonly connectionsQueue: string[] = [];
  private readonly disconnectionsQueue: string[] = [];

  _onConnect(id: string) {
    this.players.set(id, new Player());
    this.connectionsQueue.push(id);
  }
  _onDisconnect(id: string) {
    this.players.delete(id);
    this.disconnectionsQueue.push(id);
  }

  popConnection() {
    if (this.connectionsQueue.length) {
      switchPlayerContext(this.connectionsQueue.shift()!);
      return true;
    }

    return false;
  }

  popDisconnection() {
    if (this.disconnectionsQueue.length) {
      switchPlayerContext(this.disconnectionsQueue.shift()!);
      return true;
    }

    return false;
  }
}
