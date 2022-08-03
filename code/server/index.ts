import "./ServerLifetimeFunctions";

import {
  popMessage,
  addRawMessageToTheQueue,
  popConnection,
  popDisconnection,
} from "./ClientMessagesQueue";
const events = {
  popMessage,
  addRawMessageToTheQueue,
  popConnection,
  popDisconnection,
};
export { events };

export { startServer } from "./StartServer";
