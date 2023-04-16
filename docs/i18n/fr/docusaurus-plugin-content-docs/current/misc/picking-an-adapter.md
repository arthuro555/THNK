# Choisir un adaptateur

Il y a une multitude d'adaptateurs avec des avantages et inconvénients différents. Voici un aperçu rapide de chacun d'eux pour vous aider à décider lequel ou lesquels utiliser. Bien sûr, vous pouvez également utiliser plusieurs adaptateurs et laisser le joueur en choisir un en fonction de son d'utilisation.

## Tableau comparatif

| Adaptateur             | Méthode de connexion |                   Vitesse                   | Plateformes supportées                                     |
| ---------------------- | -------------------- |:-------------------------------------------:| ---------------------------------------------------------- |
| P2P                    | Code du joueur       |           **A**<sup>+</sup> (UDP)           | Toutes                                                     |
| Chambres THNK (Relais) | Code-chambre         | **C**<sup>+</sup> (TCP à travers le relais) | Toutes                                                     |
| Geckos                 | Adresse IP           |           **A**<sup>-</sup> (UDP)           | Client : Toutes <br/>Serveur : ordinateur uniquement |

| Adaptateur             |                                                Sécurité                                                 |                                Confidentialité                                |
| ---------------------- |:-------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:|
| P2P                    | **B**<sup>+</sup> (Connexion client-client possible, permettant de DDoS un client dont l'ID est connue) | **C** (adresse IP des autres clients pouvant être obtenue si l'ID est connue) |
| Chambres THNK (Relais) |                                            **A**<sup>+</sup>                                            |                               **A**<sup>+</sup>                               |
| Geckos                 |                                            **A**<sup>+</sup>                                            |               **A**<sup>-</sup> (adresse IP connue du serveur)                |

| Adaptateur             | Infrastructure optionnelle pour l'auto-hôte                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2P                    | Des serveurs TURN & STUN servers pour transpercer le NAT (**sans quoi certains joueurs ne peuvent se connecter entre eux**), et un serveur de mise-en-relation peerjs si on souhaite avoir une génération d'ID P2P différente de celle par défaut |
| Chambres THNK (Relais) | Serveur de relais THNK                                                                                                                                                                                                                            |
| Geckos                 | Un serveur pour faire tourner le jeu, et des serveurs TURN & STUN pour transpercer le NAT (nécessaire pour se connecter dans des cas très rares)                                                                                                  |

## Aperçu des adaptateurs

### Adaptateur local

Cet adaptateur est pour les tests locaux dans les aperçus uniquement, il ne peut pas être utilisé pour un véritable réseau.

### P2P

Il utilise la fonction P2P intégrée à GDevelop. Puisqu'il se connecte à un autre peer directement et partage des adresses IP, il est le plus adapté pour se connecter à un ami, que ce soit sur le réseau local ou en filaire. Il utilise WebRTC, la technologie utilisée par la plupart des logiciels d’appel vidéo en ligne.

L'inconvénient majeur est que tous les joueurs ne seront pas toujours en mesure de se connecter l'un à l'autre, selon leur routeur, leur pare-feu et leur FAI. C'est particulièrement fréquent si vous ne possédez pas de serveur TURN pour agir en tant que relais proxy au cas où les connexions directes seraient complètement bloquées & impossibles.

L'avantage majeur est qu'il peut trouver le type de réseau le plus rapide (par ex. se connecter via LAN au lieu de passer par Internet si les deux machines se trouvent sur le même réseau), permettant ainsi de profiter de la vitesse de connexion la plus rapide.

### Chambres THNK (Relais)

Les chambres THNK permettent à n'importe quel joueur de démarrer un serveur avec un code donné, et les clients seront en mesure de s'y connecter via le Relais THNK.

Le relais utilise μWebSockets qui est un type de réseau rapide, bien qu'il utilise TCP et devient donc plus lent sur un réseau fiable par rapport aux autres adaptateurs. C'est là son principal défaut.

L'avantage majeur est qu'il utilise des connexions TCP standard, qui ne sont jamais bloquées par aucun réseau.

### Geckos

Geckos vous permet de vous connecter au serveur en utilisant son adresse IP/nom d'hôte. Il utilise WebRTC, de la même manière que le P2P.

Le plus grand avantage est qu'il ne nécessite pas de connexion à un autre serveur externe, Il est donc possible de jouer en multijoueur en LAN sans accès à Internet. Le plus grand inconvénient est qu'un serveur ne peut être exécuté que sur un ordinateur bureau.

## Quel adaptateur utiliser pour un jeu comme...

### Minecraft

Minecraft utilise un système multijoueur autoritaire, tout comme THNK ! Dans Minecraft, les joueurs hébergent leurs serveurs sur, eh bien, un serveur pour que les joueurs puissent se connecter via l'IP du serveur ou le nom d'hôte. C'est un cas d'utilisation parfait pour Geckos: les serveurs ne seront pas exécutés directement à partir du jeu, mais surtout sur des machines linux. Ce n'est donc pas un gros problème si le serveur ne peut pas être lancé en dehors d'un ordinateur.

C'est aussi le seul adaptateur permettant de se connecter via IP/nom d'hôte et port.

### Among us

Among us utilise un système de chambre à code. Puisque de parfaits inconnus pourront jouer ensemble, vous ne devez pas utiliser le P2P - vos joueurs ne seraient pas d'accord pour partager leurs adresses IP avec des personnes qu'ils ne connaissent pas. De plus, avec le P2P, vous devriez créer votre propre système de recherche de partie/chambre.

Vous devriez probablement utiliser les chambres THNK (Relais) à la place: cela vous permet de créer un code de chambre partageable. Cela permet même au joueur de choisir son propre code. Les adresses IP ne sont pas identifiables et vous pouvez taguer les chambres publiques pour permettre au joueur d'obtenir une liste de chambres qu'il peut rejoindre.

### Jeu type Jackbox

Jackbox utilise un système de code de chambres. Comme Jackbox est un jeu plus familial, la plupart des gens vont jouer avec leurs amis et leur famille. Il y a donc peu de risques à laisser les joueurs connaitre mutuellement leurs adresses IP. Étant donné que plusieurs parties sont susceptibles d'être jouées d'affilée, c'est plus pratique si le code ne change pas entre chaque partie. Si le jeu Jackbox en question nécessite de bons réflexes ou est basé sur un chronomètre, il est également particulièrement important d'avoir une connexion rapide. Par conséquent, ce serait bien adapté pour le P2P. Comme les joueurs sont probablement sur un réseau local, les connexions LAN sont rarement bloquées par les routeurs/pares-feu.

Notez que vous pourriez ajouter un "Mode Streamer" qui utilise l'adaptateur chambres THNK à la place. Un streamer ne veut pas que son public connaisse son adresse IP, et voudra probablement une nouvelle chambre que les nouveaux membres du public pourront rejoindre après chaque partie. Cela permettrait aussi d'éviter de devoir installer un serveur TURN.
