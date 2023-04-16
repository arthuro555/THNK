---
sidebar_position: 5
description: Dans cette dernière partie du tutoriel de démarrage, nous allons voir comment connecter vos joueurs et jouer ensemble en ligne.
keywords:
  - comment démarrer
  - jeu de plateforme
  - apprendre
  - connecter
  - réseau
  - animation
  - messages
  - événements
  - client
  - joueur
  - contrôles
  - THNK
  - p2p
  - multijoueur
  - GDevelop
---

# Connecter les clients en P2P

:::note

Cette page est en construction 👷‍♂️ Des captures d'écran et des vidéos sont manquantes, revenez plus tard si vous en avez besoin !

:::

Pour connecter les joueurs ensemble, un adaptateur est requis. Ils ont tous des avantages et des inconvénients et vous pouvez en [apprendre plus sur chacun d'eux ici](../misc/picking-an-adapter.md). Nous allons utiliser le P2P qui est intégré à GDevelop et avec lequel vous êtes donc peut-être familier.

## Configuration du P2P

Afin d'utiliser le P2P avec THNK, vous devrez [télécharger et installer l'adaptateur P2P](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK_P2P.json).

Après cela, nous devons ajouter un menu au jeu où les joueurs pourront se connecter ensemble.

Avant que nous puissions nous connecter, nous avons besoin de deux choses :

1. Un identifiant P2P, qui peut être obtenu en se connectant au serveur
2. Pour savoir qui hébergera le serveur

Ensuite, pour se connecter,

- L'hôte du serveur doit partager son ID P2P
- Les clients doivent entrer l'ID P2P du serveur

---

Tout d'abord, nous allons créer une scène de menu qui contient en son centre un texte "Connexion au serveur". Tant que nous ne sommes pas connectés au serveur, il est inutile de proposer toute autre option. (comme démarrer un serveur ou se connecter à un serveur) En effet, c'est impossible sans un identifiant P2P fourni par le serveur.

Nous pouvons, au début de la scène, simplement appeler l'action "Se connecter au serveur par défaut".

:::info serveurs TURN/STUN

Si vous allez ajouter des serveurs TURN/STUN en tant que candidats ICE (recommandé comme solution de secours si le pare-feu du joueur bloque les connexions P2P), Ils doivent être appelés juste avant de se connecter au serveur, pas après !

:::

Lorsque la condition « P2P est prêt », le serveur est connecté et prêt et nous pouvons donc passer à l'étape suivante.

:::tip Que voulez-vous dire, passer à l'étape suivante?!?

Le flux de connexion via P2P se compose de plusieurs étapes :

Se connecter au serveur -> Sélectionner un rôle (client/serveur) -> Échange d'identifiants

Vous avez de nombreuses options pour aller au "menu suivant" du flux de connexion :

- Vous pouvez les mettre sur différentes scènes et basculer sur celles ci
- Vous pouvez supprimer des objets et en créer de nouveaux pour chaque étape
- Vous pouvez placer différents menus à différents endroits sur la scène et déplacer la caméra
- Etc...

:::

L'étape suivante consiste à afficher deux boutons : un pour le client, un pour le serveur.

## Menu du client

La connexion du client doit permettre de saisir un identifiant. Un objet de saisie de texte est la meilleure solution : il permet d'écrire manuellement l'identifiant si nécessaire, mais aussi de coller un identifiant précédemment copié.

Une fois que le joueur a fini d'entrer dans l'identifiant, il doit être en mesure d'initier la connexion. Pour cela, vous pouvez utiliser un bouton de la boutique de ressources GDevelop.

Lorsque le bouton est appuyé, il suffit d'utiliser l'action de l'adaptateur P2P "Se connecter au serveur à < P2P ID >". Utilisez le contenu de l'objet de saisie de texte pour obtenir l'identifiant saisi.

## Menu du serveur

Pour que les clients puissent se connecter, un serveur THNK doit d'abord être initié. Le serveur a besoin d' [une scène THNK](./creating-a-scene.md) pour fonctionner.

Dans ce jeu, il est logique de permettre aux joueurs de se joindre à une partie en cours et d'en partir quand ils le souhaitent, comme dans Minecraft. Par conséquent, nous allons juste lancer la scène de jeu directement en tant que serveur THNK P2P, en utilisant l'action correspondante de l'adaptateur P2P.

Pour permettre aux clients de se connecter, nous allons ajouter un _objet texte en lecture seule _ contenant l'identifiant P2P dans la scène du jeu de plate-forme. C'est la meilleure façon de faire du texte sélectionnable, permettant de le copier/coller facilement et de manière intuitive, tout en permettant aussi de le lire à un ami.

:::tip Lobby

Si dans votre jeu, vous avez besoin que tous les joueurs soient connectés avant de lancer la partie, comme dans AmongUs, vous pouvez créer une scène de "lobby" et la démarrer en tant que serveur. Lorsque tous les clients se sont joints, vous pouvez simplement basculer sur la scène de jeu dans les évènements du code du serveur.

Tant que le changement de scène est effectué par le code du serveur, tous les clients suivront et resteront connectés. En revanche, si le changement de scène est effectué côté client, cela va déconnecter le jeu du serveur (vous partez de la scène serveur de THNK à une scène locale).

:::

# Conclusion

Voilà, maintenant, si vous cliquez sur "serveur" dans un jeu, et sur "client" dans un autre jeu en rentrant l'identifiant du serveur, vous jouerez ✨ensemble en ligne✨!

Avec cette dernière partie vous êtes arrivé à la conclusion de ce tutoriel de démarrage :)

Amusez-vous à construire avec THNK !
