---
description: Les variables State sont l'un des aspects fondamentaux de THNK. Utiliser les variables State est le moyen idiomatique d'envoyer des données aux clients dans THNK, et il est important de les maîtriser pour créer un jeu.
sidebar_position: 4
---

# Les variables State

Les variables State sont l'un des aspects fondamentaux de THNK. Utiliser les variables State est le moyen idiomatique d'envoyer des données aux clients dans THNK, et il est important de les maîtriser pour créer un jeu.

## Les différents types de variables State

Il existe actuellement 2 types de variables State : variable State publique et variable PlayerState.

### Variable State publique

Les variables State publiques sont partagées avec tous les clients : elles sont destinées aux _données publiques_. Les variables State publiques sont nommées `State` sur le serveur et les clients.

### Variables PlayerState

Les variables PlayerState ne sont synchronisées qu'avec un seul joueur. Elles sont prévues pour les _données spécifiques du joueur_.

Sur les clients, vos propres variables d'état de joueur peuvent être trouvées directement via la variable `PlayerState`.

Sur le serveur, les variables d'état d'un joueur peut être lues en tant qu'enfant de `PlayerState` ajouté après l'identifiant du joueur : par exemple, si un joueur a un Identifiant `a`, alors vous pouvez obtenir leurs variables d'état de joueur avec `PlayerState.a`. Généralement, on utilisera `PlayerState[THNK::PickedPlayer()]` pour obtenir la variable d'état du joueur actuel.

:::caution

Ceci est sujet à des changements qui peuvent s'avérer destructeur pour votre code. Dans le futur, `PlayerState` pourrait simplement devenir la variable d'état du joueur sélectionné.

:::

## Utilisation des variables State

Utiliser une variable State est simple : une variable State est simplement un type spécial de **structure de variables**. Vous pouvez simplement utiliser n'importe quelle variable enfant comme une variable de GDevelop normale, et elle sera automatiquement synchronisée du côté du client.

Par exemple, vous pourriez créer un système de chat en ajoutant des enfants à la variable `State.Messages`, puis, du côté client, lire cette variable et en afficher tous les enfants.
