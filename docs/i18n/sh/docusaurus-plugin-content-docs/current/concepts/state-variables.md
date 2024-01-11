---
description: Stanje Varijable su jedno od glavnih aspekta THNK. Stanje Varijable je idiomatski način slanja podataka client-ima u THNK-u i važna je za savladavanje za kreiranje igre.
sidebar_position: 4
---

# Stanje Varijable

Stanje Varijable su jedno od glavnih aspekta THNK. Stanje Varijable je idiomatski način slanja podataka client-ima u THNK-u i važna je za savladavanje za kreiranje igre.

## Vrste Stanja Varijable

Trenutno postoje 2 vrste Stanja Varijable: javno stanje i stanje igrača.

### Javno stanje

Javno stanje je jednostavno Stanje Varijable podeljeno sa svim client-ima: namenjen je _javnim podacima_. Javno stanje varijable je nazvano `State` i na serveru i na client-u.

### Stanje igrača

Stanje Igrača je sinhronizovan sa jednim igračom: namenjen je za _privatne podatke specifične za igrača_.

Na client-ima, vaše sopstveno Stanje Igrača može se pristupiti direktno preko varijable `PlayerState`.

Na serveru, igračevo Stanje Varijable može da se dobije kao child `PlayerState` nazvano po igračevo. ID-u: na primer, ako igrač ima ID `a`, onda možete da dobijete njihovo Stanje Varijable igrača kao `PlayerState.a`. Obično ćete želeti da koristite `PlayerState[THNK::PickedPlayer()]` da dobijete trenutno igračevo Stanje Varijable.

:::caution

Ovo je podložno ozbiljnim promenama, `PlayerState` može u budućnosti postati jednostavno izabrano Stanje Varijable igrača.

:::

## Upotreba stanja varijable

Korišćenje Stanje Varijable je jednostavno: Stanje Varijable je jednostavno specijalna vrsta **Strukturne Varijable**. Možete jednostavno koristiti bilo koju child varijablu kao normalnu GDevelop varijablu i ona će biti automatski sinhronizovana na strani client-a.

Na primer, moguće je napraviti chat sistem dodavanjem stringova u niz varijable `State.Messages`, a onda na strani client-a, čitanjem ove varijable i prikazivanjem svih poruka u ovom nizu.
