---
sidebar_position: 5
description: In this last part of the getting started tutorial, we look at how to connect your players and play together online.
keywords:
  - get started
  - platformer
  - learn
  - connect
  - network
  - animation
  - messages
  - events
  - client
  - player
  - control
  - THNK
  - p2p
  - multiplayer
  - GDevelop
---

# Connect clients with P2P

:::note

This page is a WIP 👷‍♂️
Screenshots and videos are still missing, come back later if you need them!

:::

To connect players together, an adapter is required. Each have different tradeoffs, and you can learn [more about each of them here](../misc/picking-an-adapter.md). We'll use P2P as you might already be somewhat familliar with it, as it is integrated in GDevelop.

## Setting up P2P

In order to use P2P with THNK, you will need to [download and install the P2P adapter](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK_P2P.json).

After that, we need to add a menu to the game where players can connect together.

Before we can start connecting, we need two things:

1. A P2P ID, which can be obtained by connecting to the broker server
2. To know who will be hosting the server

Then, to connect,

- The server host needs to share his P2P ID
- The clients need to enter the server's host P2P ID

---

First, let's create a menu scene that contains a "Connceting to server" text in the middle. While we are not connected to the broker, it is useless to propose any other option as starting a server or connecting to one is impossible without a P2P ID provided by the broker.

We can, at the beginning of the scene, simply call the "Connect to the default broker server" action.

:::info TURN/STUN servers

If you are going to add TURN/STUN servers as ICE candidates (recomended as a fallback if the player's firewall block P2P connections), they must be called just before connecting to the broker, not after!

:::

When the "P2P is ready" condition fires, the broker is connected and ready, so we can go to the next step.

:::tip What do you mean, go to the next step?!?

The flow of connecting via P2P is multi-step:

Connect to the broker -> Select role (client/server) -> Exchange IDs

You have numerous options to go to the "next menu" of the connection flow:

- You can put them on different scenes and switch
- You can delete objects and create new ones for each step
- You can put different menus at different locations on the scene and move the camera
- Etc...

:::

That next step is to display two buttons: one for client, one for server.

## Client menu

The client connection should allow typing in an ID. A text input object is the best: it allows to manually write the ID if needed, but also allows pasting in the ID.

Once the player finishes entering the ID, they need to be able to innitiate the connection. You can use a button from the GDevelop asset store for this.

When the button is pressed, simply use the P2P adapter's "Connect to server at < P2P ID >". Use the text input's expressions to get the entered ID.

## Server menu

In order for clients to connect, a THNK server needs to be started first. The server needs [a THNK scene](./creating-a-scene.md) to run.

In this game, it makes sense to allow players to join and leave the game anytime after it started, akin to minecraft. Therefore, we'll just start the game scene directly as a THNK P2P server, using the corresponding action from the P2P adapter.

To allow clients to connect, we'll add a _read-only and disabled text input object_ containing the P2P ID in the platformer scene.
This is the best way to make selectable text, allowing to easily copy-paste it in an intuitive manner, while allowoing to also simply read it out to a friend.

:::tip Lobby

If in your game, you need all players to join before starting the game, similarly to amongus, you can create a "lobby" scene and start that as a server. When all clients have joined, you can simply switch the scene to the game scene in server events.

As long as the scene switch is done by the server code, all clients will follow the switch and stay connected. If the switch is done client side though, this will be disconnecting the game from the server (as you switch away from the THNK remote scene to a local scene).

:::

# Conclusion

That's it, now, if you click on "server" on one game, "client" on some other games, and type the ID of the server in those other games, you will be playing ✨together online✨!

With that, you've reached the conclusion of this getting started tutorial :)

Have fun building with THNK!

![The Events](https://github.com/user-attachments/assets/84b23d76-a9e2-4730-b0b4-f98f53ebcfb2)
