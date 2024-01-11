---
sidebar_position: 5
description: In quest'ultima parte dell'esercitazione introduttiva, vediamo come collegare i giocatori e giocare insieme online.
keywords:
  - per iniziare
  - piattaforme
  - apprendi
  - connetti
  - rete
  - animazione
  - messaggi
  - eventi
  - client
  - giocatore
  - controllo
  - THNK
  - p2p
  - multigiocatore
  - GDevelop
---

# Connetti i client con P2P

:::note

Questa pagina è in sviluppo 👷‍♂️ Screenshot e video sono ancora mancanti, torna più tardi se ne hai bisogno!

:::

Per collegare i giocatori insieme, è necessario un adattatore. Ognuno ha diversi compromessi, e puoi imparare [di più su ciascuno di loro qui](../misc/picking-an-adapter.md). Utilizzeremo P2P perché forse lo conoscete già, essendo integrato in GDevelop.

## Impostazione di P2P

Per utilizzare il P2P con THNK, è necessario [scaricare e installare l'adattatore P2P](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK_P2P.json).

Dopodiché, dobbiamo aggiungere al gioco un menu in cui i giocatori possano collegarsi tra loro.

Prima di iniziare a connetterci, abbiamo bisogno di due cose:

1. Un ID P2P, che può essere ottenuto collegandosi al server del broker
2. Per sapere chi ospiterà il server

Poi, per connettersi,

- L'host del server deve condividere il suo ID P2P
- I client devono inserire l'ID P2P del server

---

Per prima cosa, creiamo una scena menu che contenga al centro il testo "Connessione al server". Se non siamo connessi al broker, è inutile proporre qualsiasi altra opzione, perché avviare un server o connettersi a uno di essi è impossibile senza un ID P2P fornito dal broker.

Possiamo, all'inizio della scena, richiamare semplicemente l'azione "Connetti al server broker predefinito".

:::info server TURN/STUN

Se vuoi aggiungere server TURN/STUN come candidati ICE (consigliati come alternativa se il firewall del giocatore blocca le connessioni P2P), devono essere chiamati appena prima di connettersi al broker, non dopo!

:::

Quando si verifica la condizione "P2P pronto", il broker è connesso e pronto, quindi si può passare alla fase successiva.

:::tip Cosa intendi, vai al passo successivo?!?

Il flusso di connessione tramite P2P è a più fasi:

Connettersi al broker -> Selezionare il ruolo (client/server) -> Scambiare gli ID

Sono disponibili numerose opzioni per passare al "menu successivo" del flusso di connessione:

- Si possono mettere su scene diverse e alternare
- È possibile eliminare gli oggetti e crearne di nuovi per ogni fase
- È possibile posizionare i diversi menu in punti diversi della scena e spostare la camera
- Etc...

:::

Il passo successivo è quello di visualizzare due pulsanti: uno per il client, uno per il server.

## Menu client

La connessione client dovrebbe consentire di digitare un ID. Un oggetto di input di testo è il migliore: permette di scrivere manualmente l'ID se necessario, ma permette anche di incollare l'ID.

Una volta terminato l'inserimento dell'ID, il giocatore deve essere in grado di avviare la connessione. A tale scopo è possibile utilizzare un pulsante dallo store delle risorse di GDevelop.

Quando si preme il pulsante, basta usare semplicemente l’azione “Connetti al server a < P2P ID >” dell’adattatore P2P. Utilizzare le espressioni dell'input di testo per ottenere l'ID inserito.

## Menu server

Per consentire ai client di connettersi, è necessario avviare prima un server THNK. Il server ha bisogno di [una scena THNK](./creating-a-scene.md) per essere avviato.

In questo gioco, ha senso permettere ai giocatori di unirsi e lasciare il gioco in qualsiasi momento dopo che è iniziato, simile a minecraft. Pertanto, avvieremo la scena di gioco direttamente come server THNK P2P, utilizzando l'azione corrispondente dell'adattatore P2P.

Per consentire ai client di connettersi, aggiungeremo un _oggetto di input testuale di sola lettura e disabilitato_ contenente l'ID P2P nella scena del platform. Questo è il modo migliore per rendere il testo selezionabile, consentendo di copiarlo e incollarlo in modo intuitivo, ma anche di leggerlo semplicemente a un amico.

:::tip Lobby

Se nel tuo gioco hai bisogno che tutti i giocatori si uniscano prima di iniziare il gioco, in modo simile a Among Us, puoi creare una scena “lobby” e avviarla come server. Quando tutti i client si sono uniti, si può semplicemente passare alla scena di gioco negli eventi del server.

Finché il cambio di scena viene effettuato dal codice del server, tutti i client seguiranno il cambio e resteranno connessi. Se il passaggio è effettuato dal lato client, però, questo comporta la disconnessione del gioco dal server (poiché si passa dalla scena remota di THNK a una scena locale).

:::

# Conclusioni

Questo è tutto, ora, se fai clic su "server" su un gioco, e poi "client" su un altro gioco e digiti l'ID del server giocherai ✨insieme online✨!

Con questo, siete arrivati alla conclusione di questa guida introduttiva :)

Divertiti a costruire con THNK!
