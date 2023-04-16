# Picking an adapter

There are a multitude of adapters with different tradeoffs. Here is a quick over view of each of them to help you decide which one(s) to use. Of course, you can also use multiple adapters and let the player chose one depending on their use case.

## Comparative table

| Adapter            | Connection method |                 Speed                 | Supported platforms                         |
| ------------------ | ----------------- |:-------------------------------------:| ------------------------------------------- |
| P2P                | Player-code       |        **A**<sup>+</sup> (UDP)        | All                                         |
| THNK Rooms (Relay) | Room-code         | **C**<sup>+</sup> (TCP through relay) | All                                         |
| Geckos             | IP Address        |        **A**<sup>-</sup> (UDP)        | Client: All <br/>Server: Desktop only |

| Adapter            |                                               Security                                                |                              Privacy                              |
| ------------------ |:-----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------:|
| P2P                | **B**<sup>+</sup> (Client-to-client connection possible, allowing to DDoS a client who's ID is known) | **C** (IP address of other clients obtainable if the ID is known) |
| THNK Rooms (Relay) |                                           **A**<sup>+</sup>                                           |                         **A**<sup>+</sup>                         |
| Geckos             |                                           **A**<sup>+</sup>                                           |       **A**<sup>-</sup> (IP address to known to the server)       |

| Adapter            | Optional infrastructure to self-host                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2P                | TURN & STUN servers for NAT traversal (**without them, some players will not be able to connect**), peerjs broker server for custom P2P ID generation |
| THNK Rooms (Relay) | THNK Relay server                                                                                                                                     |
| Geckos             | A server to run the game, TURN & STUN servers for NAT traversal (necessary for connecting in very rare cases)                                         |

## Adapters overview

### Local adapter

This adapter is for local testing in previews only, it cannot be used for true networking.

### P2P

It uses GDevelop's built-in P2P feature. Since it connects to another peer directly and shares IP addresses, it is most suitable for connecting to a friend, whether on the LAN or over the wire. It uses WebRTC under the hood, the technology used by most web-based video-call software.

The biggest drawback is that not all players will always be able to connect to each other, depending on their router, firewall and ISP. It is especially frequent if you do not own a TURN server to act as a relay proxy in case direct connections are fully blocked & impossible.

The best advantage is that it can find the networking method that's the fastest (e.g. connect over the LAN instead of over the internet if both machines are within the same network), allowing the fastest connection speed.

### THNK Rooms (Relay)

THNK Rooms allow any player to start a server with any given code, and clients will be able to connect to it over the THNK Relay.

The relay uses µWebSockets, which is a fast networking method, albeit uses TCP and therefore gets more laggy on an reliable network than other adapters. That is its biggest flaw.

The biggest advantage is that it uses standard TCP connections, which are never ever blocked by any network.

### Geckos

Geckos allows you to connect to the server using its IP address/hostname. It uses WebRTC, similarly to P2P.

The biggest advantage is that it does not require connecting to any other external server, so playing multiplayer on a LAN without internet access is possible. The biggest disadvantage is that a server can only be run on a desktop build.

## What adapter to use for a game like...

### Minecraft

Minecraft uses an authoritative multiplayer system, just like THNK! In Minecraft, players host their servers on, well, a server, for players to connect via the server IP or hostname. This is a perfect use case for Geckos: servers will not be ran from the game directly, but mostly on linux machines. So it is not a big issue if the server cannot be launched outside of a desktop.

It's also the only adapter to allow connecting via IP/hostname and port.

### Among us

Among us uses a room code system. Since complete strangers will be able to play together, you do not want to use P2P - your players will not be happy to have their IP known by the strangers they play with. Additionally, with P2P, you would need to create your own matchmaking/room finding system.

You likely would want to use THNK Rooms (Relay) instead: It allows you to create a shareable room code, it even lets the player chose one of their own, IP addresses are not discoverable, and you can tag public rooms to allow player to get a list of rooms they can join.

### Jackbox games

Jackbox uses a room code system. Since Jackbox is more of a party game, it is something most people will play with their friends and familly, so there is little risk in players knowing each other's IP address. Since multiple games are likely to be played in a row, it's also handy if the code does not change between each game. If the Jackbox game in question needs good reflexes or is otherwise time-based, it's especially important to have a quick connection too. Therefore, it'd be a good fit for P2P. Since players are likely on the local network as well, LAN connections are rarely blocked by the router/firewall as well.

Note that you might want to add a "Streamer mode" that uses the THNK Rooms adapter instead, though, as a streamer will not want members of their audience to know their IP address, and they'll likely want to get a new room for new audience members to join after each game. This would also help avoid having to install a TURN server.
