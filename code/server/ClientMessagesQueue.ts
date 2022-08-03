import { switchPlayerContext } from "../PlayerContext";
import { unpackVariable } from "../VariablePacker";

interface Message {
  initiatorUserID: string;
  serializedExtraData?: Uint8Array | null;
  extraData?: gdjs.Variable;
}

const queueMap = new Map<string, Message[]>();
const getQueue = (messageName: string) => {
  let queue = queueMap.get(messageName);
  if (!queue) queueMap.set(messageName, (queue = []));
  return queue;
};

export const addSerializedMessageToTheQueue = (
  initiatorUserID: string,
  messageName: string,
  serializedExtraData: Uint8Array | null
) => {
  getQueue(messageName).push({ initiatorUserID, serializedExtraData });
};

export const addRawMessageToTheQueue = (
  initiatorUserID: string,
  messageName: string,
  extraData: gdjs.Variable
) => {
  getQueue(messageName).push({ initiatorUserID, extraData });
};

export const popMessage = (name: string, extraData: gdjs.Variable) => {
  const queue = getQueue(name);

  if (queue.length) {
    const currentMessage = queue.shift()!;

    switchPlayerContext(currentMessage.initiatorUserID);

    if (currentMessage.serializedExtraData)
      unpackVariable(extraData, currentMessage.serializedExtraData);
    else if (currentMessage.extraData)
      gdjs.Variable.copy(currentMessage.extraData, extraData);

    return true;
  }

  return false;
};

export const popConnection = (runtimeScene: gdjs.RuntimeScene) =>
  !!runtimeScene.thnkServer?.popConnection();

export const popDisconnection = (runtimeScene: gdjs.RuntimeScene) =>
  !!runtimeScene.thnkServer?.popDisconnection();
