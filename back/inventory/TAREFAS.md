# Tarefas do app inventory

## Responsabilidade

Cuidar do estoque de ingredientes.

## Tabelas (modelos) a criar

- StockMovement, na tabela stock_movements, sempre com histórico imutável.

## Rotas

- POST /admin/stock-movements
- Lista de ingredientes com o nível de estoque.

## Regras principais

- Ao confirmar o pedido, baixar os ingredientes, exceto os que foram retirados.
- O estoque nunca fica negativo.
- Sinalizar o ingrediente que está abaixo do mínimo.

## Depende de

menu e ordering.

## Ainda em aberto

Definir o que é "perto de acabar", ou seja, a sinalização entre o normal e o abaixo do mínimo.
