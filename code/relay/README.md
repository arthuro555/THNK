# THNK Cloud Relay

A simple room-based message-relay system for player-hosted servers.

## Basic features

All rooms are scoped to a game ID, to prevent overlap of rooms. A player can request a room with a specific ID, or request a random one. The room will then be bound to the geckos connection to that player to the backend. Other players can join this room, which will relay messages from and to the player's server. When the host disconnects, the room is released to be claimed by anyone else.

## Room metadata

Each room can optionally have a variable with data set by the owner of a room. This data can be read without connecting to a room and can be read by everyone, as long as they know the room's ID.

## Room tags

 A room's owne can add and remove tags from their room. Any player can query rooms by one or multiple tags. The amount of rooms returned by a query can be limited.

 This can be used for discovering rooms, matchmaking, and cumulating filters on the former two.

 Querying returns the rooms' IDs and metadata.

## Social features

Relay has a few additional social features for players authenticated with liluo, for easily getting into a room with a friend.

### Friendship

Relay allows sending friend requests to other players. Once accepted, they are mutually added to their friend lists. Friend removal is also mutual. The friend list can be obtained with the room ID and metadata that each friend is currently in.

### Presence

Relay is aware of a friend being connected to the relay, whether they're in a room or not, and contains this information in the friends list.
