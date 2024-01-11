---
sidebar_position: 4
description: Un gioco non è mai completamente uguale in multiplayer rispetto al giocatore singolo. In questa quarta parte dell'esercitazione introduttiva, imparate come visualizzare l'anteprima e testare il multiplayer del gioco in locale!
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
  - locale
  - adattatore
  - multigiocatore
  - GDevelop
---

# Prova il multiplayer utilizzando l'adattatore locale

In THNK, per giocare in multiplayer è necessario avviare una scena con un adattatore. Gli adattatori sono forniti come estensioni separate, e configurano una soluzione di rete in modo comprensibile per THNK.

Prima di implementare un adattatore per collegare tra loro i giocatori, è utile testare il gioco in modalità multigiocatore in locale. L'adattatore locale THNK ha molti vantaggi:

- E Blazingly Fast™
- Permette di aprire e collegare più client in un'unica azione
- È facile connettersi, perché non c'è bisogno di un collegamento in rete.

## Configura l'adattatore locale

Basta installare l'estensione [dell'adattatore locale](https://raw.githubusercontent.com/arthuro555/THNK/master/extensions/THNK_Local.json), creare una nuova scena (mi piace chiamarla qualcosa di simile a`MultiplayerQuickStart`), e mettere l'azione dall'adattatore locale per avviare un server con 2 client all'inizio della scena.

Questo è tutto! Ora, l'anteprima di questa scena avvierà un server con la scena e il numero di client richiesti, ognuno in una finestra separata, per provare il gioco in modalità multigiocatore.
