import { switchPlayerContext } from "server/PlayerContext";
export class PlayerManager {
  readonly connectedPlayers = new Set<string>();
  readonly tickConnectedPlayers: string[] = [];
  private readonly connectionsQueue: string[] = [];
  private readonly disconnectionsQueue: string[] = [];

  _onConnect(id: string) {
    this.connectedPlayers.add(id);
    this.connectionsQueue.push(id);
  }
  _onDisconnect(id: string) {
    this.connectedPlayers.delete(id);
    this.disconnectionsQueue.push(id);
  }

  alreadyHas(id: string): boolean {
    return this.connectedPlayers.has(id);
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
