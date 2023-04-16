---
description: O estado do jogo se refere às variáveis e objetos importantes do seu jogo, que quando todos reunidos permitem ver exatamente a situação atual do mundo do jogo e do jogo.
sidebar_position: 3
---

# Estado de jogo

Cada jogo tem alguma categoria de estado do jogo. O estado do jogo se refere às variáveis e objetos importantes do seu jogo, que quando todos reunidos permitem ver exatamente a situação atual do mundo do jogo e do jogo.

Em THNK, é a função do servidor para _controlar as atualizações para o estado do jogo_ e _enviar atualizações para todos os clientes_. A função do cliente é _exibir a estado do jogo_ e _enviar solicitações do jogador para alterar o estado do jogo_.

## Formas de estado do jogo

THNK cuida de sincronizar o estado do jogo do servidor para o cliente. Para isso, porém, você precisa marcar elementos da sua cena como estado de jogo para THNK. O estado do jogo tem duas formas em THNK: objetos (para o mundo do jogo) e variáveis (para o resto do estado do jogo).

### Objetos

Os objetos podem ser marcados como estado do jogo no THNK ao adicionar a ordem "Sincronização" sobre eles. Este comportamento observará as mudanças no objeto e sincronizará automaticamente com os clientes.

:::note

Apenas propriedades de objeto são sincronizadas, não propriedades de comportamento!

Às vezes, isso é bom: o comportamento pode simplesmente modificar as propriedades do objeto no servidor, e essas alterações serão sincronizadas com sucesso.

Noutros casos, isso pode causar problemas. Por exemplo, um comportamento de movimento pode mover o objeto incorretamente nos clientes entre atualizações do servidor se ele não tiver um estado interno correto. Nesse caso, terá que desativar o comportamento no cliente ou sincronizar as propriedades do comportamento por conta própria.

Você pode sincronizar as propriedades internas de um comportamento substituindo as propriedades do comportamento pelas variáveis do estado do objeto. Se você não escreveu o comportamento você mesmo, pergunte ao autor o que deve ser sincronizado e o que não deve ser!

:::

### Variável de Estado

Objetos representam o mundo dos jogos em si, como todos podem observar. Mas alguns elementos não podem ser vistos por todos, mas são dados importantes para um ou vários clientes.

Tome, por exemplo, se é ou não uma imposter em Among Us — o seu cliente vai querer saber isso, sendo crucial, o jogador sabe-o e apresenta-se com opções adequadas dependendo desse papel. Embora se trate de um importante jogo de dinheiro. quais mudanças são _as opções da apresentação_ e _do jogador_, não do mundo do jogo em si.

Na verdade, é _crucial_ para não fazer essa parte do mundo dos jogos. Como este estado do jogo é específico do jogador e nunca deve ser compartilhado com outros jogadores (isso pode permitir hackiando). O mundo dos jogos (e, o uso de objetos sincronizados) deve ser limitado a objetos que são _visíveis para todos_, como se "parte do mundo". Dados específicos do jogador pertencem a variáveis.

Outro exemplo seria um chat no jogo: As próprias mensagens de texto podem ser o estado do jogo, já que eles são compartilhados com todos e parte do que está acontecendo em seu jogo, mas não faz parte do mundo do jogo (na maioria dos casos) - a mensagem _não é uma "entidade vivendo no mundo do seu jogo"_. Um jogador pode abrir o chat de cada vez, outro jogador em outro momento: A apresentação difere de um cliente para o outro.

Portanto, é _responsabilidade do cliente mostrar mensagens, não do servidor_. Para esse efeito, precisará sincronizar mensagens como exclusivamente dados, por usar uma **variável de estado** em vez de um objeto sincronizado, e exibir os dados no cliente com objetos normais não sincronizados.
