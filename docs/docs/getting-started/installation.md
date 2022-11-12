---
sidebar_position: 1
description: To start off the getting started tutorial, we take a look at how to install THNK here.
keywords:
  [get started, install, download, adapter, THNK, p2p, multiplayer, GDevelop]
---

# Installing THNK

:::caution

THNK is currently in early stages. It is still usable and a much better experience than building multiplayer by yourself, but it may have bugs or features that are important for you that are not yet available. Be aware of this when considering THNK!

:::

## Pre-requisites

THNK is a GDevelop framework, so you will need to have GDevelop downloaded. It is recommended to have some base GDevelop knowledge before getting started with THNK. [You can find resources to learn GDevelop on the GDevelop wiki](https://wiki.gdevelop.io/gdevelop5/tutorials/basic-game-making-concepts).

## Installation

To get started with THNK, the first step is to download the core THNK extension. Currently, it is not available yet in the extension gallery, and has to be installed manually.

To do so, download the [latest release of THNK from GitHub](https://github.com/arthuro555/THNK/releases) (or you can [get the latest nightly build](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK.json)).

![GIF showing how to download THNK](./install-gifs/dl-thnk.gif)

To import it, go into the Project Manager, click on Functions/Behaviors, select "Create or search for new extensions", and finally click "Import extension" button at the bottom left. It will open a file selector that will allow you to open the THNK extension file.

![GIF showing how to install THNK](./install-gifs/install-thnk.gif)

## (Optional) Install an adapter

THNK by itself doesn't let you make a multiplayer game. You can develop your game for single-player fine using the THNK framework features, but to actually get multiple players playing together, you need an adapter extension. An adapter extension tells THNK a way to make your games communicate together. Adapters come in the form of other GDevelop extensions, you can find them and download them on the THNK download page. [Learn more about adapters](/docs/concepts/adapters.md)
