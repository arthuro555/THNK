import "server/ServerLifetimeFunctions";

import {
  popMessage,
  addRawMessageToTheQueue,
  popConnection,
  popDisconnection,
} from "server/ClientMessagesQueue";

const events = {
  popMessage,
  addRawMessageToTheQueue,
  popConnection,
  popDisconnection,
};
export { events };

export * as PlayerBehavior from "server/PlayerBehavior";

export { startServer } from "server/StartServer";
