# Tarefas do app finance

## Responsabilidade

Cuidar dos relatórios financeiros, somente leitura. Não tem tabelas próprias.

## Tabelas (modelos) a criar

Nenhuma. Este app não tem tabelas próprias.

## Rotas

- GET /admin/reports/daily
- Relatórios por semana, por mês e por ano.

## Regras principais

- Mostrar o faturamento, o total por forma de pagamento, o ticket médio e os pratos mais vendidos.
- Tudo é sempre calculado a partir dos pagamentos e dos pedidos.

## Depende de

billing, ordering e inventory.

## Ainda em aberto

O lucro exige o custo dos ingredientes, que ainda não existe no banco.
