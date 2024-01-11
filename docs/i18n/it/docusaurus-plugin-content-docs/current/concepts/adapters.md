---
description: Scopri cosa sono gli adattatori e come possono aiutarti!
sidebar_position: 2
---

# Adattatori

THNK di per sé non si preoccupa della rete in sé, ma solo del multiplayer. Ironicamente, però, l'estensione THNK core consente di giocare solo in single-player. Se volete giocare in multiplayer, dovrete collegare un _adattatore_ a THNK.

Un adattatore dice a THNK come comunicare con il server e con il client in un modo specifico. In teoria è possibile costruirne uno proprio tramite JavaScript, ma THNK fornisce alcune estensioni ufficiali dell'adattatore che dovrebbero coprire tutte le esigenze.

## Adattatore P2P

:::warning

Il P2P non è destinato agli MMO! Il sistema fa trapelare l'indirizzo IP di una persona, e questo è _per progetto_. Il P2P va sempre visto come una sorta di _super LAN_ che molte volte può funzionare anche su Internet: si può usare per connettersi ad un amico fidato e giocare con lui, ma non si dovrebbe _mai_ usarlo per connettersi con molti sconosciuti.

:::

L'adattatore P2P consente semplicemente di ospitare un gioco THNK sulla propria connessione P2P e di connettersi ai server utilizzando il proprio ID P2P.

Per usarlo, devi prima collegare il tuo gioco a un server broker. Sta a te se usare quello predefinito o quello personalizzato - THNK funziona con entrambi. Quindi, è possibile utilizzare le azioni per ospitare un server. Quando si ospita il server, bisogna fornire un modo per copiare l'ID P2P, ad esempio si potrebbe usare l'oggetto di inserimento testo. Infine, è possibile utilizzare l'azione di connessione per connettersi come client a un server P2P utilizzando l'ID del server.

## Adattatore Geckos.io

Geckos.io è una soluzione di rete che permette di stabilire connessioni dirette tra un server e un client. Queste connessioni sono connessioni UDP veloci e sicure, perfette per tutti i tipi di giochi. È supportato dalla stessa tecnologia del P2P: WebRTC.

Questo adattatore è ideale per le architetture in cui ci si connette "The Server™" (ad esempio, il multiplayer simile a Minecraft) e non direttamente a un amico per giocare (ad esempio, il multiplayer simile a Among Us).

## Adattatori Previsti

Ecco l'elenco degli adattatori in programma per il futuro:

- Multigiocatore a schermo diviso
- THNK Cloud

Non esitate a [segnalare altri suggerimenti](https://github.com/arthuro555/THNK/issues/new)!
