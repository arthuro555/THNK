---
description: El estado del juego se refiere a los objetos y variables importantes del juego, que cuando se encuentran todos juntos, permiten ver exactamente el estado actual del juego y del mundo de los juegos.
sidebar_position: 3
---

# Estado del juego

Todos los juegos tienen algún tipo de estado de juego. El estado del juego se refiere a los objetos y variables importantes del juego, que cuando se encuentran todos juntos, permiten ver exactamente el estado actual del juego y del mundo de los juegos.

En THNK es el rol del servidor para _controlar las actualizaciones del estado del juego_ y _enviar actualizaciones a todos los clientes_. El rol del cliente es _mostrar el estado del juego_ y _enviar las peticiones del jugador para cambiar el estado del juego_.

## Formas de estado del juego

THNK takes care of synchronizing the game state from the server to the client. For that though, you need to mark elements of your scene as game state for THNK. Game state takes two forms in THNK: objects (for the game world) and variables (for the rest of the game state).

### Objects

Objects can be marked as game state in THNK by adding the "Synchronize" behvaior on them. This behavior will watch for changes on the object and automatically sync those on clients.

:::note

Only object properties are synchronized, not behavior properties!

Sometimes, that is alright: the behavior may simply modify the object's properties on the server, and those changes will be successfully synced.

In other cases, this can cause issues. For example, a movement behavior may move the object incorrectly on clients in between updates from the server if it does not have a correct internal state. In this case, you will have to either disable the behavior on the client, or synchronize the behavior properties by yourself.

You can synchronize the internal properties of a behavior yourself by replacing behavior properties with object state variables. If you have not written the behavior yourself, ask the author for advice on what should be synchronized and what should not be!

:::

### State Variables

Objects represent the game world in itself, as everyone can observe it. But some elements are not for everyone to see, yet is important data for one or multiple clients.

Take for example whether or not you are an imposter in Among Us - your client will want to know that, as it is crucial the player knows this and is presented with appropriate options depending on this role. Although this is important game state, what changes is _the presentation_ and _options of the player_, not the game world itself.

It is, in fact, _crucial_ not to make this part of the game world, as this game state is player specific and should never be shared with other players (this could allow for cheating). The game world (and therefore, the usage of synchronized objects) should be limited to objects that are _visible to everyone_, as if "part of the world". Player-specific data belongs in variables.

Another example would be an in-game chat: The text messages themselves may be game state, since they are shared with everyone and part of what is happening in your game, but are not part of the game world (in most cases) - the message is _not an "entity living in your game world"_. One player might open the chat at a time, another player at another time: The presentation differs from one client to the other.

Therefore, it is _the client's responsibility to display messages, not the server's_. To that effect, you will need to synchronize messages exclusively as data, by using a **State Variable** instead of a synchronized object, and display the data on the client with normal unsynchronized objects.
