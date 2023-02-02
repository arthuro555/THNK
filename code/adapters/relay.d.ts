declare namespace THNK {
  let RELAY_SERVER_URL: string;
  export class RelayClientAdapter extends ClientAdapter {
    constructor(gameID: string, roomID: string) {}
  }
  export class RelayServerAdapter extends ServerAdapter {
    constructor(gameID: string, roomID: string) {}
  }
}
