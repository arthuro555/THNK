---
sidebar_position: 2
description: In this second part of the getting started tutorial, we take a look at how to make a GDevelop scene the THNK way.
keywords:
  - get started
  - scene
  - setup
  - create
  - rules
  - THNK
  - p2p
  - multiplayer
  - GDevelop
---

# Creating a THNK scene

THNK no tiene muchos requisitos para crear una escena con la que pueda trabajar; Todo lo que tiene que hacer es separar el código del cliente del código del servidor.

:::tip ¡Recuerda!

**Código de cliente** es la parte que los jugadores utilizan para interactuar con el juego. Cualquier elemento presentacional, como la cámara, objetos & efectos de capas, animaciones de sprite, la música o interacciones con el juego, como entradas, menús, HUDs...

**Código del servidor** es la parte que define la lógica y el estado de tu juego, que un hacker no debería ser capaz de manipular. Cosas como posiciones del objeto & movimiento, estados de diferentes objetos, colisiones, estadísticas del jugador, cálculos de daño de combate...

:::

La escena más básica y válida de THNK se ve así:

![Una escena simple con un "Código del servidor de inicio" y "Código del cliente de inicio" condiciones en eventos separados](img/base-THNK-events.png)

:::tip ¡Recuerda!

Cada escena de THNK debe respetar tres reglas:

1. El código debe estar bajo una condición de cliente o servidor. Los grupos y comentarios pueden estar, pero los eventos actuales no pueden
2. Sólo puede haber 1 condición de servidor y 1 código de cliente. Utilice sub-eventos en lugar de repetir la condición.
3. El código del cliente siempre debe ir antes que el código del servidor.

Aunque no rompa tu juego inmediatamente por no respetar esas reglas, pueden conducir a un comportamiento inesperado y a errores que le resultarán difíciles de diagnosticar y corregir.

![El genio de THNK le advierte sobre el respeto de las tres reglas. Si no las respetas lo lamentarás y, bueno, no digas que no te avisó.](img/Genie-warning.png "NO CONFÍES EN EL GENIO")

:::

¡Suficiente clase, empecemos a crear!
