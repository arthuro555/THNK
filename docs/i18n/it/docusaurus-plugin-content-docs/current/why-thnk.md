---
sidebar_position: 1
title: Che cos’è THNK?
description: Una breve introduzione a THNK - Che cos'è? Perché vorrei usarlo? Da dove si comincia? A tutte queste domande sarà data una risposta qui. È il punto di partenza raccomandato per iniziare con il framework THNK.
keywords:
  - per iniziare
  - introduzione
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

# Come iniziare con THNK - Comunque cos'è THNK?

> THNK è un framework per la costruzione di giochi con GDevelop pensando al multigiocatore.

:::info

THNK è un framework e non una semplice estensione - è un intero modo di strutturare e programmare i tuoi giochi. Nonostante imponga una certa struttura ai tuoi eventi, è fatto per essere relativamente flessibile, quindi non devi preoccuparti se hai già iniziato a creare il tuo gioco e desideri migrarlo su THNK in un secondo momento.

:::

## Perché THNK?

Costruire il tuo gioco usando THNK offre molteplici vantaggi. Ecco quelli più notevoli:

### Fa funzionare il tuo gioco sia in singolo che in multigiocatore senza modifiche aggiuntive

THNK di per sé non obbliga il tuo gioco ad essere un gioco multiplayer. Per impostazione predefinita, tutti i giochi basati su THNK funzionano normalmente in giocatore singolo, come se non fossero costruiti con THNK. L'utilizzo di THNK non comporta alcun impegno per il multigiocatore, ma rende estremamente semplice l'aggiunta di una funzione multigiocatore di alta qualità al gioco.

### Differenti tipi di multigiocatore possono essere abilitati in un'unica azione

La vera magia di THNK sta nelle sue numerose estensioni dell'adattatore. Un'estensione adattatore consente di avviare un server o un client per uno specifico backend di rete in un'unica azione. Gli adattatori attualmente disponibili includono:

- P2P (esperienza simile a una LAN mondiale)
- Geckos.io (Connetti con IP/Nome Host e porta)
- THNK Camere (Connessione con i codici camera)

In questo modo è possibile implementare una varietà di tipi di multiplayer senza alcuno sforzo e in pochi minuti!

### THNK multiplayer è sempre autorevole

I giochi multiplayer possono essere realizzati in molti modi. Alla fine si tratta solo di sincronizzare gli oggetti tra le istanze di un gioco. Ma alcuni modi di farlo possono essere negativi: se permettiamo a tutti di sincronizzare qualsiasi oggetto del gioco, un hacker potrebbe facilmente inviare aggiornamenti dannosi agli altri client per barare o mandare in crash le loro partite.

Il multiplayer autoritario è un'architettura che mira a proteggere il gioco da questo problema. In un'architettura autoritaria, c'è designato un solo server che esegue tutto il codice del gioco. Questa è la cosiddetta _fonte di verità_: tutte le istanze del gioco si fideranno di solo e soltanto di quel server. In questo modo, per poter manipolare il gioco, un hacker dovrebbe controllare il server.

Anche questa tecnica non è infallibile al 100%, soprattutto in un contesto in cui chiunque può ospitare un server e l'host potrebbe essere un hacker, ma questa tecnica dovrebbe comunque proteggere il gioco dal 99% delle tecniche di hacking & tentativi di barare.

In THNK, tutto il multiplayer, indipendentemente dall'adattatore, sarà sempre autorevole. Semplicemente creando il tuo gioco con THNK, riduci notevolmente le possibilità che qualcuno riesca ad hackerare o barare nel tuo gioco.

### Creazioni server

THNK è stato creato per poter creare un server speciale per il vostro gioco. Questa build può essere condivisa con i giocatori per ospitare i propri server di gioco (come Minecraft), oppure può essere utilizzata per ospitare server di gioco ottimizzati per conto proprio, consentendo ad esempio di creare MMO.

In futuro, è previsto un THNK Cloud. Si tratta di una piattaforma che si occupa di creare build di server per voi e di ospitare i vostri server di gioco, _in modo gratuito_! Se volete che veda la luce, considerate la possibilità di [fare una donazione per contribuire all'acquisto dei server](https://ko-fi.com/arthuro555).

### Semplice oggetto morto & sincronizzazione delle variabili

La sincronizzazione di oggetti e variabili può essere un problema quando si lavora da soli in multiplayer. In THNK, è semplice come mettere un comportamento sugli oggetti che vuoi sincronizzare, e aggiungere il prefisso `Stato` ai nomi delle variabili che vuoi sincronizzare. Potete concentrarvi sul vostro gioco invece che sul collegamento in rete e sulla sincronizzazione di diversi elementi.

### Fornisce una soluzione ottimizzata per la sincronizzazione di oggetti e variabili tra server e client.

THNK è ottimizzato al massimo per rendere superveloci il server e il client dei giochi.

- Utilizza un protocollo binario personalizzato basato su [FlatBuffers](https://google.github.io/flatbuffers/) e [msgpackr](https://github.com/kriszyp/msgpackr), invece di formati molto più pesanti come JSON; inoltre, tutti i messaggi sono compressi utilizzando l'algoritmo deflate, lo stesso usato nei file zip, per utilizzare la larghezza di banda minima e fornire un impacchettamento e uno spacchettamento più rapidi dei messaggi.
- Sincronizza solo ciò che gli si dice di fare
- Sincronizza solo cose che sono cambiate dall'ultima sincronizzazione
- Consente di avere una velocità di aggiornamento del server più lenta di quella del client e di interpolare i risultati sul client, per utilizzare meno risorse del server e larghezza di banda. (In arrivo!)
- È scritto in TypeScript utilizzando le API interne di GDevelop per essere veloce come una funzione integrata

:::note

Si prevede di aggiungere la possibilità di sfruttare lo snapshot binario ottimizzato di una scena per consentire di aggiungere facilmente il salvataggio e il caricamento in futuro.

:::

### E altro ancora!

- Collegamento oggetti ai giocatori
- Autenticazione (in arrivo!)
- Replica del server (designazione e aggiornamento di un server secondario come sicurezza) (in arrivo!)
- Etc...

## Da dove si comincia?

Sei già convinto? Se è così, [continua a leggere la pagina successiva per imparare a usare THNK](/docs/getting-started/)!
