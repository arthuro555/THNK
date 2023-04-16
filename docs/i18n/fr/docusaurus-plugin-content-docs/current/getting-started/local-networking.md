---
sidebar_position: 4
description: Un jeu n'est jamais totalement le même en multijoueur qu'en solo. Apprendre à prévisualiser et tester votre jeu multijoueur en local est la quatrième étape du tutoriel de démarrage !
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
  - local
  - adaptateur
  - multijoueur
  - GDevelop
---

# Essayez le multijoueur en utilisant l'adaptateur local

Dans THNK, vous devez commencer une scène avec un adaptateur afin de jouer en multijoueur. Les adaptateurs sont fournis sous la forme d'extensions séparées, et mettent en place une solution réseau d'une manière compréhensible pour THNK.

Avant d'implémenter un adaptateur pour connecter vos joueurs ensemble, il est utile de tester votre jeu en mode multijoueur localement. L'adaptateur local THNK présente de nombreux avantages :

- C'est terriblement rapide™
- Il permet de créer et de connecter plusieurs clients en une seule action
- Il est facile de se connecter car il n'y a pas de réseau impliqué.

## Configurer l'adaptateur local

Installez simplement [l'extension d'adaptateur local](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK_Local.json), creez une nouvelle scène (donnez lui un nom comme par exemple `DemarrageRapideMultijoueur`) et, au debut de la scène, ajoutez l'action de l'adaptateur local qui permet de démarrer un serveur avec deux clients.

C'est tout ! Maintenant, la prévisualisation de cette scène démarrera un serveur avec la scène et le nombre de clients que vous avez demandés dans des fenêtres séparées. Vous pourrez ainsi tester le jeu en mode multijoueur.
