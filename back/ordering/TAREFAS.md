# Tarefas do app ordering

## Responsabilidade

Cuidar do pedido, da dupla confirmação do garçom e das etapas até a entrega. A comanda é o pedido visto pela cozinha e não tem tabela própria.

## Tabelas (modelos) a criar

- Order, na tabela orders.
- OrderItem.
- OrderItemRemovedIngredient.

## Rotas

- POST /public/orders
- GET /public/orders/{id}
- /staff/orders (claim, confirm, cancel, start-preparing, mark-ready, mark-delivered)
- GET /staff/kitchen/orders

## Regras principais

- Os estados são PLACED, CLAIMED_BY_WAITER, SENT_TO_KITCHEN, PREPARING, READY, DELIVERED e CANCELLED.
- Só as transições do diagrama são permitidas. As outras dão ORDER_INVALID_STATUS.
- Só quem assumiu o pedido pode confirmá-lo.
- Quando o pedido tem alergia, a verificação é obrigatória.
- Pedido repetido, com a mesma Idempotency-Key, não pode duplicar.
- Se dois garçons assumirem o pedido ao mesmo tempo, apenas o primeiro vence.
- O item copia do prato o nome, o preço e os alérgenos.

## Depende de

accounts, dining e menu.

## Ainda em aberto

Nada registrado até o momento.
