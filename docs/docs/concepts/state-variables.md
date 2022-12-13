---
description: State variables are one of the core aspects of THNK. A state variable is the idiomatic way to send data to clients in THNK, and important to master to create a game.
sidebar_position: 4
---

# State variables

State variables are one of the core aspects of THNK. A state variable is the idiomatic way to send data to clients in THNK, and important to master to create a game.

## Types of state variables

There are currently 2 types of state variables: public state and player state.

### Public state

Public state is simply state variables shared with all clients: it is intended for _public data_. The public state variable is named `State` on both server and client.

### Player state

Player state is synchronized with a single player: it is intended for _player-specific private data_.

On the clients, your own player state can be accessed directly via the `PlayerState` variable.

On the server, a player's state variable can be gotten as a child of `PlayerState` named after the player's ID: for example, if a player has ID `a`, then you can get their player state variable as `PlayerState.a`. You'll usually want to use `PlayerState[THNK::PickedPlayer()]` to get the current player's state variable.

:::caution

This is subject to breaking changes, `PlayerState` might become simply the currently picked player's state variable in the future.

:::

## Usage of state variables

Using a state variable is simple: a state variable is simply a special type of **structure variable**. You can simply use any child variable of it as a normal GDevelop variable, and it'll be automatically syncrhonized on the client's side.

For example, one could make a chat system by appending strings to the array variable `State.Messages`, then on the client side, reading this variable and displaying all messages in this array.
