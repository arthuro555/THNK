# Scegliere un adattatore

Ci sono una moltitudine di adattatori con diversi compromessi. Ecco una rapida panoramica di ciascuno di essi per aiutarvi a decidere quale utilizzare. Naturalmente, è possibile utilizzare più adattatori e lasciare che il giocatore ne scelga uno a seconda del caso.

## Tabella comparativa

| Adattatore          | Metodo di connessione |               Velocità                | Piattaforme supportate                         |
| ------------------- | --------------------- |:-------------------------------------:| ---------------------------------------------- |
| P2P                 | Codice Giocatore      |        **A**<sup>+</sup> (UDP)        | Tutto                                          |
| THNK Camere (Relay) | Codice stanza         | **C**<sup>+</sup> (TCP tramite relay) | Tutto                                          |
| Geckos              | Indirizzi IP          |        **A**<sup>-</sup> (UDP)        | Client: Tutti <br/> Server: Solo Desktop |

| Adattatore          |                                                             Sicurezza                                                              |                            Privacy                             |
| ------------------- |:----------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------:|
| P2P                 | **B**<sup>+</sup> (è possibile una connessione client-to-client, che consente di effettuare il DDoS su un client il cui ID è noto) | **C** (indirizzo IP di altri client ottenibile se l'ID è noto) |
| THNK Camere (Relay) |                                                         **A**<sup>+</sup>                                                          |                       **A**<sup>+</sup>                        |
| Geckos              |                                                         **A**<sup>+</sup>                                                          |        **A**<sup>-</sup> (indirizzo IP noto al server)         |

| Adattatore          | Infrastruttura opzionale per il self-host                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P2P                 | I server TURN & STUN per il passaggio attraverso NAT (**senza di essi, alcuni giocatori non potranno connettersi**), server peerjs per la generazione personalizzata di ID P2P |
| THNK Camere (Relay) | THNK Relay server                                                                                                                                                              |
| Geckos              | Un server per eseguire il gioco, i server TURN & STUN per il passeggio attraverso NAT (necessario per la connessione in casi molto rari)                                       |

## Panoramica adattatori

### Adattatore locale

Questo adattatore è solo per i test locali nelle anteprime, non può essere utilizzato per la vera rete.

### P2P

Utilizza la funzione P2P integrata di GDevelop. Poiché si connette direttamente a un altro peer e condivide gli indirizzi IP, è la soluzione più adatta per connettersi con un amico, sia sulla LAN che via cavo. Utilizza WebRTC, la tecnologia utilizzata dalla maggior parte dei software di videochiamata basati sul web.

Lo svantaggio maggiore è che non tutti i giocatori saranno sempre in grado di connettersi tra loro, a seconda del router, del firewall e dell'ISP. È particolarmente frequente se non si possiede un server TURN che funga da proxy relay nel caso in cui le connessioni dirette siano completamente bloccate & impossibili.

Il vantaggio migliore è che può trovare il metodo di rete più veloce (ad esempio, connettersi tramite la LAN invece che tramite Internet se entrambe le macchine sono all'interno della stessa rete), consentendo la massima velocità di connessione.

### THNK Camere (Relay)

Le stanze THNK consentono a qualsiasi giocatore di avviare un server con un determinato codice, e i clienti saranno in grado di connettersi ad esso tramite THNK Relay.

Il relay usa µWebSockets, che è un metodo di rete veloce, ma usa TCP e quindi diventa più lento su una rete affidabile rispetto ad altri adattatori. Questo è il suo principale difetto.

Il vantaggio principale è che utilizza connessioni TCP standard, che non vengono mai bloccate da nessuna rete.

### Geckos

Geckos consente di connettersi al server utilizzando il suo indirizzo IP/nome host. Usa WebRTC, in modo simile a P2P.

Il vantaggio principale è che non richiede la connessione a nessun altro server esterno, quindi è possibile giocare in multiplayer su una rete LAN senza accesso a Internet. Lo svantaggio maggiore è che un server può essere eseguito solo su una build desktop.

## Quale adattatore usare per un gioco...

### Minecraft

Minecraft utilizza un sistema multiplayer autorevole, proprio come THNK! In Minecraft, i giocatori ospitano i loro server su, beh, un server, e i giocatori possono connettersi tramite l'IP o il nome dell'host del server. Questo è un caso d'uso perfetto per Geckos: i server non saranno gestiti direttamente dal gioco, ma principalmente su macchine Linux. Quindi non è un grosso problema se il server non può essere avviato al di fuori di un desktop.

È anche l'unico adattatore che consente la connessione tramite IP/nome host e porta.

### Among Us

Among Us utilizza un sistema di codici di stanza. Dal momento che dei perfetti sconosciuti potranno giocare insieme, non è consigliabile utilizzare il P2P: i giocatori non saranno contenti che il loro IP sia visibile anche a gli altri giocatori(che tra loro non si conoscono) con cui giocano. Inoltre, con P2P, è necessario creare il proprio sistema di matchmaking/ricerca stanze.

È probabile che si voglia invece utilizzare THNK Camere (Relay): Permette di creare un codice di stanza condivisibile, consente anche al giocatore di sceglierne uno proprio, gli indirizzi IP non sono rilevabili e si possono taggare le stanze pubbliche per consentire di mostrare ai giocatori un elenco di stanze a cui possono unirsi.

### Giochi Jackbox

Jackbox utilizza un sistema di codice di stanza. Dato che Jackbox è più che altro un party game, la maggior parte delle persone gioca con i propri amici e familiari, quindi il rischio che i giocatori conoscano l'indirizzo IP degli altri utenti è minimo. Poiché è probabile che vengano giocate più partite di seguito, è utile che il codice non cambi tra una partita e l'altra. Se il gioco Jackbox in questione richiede buoni riflessi o è comunque basato sul tempo, è particolarmente importante avere anche una connessione veloce. Pertanto, sarebbe adatto al P2P. Poiché i giocatori sono probabilmente anche sulla stessa rete locale, le connessioni LAN sono raramente bloccate anche dal router/firewall.

Nota che potresti voler aggiungere una “Modalità Streamer” che utilizza l’adattatore THNK Camere, poiché uno streamer non vorrà che i membri del suo pubblico conoscano il suo indirizzo IP; e molto probabilmente vorrà una nuova stanza per permettere ai nuovi membri del pubblico di unirsi dopo ogni partita. In questo modo si eviterebbe anche di dover installare un server TURN.
