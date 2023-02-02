import { ClientInputMessage, ClientMessageContent } from "t-h-n-k";
import {
  sendGameStateUpdateMessageTo,
  sendConnectionStartMessageTo,
  sendSceneSwitchMessageToAll,
  sendSceneResumeMessageToSome,
} from "server/ServerMessageSender";
import { addSerializedMessageToTheQueue } from "server/ClientMessagesQueue";
import { getTickRate } from "utils/Settings";
import { setupSceneAsServer } from "server/SetupServerScene";
import { ServerAdapter } from "adapters/Adapter";

const logger = new gdjs.Logger("THNK - Server");
let timer = 0;
const runServerTickPreEvent = (runtimeScene: gdjs.RuntimeScene) => {
  if (!runtimeScene.thnkServer) return;

  const { adapter } = runtimeScene.thnkServer;

  for (const [userID, messages] of adapter.getUsersPendingMessages()) {
    for (const message of messages) {
      const messageType = message.contentType();
      switch (messageType) {
        case ClientMessageContent.ConnectionRequestMessage:
          if (runtimeScene.thnkServer.playerManager.alreadyHas(userID))
            continue;
          sendConnectionStartMessageTo(userID, adapter, runtimeScene);
          runtimeScene.thnkServer.playerManager._onConnect(userID);
          continue;
        case ClientMessageContent.ClientInputMessage:
          const clientMessage = message.content(
            new ClientInputMessage()
          ) as ClientInputMessage;
          const name = clientMessage.name();
          if (!name) continue;
          const serializedExtraData = clientMessage.contentArray();
          addSerializedMessageToTheQueue(userID, name, serializedExtraData);
          continue;
        default:
          logger.error(
            `Received message with unknown type '${message.contentType()}'`
          );
          continue;
      }
    }

    messages.length = 0;
  }

  for (const disconnectedUser of adapter.getDisconnectedUsers())
    runtimeScene.thnkServer.playerManager._onDisconnect(disconnectedUser);
  adapter.getDisconnectedUsers().length = 0;

  const timeManager = runtimeScene.getTimeManager();
  // Note that while this is affected by the time scale
  timer += timeManager.getElapsedTime() / timeManager.getTimeScale();
  if (timer > 1000 / getTickRate()) {
    timer = 0;
    runtimeScene.thnkServer.runServerCode = true;
  }

  // Copy the player-state for the server into the root player state variable.
  // TODO: GET RID OF THIS CRAP ASAP WHEN CONTEXT ISOLATION IS ADDED
  {
    const serverID = runtimeScene.thnkServer.adapter.getServerID();

    const copyServerPlayerStateIntoRootOfVariable = (
      variable: gdjs.Variable
    ) => {
      const serverState = variable.getChild(serverID).getAllChildren();
      for (const serverStateVariableName in serverState) {
        variable.addChild(
          serverStateVariableName,
          serverState[serverStateVariableName]
        );
      }
    };

    const { privateStateVariable } = runtimeScene.thnkServer.stateVariables;
    copyServerPlayerStateIntoRootOfVariable(privateStateVariable);
    runtimeScene.thnkServer.objectsRegistery.forEach((obj) =>
      copyServerPlayerStateIntoRootOfVariable(
        obj.getVariables().get("PlayerState")
      )
    );
  }
};

const runServerTickPostEvent = (runtimeScene: gdjs.RuntimeScene) => {
  if (!runtimeScene.thnkServer || !runtimeScene.thnkServer.runServerCode)
    return;
  runtimeScene.thnkServer.runServerCode = false;

  const { snapshotsManager } = runtimeScene.thnkServer;
  const snapshot = snapshotsManager.createSnapshot(runtimeScene);

  // Send a diff of the scene to all clients now that the game logic has ran.
  if (snapshot) {
    for (const userID of runtimeScene.thnkServer.playerManager.connectedPlayers.values())
      if (userID !== runtimeScene.thnkServer.adapter.getServerID())
        sendGameStateUpdateMessageTo(
          userID,
          runtimeScene.thnkServer.adapter,
          snapshot
        );
  }
};

let sceneSwitch: { adapter: ServerAdapter; isPause: boolean } | null = null;

// When the scene is being paused or unloaded, back up the adapter for the new scene
const onSceneDying = (oldRuntimeScene: gdjs.RuntimeScene, isPause: boolean) => {
  if (oldRuntimeScene.thnkServer) {
    const { adapter } = oldRuntimeScene.thnkServer;
    sceneSwitch = { adapter, isPause };

    if (isPause)
      oldRuntimeScene.thnkServer.previouslyConnectedUsers = new Set(
        adapter.getConnectedUsers()
      );
  }
};

const onSceneSwitched = (newRuntimeScene: gdjs.RuntimeScene) => {
  if (sceneSwitch) {
    // There is a backup from the previous scene, that means that we are a server and need to setup the scene to accept the new players.
    const { adapter, isPause } = sceneSwitch;
    setupSceneAsServer(newRuntimeScene, adapter);

    // Trigger a new connection for every user so that the scene is properly initialized for each player
    for (const user of adapter.getConnectedUsers())
      newRuntimeScene.thnkServer!.playerManager._onConnect(user);

    // Tell everyone to switch to the scene as that is more efficient than a full snapshot 😎
    sendSceneSwitchMessageToAll(adapter, newRuntimeScene.getName(), isPause);

    sceneSwitch = null;
  }
};

const onSceneResumed = (newRuntimeScene: gdjs.RuntimeScene) => {
  if (!sceneSwitch) return;
  if (newRuntimeScene.thnkServer) {
    // Tell all the scenes to go back to the previous scene too.
    const { adapter, previouslyConnectedUsers } = newRuntimeScene.thnkServer;
    if (previouslyConnectedUsers) {
      const newUsers = [];
      const stillConnectedUsers = [];
      for (const currentUser of adapter.getConnectedUsers()) {
        if (previouslyConnectedUsers.has(currentUser))
          stillConnectedUsers.push(currentUser);
        else newUsers.push(currentUser);
      }
      // Send a snapshot only to those who have connected after pausing the scene.
      sendSceneResumeMessageToSome(newUsers, adapter, newRuntimeScene);
      sendSceneResumeMessageToSome(stillConnectedUsers, adapter);
    } else {
      // This should never happen, but just in case there was no list of previously connected users, send a snapshot to all.
      logger.warn(
        "List of previously connected players not found! A full snapshot will be sent to all players. This is likely a bug, please open an issue on the THNK GitHub page!"
      );
      sendSceneResumeMessageToSome(
        [...adapter.getConnectedUsers()],
        adapter,
        newRuntimeScene
      );
    }
  } else {
    logger.warn(
      "Resumed a scene that is not a server, shutting the server down. This is likely a bug, please open an issue on the THNK GitHub page!"
    );
    sceneSwitch.adapter.close();
  }
};

gdjs.registerRuntimeScenePreEventsCallback(runServerTickPreEvent);
gdjs.registerRuntimeScenePostEventsCallback(runServerTickPostEvent);

gdjs.registerRuntimeSceneUnloadedCallback((rs) => onSceneDying(rs, false));
gdjs.registerRuntimeScenePausedCallback((rs) => onSceneDying(rs, true));

gdjs.registerRuntimeSceneLoadedCallback(onSceneSwitched);
gdjs.registerRuntimeSceneResumedCallback(onSceneResumed);
