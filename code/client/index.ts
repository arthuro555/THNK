import "client/ClientLifetimeFunctions";

import { sendClientMessage } from "client/ClientMessageSender";
const messages = { sendClientMessage };
export { messages };

export * as PlayerBehavior from "client/PlayerBehavior";

export { getConnectionState } from "client/ClientConnectionState";
export { startClient } from "client/StartClient";
