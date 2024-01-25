/**
 * Per convention, all messages sent to the server ends with one of these for identifying the kind of data they are transmitting.
 */
export enum MessagesForServer {
  ClientMessage = 0,
  Connection = 1,
  Disconnection = 2,
}

// Since messages are created only to be instantly sent, we can reasonably assume

const staticBinarySlotsMessage = new Uint8Array(2);
// This array should hold messages of an arbitrary size (the ones sent by servers and clients).
// 1mb should be fine, considering that messages are expected to be sent around 60 times per second.
// It is not reasonable to expect users to have a connection speed of 60mbps anyways.
const staticArbitrarySizeMessage = new Uint8Array(1024 ** 2);

export function createConnectionMessage(userID: number) {
  staticBinarySlotsMessage[0] = userID;
  staticBinarySlotsMessage[1] = MessagesForServer.Connection;
  return staticBinarySlotsMessage;
}

export function createDisconnectionMessage(userID: number) {
  staticBinarySlotsMessage[0] = userID;
  staticBinarySlotsMessage[1] = MessagesForServer.Disconnection;
  return staticBinarySlotsMessage;
}

export function createClientMessage(
  fromUserID: number,
  originalClientMessage: Uint8Array
) {
  // Copy the original message to the bigger array
  staticArbitrarySizeMessage.set(originalClientMessage);

  // Set the message type and client ID
  staticArbitrarySizeMessage.set(
    [fromUserID, MessagesForServer.ClientMessage],
    originalClientMessage.byteLength
  );

  // return a slice of message which cover originalClientMessage and additional 2 bytes for userID and message type
  return staticArbitrarySizeMessage.slice(
    0,
    originalClientMessage.byteLength + 2
  );
}
