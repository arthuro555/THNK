export * from "..";
import type { ClientAdapter, ServerAdapter } from "adapters/Adapter";

export class GeckosClientAdapter extends ClientAdapter {
  constructor(ip: string, port: number) {}
}
export class GeckosServerAdapter extends ServerAdapter {
  constructor(port: number) {}
}
export class RelayClientAdapter extends ClientAdapter {
  constructor(gameID: string, roomID: string) {}
}
export class RelayServerAdapter extends ServerAdapter {
  constructor(gameID: string, roomID: string) {}
}

export as namespace THNK;
