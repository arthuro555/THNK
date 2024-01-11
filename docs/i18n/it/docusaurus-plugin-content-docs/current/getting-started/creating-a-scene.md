---
sidebar_position: 2
description: In questa seconda parte del tutorial avviato, diamo un'occhiata su come creare una scena GDevelop con THNK.
keywords:
  - per iniziare
  - scena
  - setup
  - crea
  - regole
  - THNK
  - p2p
  - multigiocatore
  - GDevelop
---

# Creazione di una scena THNK

THNK non chiede molti requisiti per creare una scena su cui può lavorare; Tutto quello che devi fare è separare il codice client dal codice del server.

:::tip Ricorda!

**Codice client** è la parte che i giocatori usano per interagire con il gioco. Qualsiasi elemento di presentazione, come la camera, oggetti & layer effetti, le animazioni degli sprite, la musica o le interazioni con il gioco, come gli input, i menu, le HUD...

**Il codice server** è la parte che definisce la logica e lo stato del tuo gioco, che un hacker dovrebbe non essere in grado di manomettere. Cose come la posizione degli oggetti & e il movimento, gli stati dei diversi oggetti, le collisioni, statistiche giocatori, i calcoli dei danni da combattimento...

:::

La scena THNK più semplice e valida è simile a questa:

![Una scena semplice con le condizioni "Avvia codice server" e "Avvia codice client" in eventi separati](img/base-THNK-events.png)

:::tip Ricorda!

Ogni scena THNK deve rispettare tre regole:

1. Il codice deve trovarsi in una condizione client o server. Gruppo e commenti vanno bene, ma gli eventi reali non possono esserlo
2. Può esserci solo 1 condizione di codice server e 1 di client. Usa i sottoeventi invece di ripetere la condizione.
3. Il codice client deve sempre precedere il codice server.

Anche se non interromperà immediatamente il tuo gioco, non rispettare queste regole, può portare a comportamenti inaspettati e bug che saranno difficili da diagnosticare e correggere.

![Il genio di THNK ti avverte sul rispetto delle tre regole. Se non li rispetti, te ne pentirai... beh, non dire che non ti aveva avvertito.](img/Genie-warning.png "NON FIDARTI DEL GENIO")

:::

Basta lezioni, iniziamo a creare!
