---
description: Naučite šta su adapteri i kako vam mogu pomoći!
sidebar_position: 2
---

# Adapteri

THNK sam po sebi nije odgovoran za umrežavanje, već samo o multiplayer-u. Ironično, međutim, THNK core extension vam omogućava da igrate svoju igru samo u single-player. Ako želite da je igrate u multiplayer-u, moraćete da uključite _adapter_ u THNK.

Adapter govori THNK-u kako da komunicira sa serverima ili client-ima na specifičan način. Vi teoretički možete izgraditi vaš svoj pomoću JavaScript-a, ali THNK vam nudi nekoliko zvaničnih extension adaptera koji bi trebali da pokriju sve vaše potrebe.

## P2P Adapter

:::warning

P2P nije namenjen za MMO! Popušta nečiju IP adresu, i to je _po dizajnu_. Trebate uvek da P2P videte kao neku vrstu _super LAN-a_ koji ponekad može da radi preko interneta - Možete da ga koristite da povežete prijatelja kome verujete i igrate sa njim, ali _nikada_ nemojte da koristite P2P za povezivanje mnogo stranaca.

:::

P2P adapter jednostavno dozvoljava THNK igrici da bude hostovana na vašoj P2P konekciju, i da se poveže na servere pomoću P2P ID.

Da ga koristite, morate prvo povezati vašu igru sa broker serverom. To je do vas da li želite da koristite podrazumevan ili prilagođeni - THNK radi sa bilo kojim. Onda, možete koristiti actions da hostujete server. Kada hostujete server, dajte način da kopirate vaš P2P ID, na primer pomoću text input object. Konačno, možete koristiti connection action da povežete se kao client na P2P server koristeći serverov ID.

## Geckos.io Adapter

Geckos.io je mrežna rešenje koje omogućava uspostavljanje direktnih veza između servera i klijenta. Ove veze su brze i bezbedne UDP veze, perfektne za sve vrste igrica. Podržava ga ista tehnologija kao i P2P: WebRTC.

Ovaj adapter je idealan za arhitekture gde se povezujete na "Server™" (na primer kao Minecraft multiplayer) a ne direktno da igrate sa prijateljima (na primer kao Among Us multiplayer).

## Planirani Adapteri

Evo lista adaptera koja je planirana za budućnost:

- Split screen multiplayer
- THNK Cloud

Ne oklevajte da [preporučite vaše predloge](https://github.com/arthuro555/THNK/issues/new)!
