---
description: Lo stato del gioco si riferisce agli oggetti e alle variabili importanti del tuo gioco, che quando tutti messi insieme permettono di vedere esattamente lo stato attuale del gioco e del mondo di gioco.
sidebar_position: 3
---

# Stato del gioco

Ogni gioco ha una sorta di stato di gioco. Lo stato del gioco si riferisce agli oggetti e alle variabili importanti del tuo gioco, che quando tutti messi insieme permettono di vedere esattamente lo stato attuale del gioco e del mondo di gioco.

In THNK, è il ruolo del server per _controllare gli aggiornamenti allo stato di gioco_ e _inviare aggiornamenti a tutti i client_. Il ruolo del cliente è quello di _visualizzare lo stato di gioco_ e _inviare le richieste del giocatore per modificare lo stato di gioco_.

## Forme di stato del gioco

THNK si occupa di sincronizzare lo stato di gioco dal server al client. Per questo, però, è necessario contrassegnare gli elementi della vostra scena come stato di gioco per THNK. Lo stato del gioco assume due forme in THNK: oggetti (per il mondo di gioco) e variabili (per il resto dello stato del gioco).

### Oggetti

Gli oggetti possono essere contrassegnati come stato del gioco in THNK aggiungendo su di essi il comportamento "Sincronizza". Questo comportamento controllerà le modifiche sull'oggetto e le sincronizzerà automaticamente sui client.

:::note

Vengono sincronizzate solo le proprietà dell'oggetto, non le proprietà del comportamento!

A volte va bene: il comportamento può semplicemente modificare le proprietà dell'oggetto sul server e tali modifiche verranno sincronizzate con successo.

In altri casi, ciò può causare problemi. Ad esempio, un comportamento di movimento potrebbe spostare l'oggetto in modo errato sui client tra gli aggiornamenti dal server se non ha uno stato interno corretto. In questo caso, sarà necessario disabilitare il comportamento sul client o sincronizzare manualmente le proprietà del comportamento.

È possibile sincronizzare manualmente le proprietà interne di un comportamento sostituendo le proprietà del comportamento con le variabili di stato dell'oggetto. Se non hai scritto tu il comportamento, chiedi consiglio all'autore su cosa dovrebbe essere sincronizzato e cosa no!

:::

### Variabili di stato

Gli oggetti rappresentano il mondo di gioco in sé, poiché tutti possono osservarlo. Ma alcuni elementi non sono visibili a tutti, ma sono dati importanti per uno o più clienti.

Prendi ad esempio se sei un impostore in Among Us - il tuo client vorrà saperlo, poiché è fondamentale che il giocatore lo sappia e gli vengano presentate le opzioni appropriate a seconda di questo ruolo. Sebbene questo sia uno stato importante del gioco, ciò che cambia è _la presentazione_ e le _opzioni del giocatore_, non il mondo di gioco stesso.

È, infatti, _cruciale_ non rendere questo parte del mondo di gioco, poiché questo stato di gioco è specifico del giocatore e non dovrebbe mai essere condiviso con altri giocatori (questo potrebbe consentire di barare). Il mondo di gioco (e quindi l'uso di oggetti sincronizzati) dovrebbe essere limitato agli oggetti che sono _visibili a tutti_, come se fossero "parte del mondo". I dati specifici del giocatore appartengono alle variabili.

Un altro esempio potrebbe essere una chat di gioco: i messaggi di testo possono rappresentare lo stato del gioco, poiché sono condivisi con tutti e fanno parte di ciò che accade nel gioco, ma non fanno parte del mondo di gioco (nella maggior parte dei casi): il messaggio _non è un "entità che vive nel tuo mondo di gioco"_. Un giocatore potrebbe aprire la chat in un momento, un altro giocatore in un altro momento: la presentazione differisce da un client all’altro.

Pertanto, è _responsabilità del client visualizzare i messaggi, non del server_. A tale scopo, sarà necessario sincronizzare i messaggi esclusivamente come dati, utilizzando una **variabile di stato** anziché un oggetto sincronizzato, e visualizzare i dati sul client con normali oggetti non sincronizzati.
