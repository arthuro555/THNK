---
description: Stanje igre referira na glavne objekte i varijable vaše igre, koji zajedno spojeni omogućavaju da tačno vidite trenutno stanje igre i svijet igre.
sidebar_position: 3
---

# Stanje igre

Svaka igra ima neku vrstu stanje igre. Stanje igre referira na glavne objekte i varijable vaše igre, koji zajedno spojeni omogućavaju da točno vidite trenutno stanje igre i svijet igre.

U THNK, uloga servera je da _kontrolište ažuriranja stanja igre_ i _da šalje ažuriranja svim client-ima_. Uloga client-a je da _prikaže stanje igre_ i _da pošalje igračev zahtev da se stanje igre promeni_.

## Vrste stanja igre

THNK sinhronizuje stanje igre od servera do client-a. Za to, morate označiti elemente vaše scene kao stanje igre za THNK. Stanje igre uzima dve forme u THNK: objekte (za svet igre) i varijable (za ostatak stanja igre).

### Objekti

Objekti se mogu označiti kao stanje igre u THNK tako što će te im dodati "Synchronize" behavior. Ovaj behavior će gledati za promene na objektu i automatski ih sinhronizovati na client-ima.

:::note

Samo properties objekta su sinhronizovane, ne behavior properties!

Ponekad, to je u redu: behavior možda jednostavno modifikuje properties objekta na serveru, i te promene će biti uspešno sinhronizovane.

U ostalim slučajevima, ovo može izazvati probleme. Na primer, behavior pomeranja može pogrešno da pomeri objekat na client-ima između ažuriranja sa serverom ako nema ispravno unutrašnje stanje. U ovom slučaju, moraćete da isključite behavior na ovom client-u, ili da sinhronizujete behavior properties sami.

Možete sami da sinhronizujete interna svojstva behavior-a tako što ćete zameniti svojstva ponašanja stanja varijable objekta. Ako niste sami napisali behavior, pitajte autora za savet šta treba sinhronizovati, a šta ne treba!

:::

### Stanje Varijable

Objekti predstavljaju svet igre po sebi, kako ga svako može posmatrati. Ali neki elementi nisu za sve da vide, ali ipak je važan podatak za jednog ili više client-a.

Uzmite za primer kad jeste ili niste impostor u Among Us-u - vaš client će želeti to da zna, jer je od presudne važnosti da igrač to zna i da mu se u zavisnosti od ove uloge odgovarajuće opcije prikazuju. Čak i ako je ovo važno stanje igre, šta se menja je _prezentacija_ i _opcije igrača_, ne svet igre sam po sebi.

U stvari, _ključno_ je ne činiti ovaj deo sveta igre, pošto je ovo stanje igre specifično za igrača i nikada ne bi trebalo da se deli sa drugim igračima (ovo bi moglo da dozvoli varanje). Svet igre (a i korišćenje sinhronizovanih objekata) treba da bude ograničen na objekte koji su samo _vidljivi svima_, kao da su "deo sveta". Podaci specifični za igrača trebaju da budu u varijabli.

Drugi primer bi bio chat u igri: same tekstualne poruke mogu biti u stanju igre, pošto se dele sa svima i deo onoga što se dešava u vašoj igri, ali nisu deo sveta igre (u većini slučajeva) - poruka _nije "entitet koji živi u vašem svetu igre"_. Možda će jedan igrač otvoriti chat, a drugi će sledeći out kad bude hteo: Prezentacija se razlikuje od client-a do client-a.

Stoga je _odgovornost client-a prikazivanje poruka, a ne serverova_. U tom smislu, moraćete da sinhronizujete poruke isključivo kao podatke, korišćenjem **Stanje Varijable** umesto sinhronizovanog objekta, i prikazujete podatke na client-u sa normalnim nesinhronizovanim objektima.
