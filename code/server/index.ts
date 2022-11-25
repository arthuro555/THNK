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

export { startServer } from "server/StartServer";
