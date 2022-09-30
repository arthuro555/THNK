export * from ".";
import type { ClientAdapter, ServerAdapter } from "./Adapter";
export class GeckosClientAdapter extends ClientAdapter {
  constructor(ip: string, port: number) {}
}
export class GeckosServerAdapter extends ServerAdapter {
  constructor(port: number) {}
}
export as namespace THNK;
