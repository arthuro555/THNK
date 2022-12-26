---
sidebar_position: 1
title: What is THNK?
description: A brief introduction to THNK - What is it? Why would I want to use it? How do I get started? All of those questions will be answered here. It is the recommended starting point to get started with the THNK framework.
keywords: [getting started, intro]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://thnk.cloud/docs/why-thnk/",
      "logo": "https://thnk.cloud/img/thnk.png"
    })}
  </script>
</head>

# Getting started with THNK - What is THNK anyway?

> THNK is a framework for building GDevelop games with multiplayer in mind.

:::info

THNK is a framework, and not a simple extension - it's a whole way of structuring and coding your games. It is made to be very flexible despite forcing a structure onto your events, so no need to worry if you already started making your game and want to add THNK to it. Check out the [Migration Guide](/docs/migrating) for more information.

:::

## Why THNK?

Building your game on top of THNK provides multiple benefits. Here are the most notable ones:

### It makes your game work in both single- and multiplayer without any extra changes

THNK by itself doesn't make your game multiplayer games per se, by default it still works in single-player as normal. You can switch to scenes built with THNK, and they will work just like they would if not made with it. You are not committing to multiplayer by using THNK - only, making it super easy to add a high quality multiplayer feature to the game.

### Multiplayer can be enabled in a single action

The real magic of THNK lies in its numerous adapter extensions. An adapter extension allows you to launch a server or client for a specific networking backend in 1 action. The currently available adapters include:

- P2P (World-Wide LAN-like experience)
- Geckos.io (True LAN experience)
- Split-screen (coming soon!)

This allows for a variety of types of multiplayer to be implemented without any efforts in mere minutes!

### THNK multiplayer is always authoritative

Multiplayer games can be done in a lot of ways. All there is to it in the end is to synchronize objects across instances of a game. But certain ways of doing it can be bad: if we let everyone synchronize any object of the game, a hacker could easily send malicious updates to other clients in order to cheat or crash their games.

Authoritative multiplayer is an architecture that aims to protect against this. In an authoritative architecture, there is a single designated server that runs all the game code. This is the so-called _source of truth_: all instances of the game will trust it and only that servers. That way, for a hacker to manipulate the game, they would have to control the server.

This technique is not 100% infallible either, especially in a context where anyone can host a server and the host may be a hacker, but it should still protect against 99% of the hacking & cheating techniques & attempts.

In THNK, all multiplayer, regardless of the adapter, will always be authoritative. Simply by making your game with THNK, you highly decrease the chances of someone managing to hack or cheat in your game.

### Server builds

THNK is made to be able to create a special server build out of your game. This build can then be shared with players for them to host their own game servers (like minecraft), or you can use it to host optimized game servers on your own, allowing to create MMOs for example.

In the future, a THNK Cloud is planned. This would be a platform that would take care of creating server builds for you and hosting your game servers, _for free_! If you want it to see the light of day, consider [making a donation to help buy the servers](https://ko-fi.com/arthuro555).

### Dead simple object & variables synchronization

Synchronizing objects and variables can be a pain when doing multiplayer by yourself. In THNK, it is a simple as putting a behavior on objects you want to be synchronized, and prefix the names of variables you want to be synchronized with `State.`. You can focus on your game instead of the networking and synchronizing of different things.

### It provides an optimized solution for synchronizing objects and variables across server and clients.

THNK is as optimized as it gets for making your games server and client superfast.

- It uses a custom binary protocol based on [FlatBuffers](https://google.github.io/flatbuffers/) and [msgpackr](https://github.com/kriszyp/msgpackr), instead of much heavier formats like JSON, and additionally, all messages are compressed using the deflate algorithm, the same as the one used in zip files, to use the most minimal bandwidth and provide faster packing and unpacking of messages.
- It synchronizes in a smart way: it only synchronizes the parts you care about, and only if they changed since the last server tick.
- It allows having a server update rate slower than the client, and interpolate results on the client, to use up less server resources and bandwidth. (WIP)
- It never runs server code on the client or client code on server builds (Note that THNK servers in non-server builds of the game also act as a client to itself)

:::note

It is planned to add the possibility to leverage the optimized binary snapshotting of a scene to allow adding saving and loading easily in the future.

:::

### And much more!

- Linking objects to players
- Authentication (coming soon!)
- Server replication (designating and keeping up to date a secondary server as a failsafe) (coming soon!)
- Etc...

## How do I get started?

Are you convinced yet? If so, [continue to the next page to learn how to get started using THNK.](/docs/getting-started/)
