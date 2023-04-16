---
description: Saiba o que são adaptadores e como eles podem-lhe ajudar!
sidebar_position: 2
---

# Adaptadores

THNK por si só não se importa com a rede sozinho, apenas com o multiplayer. Ironicamente, porém, a extensão "core" THNK, portanto, só permite que jogue o seu jogo num só jogador. Se quiser jogá-lo em multiplayer, terá que conectar um _adaptador_ no THNK.

Um adaptador diz a THNK como se comunicar com servidores ou clientes de uma forma específica. Pode teoricamente construir o seu próprio através de JavaScript, mas THNK fornece algumas extensões oficiais de adaptador que devem cobrir todas as suas necessidades.

## Adaptador P2P

:::warning

P2P não é para MMOs! Ele mostra o endereço IP de cada um, e isso é _por design_. Deve sempre ver o P2P como uma espécie de _super LAN_ que às vezes também funciona através da internet — Pode usá-lo para se conectar a um amigo confiável e jogar com eles, mas nunca deve __ usá-lo para se conectar a muitos estranhos.

:::

O adaptador P2P simplesmente permite que um jogo THNK seja hospedado na conexão P2P e se conecte a servidores usando o seu ID P2P.

Para usá-lo, precisa primeiro conectar o seu jogo a um servidor de corretores. Cabe a você usar o padrão ou um customizado — o THNK também funciona. Então, pode usar as ações para hospedar um servidor. Ao hospedar o servidor, dê uma maneira de copiar o seu ID P2P, por exemplo, com o objeto de entrada de texto. Finalmente, pode usar a ação de conexão para conectar como um cliente a um servidor P2P usando o ID do servidor.

## Adaptador Geckos.io

Geckos.io é uma solução de rede que permite estabelecer conexões diretas entre um servidor e um cliente. Essas conexões são conexões UDP rápidas e seguras, perfeitos para todos os tipos de jogos. Ele é apoiado pela mesma tecnologia que o P2P: WebRTC.

Esse adaptador é ideal para arquiteturas onde você se conecta ao "O Servidor™" (por exemplo, O modo multiplayer de Minecraft) e não é diretamente um amigo para jogar (por exemplo, entre nós no modo multiplayer).

## Adaptadores Planejados

Aqui está a lista de adaptadores planejados para o futuro:

- Multiplayer splitscreen
- Nuvem THNK

Não hesite em [enviar outras sugestões](https://github.com/arthuro555/THNK/issues/new)!
