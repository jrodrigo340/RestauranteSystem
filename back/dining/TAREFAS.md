# Tarefas do app dining

## Responsabilidade

Cuidar das mesas e das sessões de mesa, que é o período em que a mesa fica ocupada.

## Tabelas (modelos) a criar

- DiningTable, na tabela dining_tables.
- TableSession, na tabela table_sessions.

## Rotas

- /staff/tables (listar, abrir e liberar)
- /admin/tables
- /admin/tables/{id}/qr

## Regras principais

- Só pode existir uma sessão aberta por mesa.
- Os estados da mesa são FREE, OCCUPIED, BILL_REQUESTED e TO_CLEAN.
- O QR leva um código assinado que não pode ser alterado.

## Depende de

accounts.

## Ainda em aberto

Nada registrado até o momento.
