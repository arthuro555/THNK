---
description: Le variabili di stato sono uno degli aspetti centrali di THNK. Una variabile di stato è il modo idiomatico di inviare dati ai client in THNK ed è importante da padroneggiare per creare un gioco.
sidebar_position: 4
---

# Variabili di stato

Le variabili di stato sono uno degli aspetti centrali di THNK. Una variabile di stato è il modo idiomatico di inviare dati ai client in THNK ed è importante da padroneggiare per creare un gioco.

## Tipi di variabili di stato

Attualmente ci sono 2 tipi di variabili di stato: stato pubblico e stato del giocatore.

### Stato pubblico

Lo stato pubblico è semplicemente una variabile di stato condivisa con tutti i client: è destinato ai _dati pubblici_. La variabile di stato pubblica è denominata `Stato` sia sul server che sul client.

### Stato Player

Lo stato del giocatore è sincronizzato con un singolo giocatore: è destinato ai _dati privati specifici del giocatore_.

Sui client, si può accedere allo stato del giocatore direttamente tramite la variabile `PlayerState`.

Sul server, la variabile di stato di un giocatore può essere ottenuta come figlio di `PlayerState` e chiamata come l'ID del giocatore: ad esempio, se un giocatore ha ID `a`, è possibile ottenere la sua variabile di stato del giocatore come `PlayerState.a`. Di solito si usa `PlayerState[THNK::PickedPlayer()]` per ottenere la variabile di stato del giocatore corrente.

:::caution

Questo è soggetto a cambiamenti di rotta, `PlayerState` potrebbe diventare semplicemente la variabile di stato attuale del giocatore in futuro.

:::

## Utilizzo delle variabili di stato

L'uso di una variabile di stato è semplice: una variabile di stato è semplicemente un tipo speciale di **variabile di struttura**. Puoi semplicemente usare qualsiasi variabile figlio di essa come una normale variabile GDevelop e verrà automaticamente sincronizzata sul lato client.

Ad esempio, si potrebbe creare un sistema di chat aggiungendo stringhe alla variabile matrice`State.Messages`, quindi sul lato client, leggendo questa variabile e visualizzando tutti i messaggi in questa matrice.
