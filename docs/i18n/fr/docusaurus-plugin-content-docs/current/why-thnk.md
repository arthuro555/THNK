---
sidebar_position: 1
title: Qu'est-ce que THNK?
description: Une brève introduction à THNK - Qu'est-ce que c'est? Pourquoi voudrais-je l'utiliser ? Par où commencer ? Toutes ces questions trouveront des réponses ici. C'est le point de départ recommandé pour commencer avec le framework THNK.
keywords:
  - comment démarrer
  - intro
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

# Commencer avec THNK - Qu'est-ce que THNK ?

> THNK est un framework pour construire des jeux GDevelop avec le multijoueur à l'esprit.

:::info

THNK est un framework et non une simple extension - c'est une façon de structurer et de coder vos jeux. Malgré le fait de vous forcer à structurer vos événements d'une certaine manière THNK reste relativement flexible, donc ne vous inquiétez pas si vous avez déjà commencé à créer votre jeu et que vous voulez le migrer vers THNK.

:::

## Pourquoi THNK?

Construire votre jeu avec THNK offre de multiples avantages. Voici les plus importants :

### Il fait fonctionner votre jeu en mode solo et multijoueur sans aucun changement supplémentaire

THNK en lui-même n'oblige pas votre jeu à être un jeu multijoueur. Par défaut, tous les jeux THNK fonctionnent en mode solo, comme s'ils n'étaient pas construits avec THNK. Vous ne vous enfermez pas sur la voie du multijoueur en utilisant THNK, mais cela rend très facile l'ajout d'une fonction multijoueur de haute qualité au jeu.

### Différents types de multijoueur peuvent être activés en une seule action

La vraie magie de THNK réside dans ses nombreuses extensions d'adaptateur. Une extension d'adaptateur vous permet de lancer un serveur ou un client pour un backend réseau spécifique en 1 action. Les adaptateurs actuellement disponibles sont :

- P2P (expérience de type LAN mondiale)
- Geckos.io (se connecter avec IP/nom de l'hôtel et port)
- Chambres THNK (Connectez avec les codes de la chambre)

Cela permet d'implémenter une variété de types de multijoueur sans aucun effort et en quelques minutes !

### Le multijoueur THNK est toujours autoritaire

Les jeux multijoueurs peuvent se faire de nombreuses façons. En fait, tout ce qu'il y a à faire, c'est de synchroniser des objets entre les différentes instances d'un jeu. Mais il ne faut pas le faire n'importe comment : si nous laissons tout le monde synchroniser n'importe quel objet du jeu, un pirate informatique pourrait facilement envoyer des mises à jour malveillantes à d'autres clients afin de tricher ou de planter leurs jeux.

Le multijoueur autoritaire est une architecture qui vise à éviter ça. Dans une architecture autoritaire, il y a un seul serveur désigné qui exécute tout le code du jeu. C'est ce qu'on appelle la _source de vérité_: toutes les instances du jeu feront confiance uniquement à ce serveur. De cette façon, pour qu'un hacker puisse manipuler le jeu, il faudrait qu'il puisse contrôler le serveur.

Cette technique n'est pas non plus infaillible à 100%, surtout dans un contexte où tout le monde peut héberger un serveur et que l'hôte peut être un hacker. Mais cela devrait protéger le jeu contre 99% des tentatives de piratage & de triche &.

Dans THNK, tout le multijoueur, quel que soit l'adaptateur, sera toujours autoritaire. Tout simplement, en faisant votre jeu avec THNK, vous diminuez fortement les chances que quelqu'un réussisse à hacker ou à tricher dans votre jeu.

### Versions de serveur

THNK est conçu pour pouvoir créer une version de serveur spéciale à partir de votre jeu. Cette version peut ensuite être partagée avec les joueurs pour qu'ils hébergent leurs propres serveurs de jeu (comme minecraft), ou vous pouvez l'utiliser pour héberger des serveurs de jeu optimisés par vous-même, permettant de créer des MMOs par exemple.

Dans le futur, un cloud THNK est prévu. Ce serait une plateforme qui prendrait en charge la création des versions de serveur pour vous et les hébergerait _gratuitement_! Si vous voulez qu'elle voit le jour, envisagez [de faire un don pour aider à acheter les serveurs](https://ko-fi.com/arthuro555).

### On ne peut pas plus facile : & synchronisation des variables d'objets

Synchroniser des objets et des variables peut être très compliqué lorsque vous faites du multijoueur par vous-même. Dans THNK, c'est aussi simple que d'ajouter un comportement aux objets que vous vous synchroniser. Pour les variables, il suffit de faire commencer leurs noms par un préfixe :`State.`. Vous pouvez vous concentrer sur votre jeu au lieu du réseau et de la synchronisation des différents éléments.

### Cela fournit une solution optimisée pour la synchronisation d'objets et de variables entre le serveur et les clients.

THNK est aussi optimisé que possible pour rendre vos serveurs et clients de jeux super rapides.

- Il utilise un protocole binaire personnalisé basé sur [FlatBuffers](https://google.github.io/flatbuffers/) et [msgpackr](https://github.com/kriszyp/msgpackr), au lieu de formats beaucoup plus lourds comme JSON, et en plus, tous les messages sont compressés en utilisant l'algorithme de déflation, le même que celui utilisé dans les fichiers zip, pour utiliser le moins de bande passante possible et fournir un emballage et un déballage plus rapides des messages.
- Il synchronise seulement ce que vous lui dites de synchroniser
- Il prend uniquement en compte les éléments qui ont changé depuis la dernière synchronisation
- Cela permet d'avoir un taux de mise à jour du serveur plus lent que celui du client, et d'interpoler les résultats sur le client afin d'utiliser moins de ressources serveur et de bande passante. (Prochainement !)
- THNK est écrit en TypeScript en utilisant les API internes de GDevelop pour être aussi rapide qu'une fonctionnalité intégrée

:::note

Il est prévu d'ajouter la possibilité de tirer parti du snapshot binaire optimisé d'une scène pour permettre d'ajouter facilement un système de sauvegarde/chargement dans le futur.

:::

### Et bien plus encore !

- Lier des objets aux joueurs
- Authentification (bientôt disponible !)
- Réplication du serveur (désignation et mise à jour d'un serveur secondaire comme serveur de secours) (bientôt disponible !)
- Etc...

## Par où commencer ?

Convaincu ? Si oui, [continuez vers la page suivante pour apprendre comment commencer à utiliser THNK](/docs/getting-started/)!
