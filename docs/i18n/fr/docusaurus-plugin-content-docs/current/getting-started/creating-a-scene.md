---
sidebar_position: 2
description: Dans cette seconde partie du tutoriel débutant, découvrons comme faire une scène GDevelop basée sur THNK.
keywords:
  - comment démarrer
  - scène
  - configuration
  - créer
  - règles
  - THNK
  - p2p
  - multijoueur
  - GDevelop
---

# Créer une scène THNK

Il n'y a pas beaucoup de prérequis pour créer une scène qui fonctionne avec THNK ; Il suffit de séparer le code client et le code serveur.

:::tip À retenir !

**Le code client** est la partie que les joueurs utilisent pour interagir avec le jeu. Tous les éléments de rendu comme : la caméra, les effets d'objets/de calque, les animations de sprites, la musique... Ou les interactions avec le jeu comme : les commandes, menus, interfaces...

**Le code serveur** est la partie qui définit la logique et le statut du jeu. Un hacker ne devrait pas avoir la possibilité de le modifier. Des éléments comme la position des objets, leurs mouvements, leurs statuts... Ou encore les collisions, statistiques des joueurs, calculs de dégâts des combats...

:::

Voilà à quoi ressemble la scène THNK fonctionnelle la plus basique :

![Une simple scène avec les conditions "Démarrer code serveur" et " Démarrer code client" dans des évènements séparés](img/base-THNK-events.png)

:::tip À retenir !

N'importe quelle scène THNK doit respecter trois règles :

1. Le code doit obligatoirement se trouver après une condition serveur ou client. Les groupes ou commentaires ne doivent pas forcément respecter cette règle mais c'est obligatoire pour les évènements en eux-mêmes
2. Il ne peut y avoir qu'une seule condition code serveur et qu'une seule condition code client. Il faut donc utiliser des sous évènements à ces deux conditions.
3. Le code client doit toujours se trouver avant le code serveur.

Cela ne va pas forcément immédiatement détruire la logique du jeu, mais il y a de forts risques que cela provoque des comportements inattendus et des bugs qu'il sera difficile d'isoler et de réparer.

![Le génie de THNK vous somme de respecter les trois règles. Si vous ne les respectez pas, vous le regretterez et vous ne pourrez pas dire qu'il ne vous avait pas parvenu.](img/Genie-warning.png "NE FAITES PAS CONFIANCE AU GENIE")

:::

Assez de blabla, commençons à créer !
