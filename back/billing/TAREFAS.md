# Tarefas do app billing

## Responsabilidade

Cuidar da conta, da taxa de serviço, da divisão e dos pagamentos.

## Tabelas (modelos) a criar

- Bill, na tabela bills.
- Payment, na tabela payments.

## Rotas

- POST /public/bill-requests
- GET /staff/bills/{tableSessionId}
- POST /staff/bills/{id}/payments
- POST /staff/payments/{id}/reversal

## Regras principais

- A conta mostra o total com e sem taxa.
- O pagamento nunca é editado, apenas estornado.
- O pagamento não pode passar do valor restante.
- Pedido ainda não confirmado bloqueia o pagamento, com o retorno PENDING_ORDERS.
- Quando a conta é paga, a sessão fecha e a mesa passa para TO_CLEAN.

## Depende de

accounts, dining e ordering.

## Ainda em aberto

Nada registrado até o momento.
