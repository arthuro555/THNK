/// <reference types="extensions/p2p/peerjs" />
declare namespace gdjs {
    namespace evtTools {
        /**
         * Tools for p2p multiplayer.
         * @namespace
         */
        namespace p2p {
            /**
             * The data bound to an event that got triggered.
             */
            class EventData {
                constructor(data: string, sender: string);
                /**
                 * The data sent alongside the event.
                 */
                readonly data: string;
                /**
                 * The ID of the sender of the event.
                 */
                readonly sender: string;
            }
            /**
             * An event that can be listened to.
             */
            class Event {
                private data;
                dataloss: boolean;
                /**
                 * Returns true if the event is triggered.
                 */
                isTriggered(): boolean;
                /**
                 * Add new data, to be called with the event data each time the event is triggered.
                 */
                pushData(newData: EventData): void;
                /**
                 * Deleted the last event data, to be called when it is sure the event was processed throughly.
                 */
                popData(): void;
                /**
                 * Get the data sent with the last event triggering.
                 */
                getData(): string;
                /**
                 * Get the sender of the last event triggering.
                 */
                getSender(): string;
            }
            /**
             * Get an event or creates it if it doesn't exist.
             */
            export const getEvent: (name: string) => Event;
            /**
             * Connects to another p2p client.
             * @param id - The other client's ID.
             */
            export const connect: (id: string) => void;
            /**
             * Disconnects from another p2p client.
             * @param id - The other client's ID.
             */
            export const disconnectFromPeer: (id: string) => void;
            /**
             * Disconnects from all other p2p clients.
             */
            export const disconnectFromAllPeers: () => void;
            /**
             * Disconnects from all peers and the broker server.
             */
            export const disconnectFromAll: () => void;
            /**
             * Disconnects from the broker server, leaving the connections intact.
             */
            export const disconnectFromBroker: () => void;
            /**
             * Returns true when the event got triggered by another p2p client.
             * @param defaultDataLoss Is data loss allowed (accelerates event handling when true)?
             */
            export const onEvent: (eventName: string, defaultDataLoss: boolean) => boolean;
            /**
             * Send an event to one specific connected client.
             * @param id - The ID of the client to send the event to.
             * @param eventName - The event to trigger.
             * @param [eventData] - Additional data to send with the event.
             */
            export const sendDataTo: (id: string, eventName: string, eventData: string) => void;
            /**
             * Send an event to all connected clients.
             * @param eventName - The event to trigger.
             * @param [eventData] - Additional data to send with the event.
             */
            export const sendDataToAll: (eventName: string, eventData: string) => void;
            /**
             * Send an event to one specific connected client.
             * @param id - The ID of the client to send the event to.
             * @param eventName - The event to trigger.
             * @param variable - Additional variable to send with the event.
             */
            export const sendVariableTo: (id: string, eventName: string, variable: gdjs.Variable) => void;
            /**
             * Send an event to all connected clients.
             * @param eventName - The event to trigger.
             * @param variable - Additional variable to send with the event.
             */
            export const sendVariableToAll: (eventName: string, variable: gdjs.Variable) => void;
            /**
             * Get some data associated to the last trigger of an event.
             * @param eventName - The event to get data from.
             * @returns - The data as JSON.
             */
            export const getEventData: (eventName: string) => string;
            /**
             * Get the id of peer that caused the last trigger of an event.
             * @param eventName - The event to get the sender from.
             */
            export const getEventSender: (eventName: string) => string;
            /**
             * Get a variable associated to the last trigger of an event.
             * @param eventName - The event to get the variable from.
             * @param variable - The variable where to store the variable content.
             */
            export const getEventVariable: (eventName: string, variable: gdjs.Variable) => void;
            /**
             * Connects to a custom broker server.
             * @param host The host of the broker server.
             * @param port The port of the broker server.
             * @param path The path (part of the url after the host) to the broker server.
             * @param key Optional password to connect to the broker server.
             * @param ssl Use ssl?
             */
            export const useCustomBrokerServer: (host: string, port: number, path: string, key: string, ssl: boolean) => void;
            /**
             * Use default broker server.
             * This is not recommended for published games,
             * this server should only be used for quick testing in development.
             */
            export const useDefaultBrokerServer: () => void;
            /**
             * Adds an ICE server candidate, and removes the default ones provided by PeerJs. Must be called before connecting to a broker.
             * @param urls The URL of the STUN/TURN server.
             * @param username An optional username to send to the server.
             * @param credential An optional password to send to the server.
             */
            export const useCustomICECandidate: (urls: string, username?: string | undefined, credential?: string | undefined) => void;
            /**
             * Overrides the default peer ID. Must be called before connecting to a broker.
             * Overriding the ID may have unwanted consequences. Do not use this feature
             * unless you really know what you are doing.
             * @param id The peer ID to use when connecting to a broker.
             */
            export const overrideId: (id: string) => void;
            /**
             * Returns the own current peer ID.
             * @see Peer.id
             */
            export const getCurrentId: () => string;
            /**
             * Returns true once PeerJS finished initialization.
             * @see ready
             */
            export const isReady: () => boolean;
            /**
             * Returns true once when there is an error.
             */
            export const onError: () => boolean;
            /**
             * Returns the latest error message.
             */
            export const getLastError: () => string;
            /**
             * Returns true once a peer disconnected.
             */
            export const onDisconnect: () => boolean;
            /**
             * Get the ID of the peer that triggered onDisconnect.
             */
            export const getDisconnectedPeer: () => string;
            /**
             * Returns true once if a remote peer just initiated a connection.
             */
            export const onConnection: () => boolean;
            /**
             * Get the ID of the peer that triggered onConnection.
             */
            export const getConnectedPeer: () => string;
            /**
             * A JavaScript-only function to get the raw P2P DataConnection.
             * This can be useful for example when you want to use a binary protocol
             * instead if GDevelop variables for high-performance networking.
             */
            export const getConnectionInstance: (peerID: string) => Peer.DataConnection<NetworkEvent> | undefined;
        }
    }
}
