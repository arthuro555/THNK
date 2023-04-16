---
description: L'"état du jeu" est un terme qui réfère à l'ensemble des objets et variables importantes de votre jeu, à partir desquelles on peut reconstruire ce qu'il se passe exactement dans le monde du jeu à un moment X.
sidebar_position: 3
---

# État du jeu

Chaque jeu possède un "état du jeu". L'"état du jeu" est un terme qui réfère à l'ensemble des objets et variables importantes de votre jeu, à partir desquelles on peut reconstruire ce qu'il se passe exactement dans le monde du jeu à un moment X.

Dans THNK, le serveur est responsable de _contrôler et appliquer toute modification de l'état du jeu causée par les actions d'un joueur_ et _d'envoyer celles-cis à tous les clients_. Le rôle du client est _d'afficher l'état du jeu_ et _d'envoyer les demandes du joueur pour changer l'état du jeu_.

## Formes de l'état du jeu

THNK s'occupe de la synchronisation de l'état du jeu du serveur vers le client. Pour cela, il est nécessaire de marquer les éléments de votre scène comme "éléments d'état de jeu" pour THNK. Les éléments d'état de jeu prennent deux formes dans THNK : les objets (pour le monde du jeu) et les variables (pour le reste de l'état du jeu).

### Objets

Les objets peuvent être marqués comme éléments d'état de jeu dans THNK. Il suffit de leur ajouter le comportement "Synchroniser". Ce comportement va surveiller les changements de l'objet et les synchronisera automatiquement avec les clients.

:::note

Seules les propriétés de l'objet sont synchronisées, pas les propriétés de comportement !

Parfois, cela n'est pas gênant : le comportement peut simplement modifier les propriétés de l'objet sur le serveur, et ces changements seront ensuite synchronisés.

Dans d'autres cas, cela peut causer des problèmes. Par exemple, un comportement de mouvement peut déplacer l'objet de manière incorrecte sur les clients entre les mises à jour du serveur s'il n'a pas d'état interne correct. Dans ce cas, vous devrez soit désactiver le comportement sur le client, soit synchroniser les propriétés de comportement par vous-même.

Vous pouvez synchroniser les propriétés internes d'un comportement vous-même en remplaçant les propriétés du comportement par des variables State d'objet. Si vous n'avez pas écrit le comportement vous-même, demandez des conseils à son auteur sur ce qui devrait être synchronisé et ce qui ne devrait pas l'être !

:::

### Variable State

Les objets représentent le monde du jeu en lui-même, tout le monde peut l'observer. Mais certains éléments ne doivent pas être vus par tout le monde, ce sont des données importantes pour un ou plusieurs clients.

Par exemple si vous êtes ou non un l'imposteur dans Among Us : votre client doit le savoir et il doit avoir les options appropriées en fonction de ce rôle. Bien que ce soit des éléments d'état de jeu importants, cela change _la présentation_ et _les options proposées au joueur_, pas le monde en lui-même.

En fait, il est _crucial_ de ne pas inclure cette partie dans le monde du jeu, car cet élément d'état de jeu est spécifique au joueur et ne devrait jamais être partagé avec les autres joueurs (cela pourrait leur permettre de tricher). Le monde du jeu (et donc, par conséquent, l'utilisation des objets synchronisés) doit être limité aux objets qui sont _visibles par tout le monde_, comme une "une partie du monde". Les données spécifiques au joueur sont stockées dans des variables.

Un autre exemple serait un chat dans le jeu : les textes des messages en eux-mêmes peuvent être des éléments de l'état du jeu, puisqu'ils sont partagés avec tout le monde et appartiennent à ce qui se passe dans le jeu, mais ne font pas partie du monde du jeu (dans la plupart des cas) - le message n'est pas une _"entité vivant dans votre monde de jeu"_. Un joueur peut ouvrir le chat à un moment, un autre joueur à un autre moment : la présentation diffère d'un client à l'autre.

Par conséquent, _il est de la responsabilité du client d'afficher les messages, pas celle du serveur_. Pour cela, vous devrez synchroniser les messages uniquement en tant que données, en utilisant une **Variable State** au lieu d'un objet synchronisé, et afficher les données sur le client avec des objets normaux non synchronisés.
