---
description: Découvrez ce que sont les adaptateurs et comment ils peuvent vous aider!
sidebar_position: 2
---

# Adaptateurs

THNK ne se soucie pas du réseau par lui-même, seulement du multijoueur. Ironiquement, cependant, l'extension de base THNK ne permet de jouer à votre jeu qu'en mode solo. Si vous voulez jouer en mode multijoueur, vous devrez utiliser un _adaptateur_ avec THNK.

Un adaptateur indique à THNK comment communiquer avec les serveurs ou les clients d'une manière spécifique. Vous pouvez théoriquement construire le vôtre avec JavaScript, mais THNK fournit quelques extensions d'adaptateurs officiels qui devraient couvrir tous vos besoins.

## Adaptateur P2P

:::warning

L'adaptateur P2P n'est pas adapté aux MMO! Le P2P partage les adresses IP, et ce, _par design_. Vous devriez toujours considérer le P2P comme une sorte de _super LAN_ qui peut parfois aussi fonctionner sur Internet - Vous pouvez l'utiliser pour vous connecter à un ami de confiance et jouer avec lui, mais vous ne devriez _jamais_ l'utiliser pour vous connecter avec beaucoup d'étrangers.

:::

L'adaptateur P2P permet à un jeu THNK d'être hébergé simplement sur leur connexion P2P, et aux clients de se connecter à des serveurs via leur identifiant P2P.

Pour l'utiliser, vous devez d'abord connecter votre jeu à un serveur. C'est à vous de décider si vous voulez utiliser le serveur par défaut ou un serveur personnel - THNK fonctionnera avec les deux. Ensuite, vous pouvez utiliser les actions pour héberger un serveur. Lorsque vous hébergez le serveur, donnez un moyen de copier votre identifiant P2P, par exemple avec l'objet de saisie de texte. Enfin, vous pouvez utiliser l'action de connexion pour vous connecter en tant que client à un serveur P2P en utilisant l'identifiant du serveur.

## Adaptateur Geckos.io

Geckos.io est une solution réseau qui permet d'établir des connexions directes entre un serveur et un client. Ces connexions sont des connexions UDP rapides et sécurisées, parfaites pour toutes sortes de jeux. Il est soutenu par la même technologie que le P2P : WebRTC.

Cet adaptateur est idéal pour les architectures où vous vous connectez à un serveur (exemple : Le multijoueur de type Minecraft) et non pas directement un ami avec lequel jouer (par exemple le multijoueur de type Among Us).

## Adaptateurs planifiés

Voici la liste des adaptateurs prévus pour le futur :

- Écran partagé multijoueur
- THNK Cloud

N'hésitez pas à [soumettre d'autres suggestions](https://github.com/arthuro555/THNK/issues/new)!
