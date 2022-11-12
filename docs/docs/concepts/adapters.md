---
description: Learn what adapters are and how they can help you!
sidebar_position: 2
---

# Adapters

THNK by itself does not care about the networking itself, only about the multiplayer. Ironically, though, the THNK core extension therefore only allows you to play your game in single-player. If you want to play it in multiplayer, you will have to plug an _adapter_ into THNK.

An adapter tells THNK how to communicate with servers or clients in a specific way. You can theoretically build your own via JavaScript, but THNK provides a few official adapter extensions that should cover all your needs.

## P2P Adapter

:::warning

P2P is not meant for MMOs! It leaks one's IP address, and that is _by design_. You should always see P2P as a kind of _super LAN_ that can sometimes also work over the internet - You can use it to connect to a trusted friend and play with them, but you should _never_ use it to connect with a lot of strangers.

:::

The P2P adapter simply allows a THNK game to be hosted onto your P2P connection, and to connect to servers using their P2P ID.

To use it, you need to first connect your game to a broker server. It is up to you whether to use the default one or a custom one - THNK works with either. Then, you can use the actions to host a server. When hosting the server, give a way to copy your P2P ID, for example with the text input object. Finally, you can use the connection action to connect as a client to a P2P server using the server's ID.

## Geckos.io Adapter

Geckos.io is a networking solution that allows to establish direct connections between a server and a client. Those connections are fast and secure UDP connections, perfect for all kinds of games. It is backed by the same tech as P2P: WebRTC.

This adapter is ideal for architectures where you connect to "The Server™" (e.g. Minecraft-like multiplayer) and not directly a friend to play (e.g. Among Us-like multiplayer).

## Planned Adapters

Here is the list of adapters planned for the future:

- Split screen multiplayer
- THNK Cloud

Don't hesitate to [submit other suggestions](https://github.com/arthuro555/THNK/issues/new)!
