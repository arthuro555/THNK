---
sidebar_position: 4
description: A game is never totally the same in multiplayer than it is in single player. Learn how to preview and test out your game's multiplayer locally in this fouth part of the getting started tutorial!
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
  - local
  - adapter
  - multiplayer
  - GDevelop
---

# Try out the multiplayer using the local adapter

In THNK, you need to start a scene with an adapter in order to play in multiplayer. Adapters are provided as separate extensions, and sets up a networking solution in a way that THNK understands.

Before implementing an adapter to connect your players together, it's useful to test your game in multiplayer mode locally. The THNK local adapter has many advantages:

- It's Blazingly Fast™
- It allows to pop-up and connect multiple clients in a single action
- It is easy to connect, as there is no networking involved.

## Setup the local adapter

Simply install the [local adapter extension](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK_Local.json), create a new scene (I like to call it something along the lines of `MultiplayerQuickStart`), and put the action from the local adapter to start a server with 2 clients at the beginning of the scene.

That's it! Now, previewing this scene will start a server with the scene and the amount of clients you requested, each in a separate window, for you to test out the game in multiplayer mode.
