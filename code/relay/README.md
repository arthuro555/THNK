# THNK Cloud Relay

A simple room-based message-relay system for player-hosted servers.

## Basic features

All rooms are scoped to a game ID, to prevent overlap of rooms. A player can request a room with a specific ID, or request a random one. The room will then be bound to the geckos connection to that player to the backend. Other players can join this room, which will relay messages from and to the player's server. When the host disconnects, the room is released to be claimed by anyone else.

## Room metadata (TODO)

Each room can optionally have a variable with data set by the owner of a room. This data can be read without connecting to a room and can be read by everyone, as long as they know the room's ID.

## Room tags (TODO)

A room's owner can add and remove tags from their room. Any player can query rooms by one or multiple tags. The amount of rooms returned by a query can be limited.

This can be used for discovering rooms, matchmaking, and cumulating filters on the former two.

Querying returns the rooms' IDs and metadata.
