---
description: Variáveis de estado são um dos aspetos principais do THNK. Uma variável de estado é a maneira idiomática de enviar dados para clientes em THNK e importante dominar a criação de um jogo.
sidebar_position: 4
---

# Variável de Estado

Variáveis de estado são um dos aspetos principais do THNK. Uma variável de estado é a maneira idiomática de enviar dados para clientes em THNK e importante dominar a criação de um jogo.

## Tipos de variáveis de estado

Existem atualmente 2 tipos de variáveis de estado: estado público e estado do jogador.

### Estado Público

Estado público é simplesmente variáveis de estado compartilhadas com todos os clientes: destina-se a _dados públicos_. A variável pública de estado é chamada `Estado` em ambos servidores e cliente.

### Estado do Jogador

O estado do jogador é sincronizado com um único reprodutor: é destinado a _dados privados específicos do jogador_.

Nos clientes, seu próprio estado do jogador pode ser acessado diretamente através da variável `PlayerState`.

No servidor. uma variável de estado de um jogador pode ser obtida como uma criança de `PlayerState` com o nome após o ID do jogador: exemplo, Se um jogador tiver identificação `um`, então você poderá obter sua variável de estado do jogador como `PlayerState.a`. Normalmente vai querer usar `PlayerState[THNK::PickedPlayer()]` para obter a variável de estado atual do jogador.

:::caution

Isso está sujeito a quebras de mudança, `PlayerState` pode se tornar simplesmente a variável de estado do jogador atualmente escolhido no futuro.

:::

## Utilização das variáveis de estado

Usar uma variável de estado é simples: uma variável de estado é simplesmente um tipo especial de **variável de estrutura**. Pode simplesmente usar qualquer variável filho dela como uma variável normal de GDevelop, e ela será automaticamente sincronizada no lado do cliente.

Por exemplo, um poderia criar um sistema de chat anexando strings à variável `State.Messages`, então no lado do cliente, ler esta variável e exibir todas as mensagens nesse array.
