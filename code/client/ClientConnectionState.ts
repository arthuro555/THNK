type ClientConnectionState =
  | "disconnected"
  | "connecting"
  | "loading"
  | "connected"
  | "failed";
let currentState: ClientConnectionState = "disconnected";
export const setConnectionState = (newState: ClientConnectionState) =>
  (currentState = newState);
export const getConnectionState = () => currentState;
