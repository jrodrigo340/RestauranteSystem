# Tarefas do banco de dados

Este arquivo descreve, em texto, o que o banco do sistema precisa ter. Ele segue o documento técnico do banco e será detalhado conforme o projeto avançar.

## Visão geral

- Cada restaurante é isolado dos demais. Toda tabela de movimento precisa apontar para um restaurante.
- No desenvolvimento usamos SQLite, que já vem com o Django. Em produção, a troca para PostgreSQL está prevista.
- Os nomes das tabelas e dos campos seguem o contrato JSON usado pelo front-end.
- Todas as datas e horas são gravadas em UTC.
- Valores em dinheiro são guardados em centavos, para evitar erro de arredondamento.

## Tabelas necessárias

### accounts

- restaurants: dados do restaurante, com um identificador curto e único usado no login (restaurantSlug).
- staff: funcionários do restaurante, com e-mail, senha e perfil. O e-mail é único apenas dentro de cada restaurante.
- Perfis previstos: WAITER (garçom), KITCHEN (cozinha) e OWNER (dono).

### dining

- dining_tables: mesas do restaurante, com número ou nome e estado.
- table_sessions: períodos em que uma mesa ficou ocupada. Só pode haver uma sessão aberta por mesa.
- Estados da mesa: FREE, OCCUPIED, BILL_REQUESTED e TO_CLEAN.
- O QR code da mesa precisa guardar um código assinado, que não possa ser alterado.

### menu

- allergens: alérgenos cadastrados.
- ingredients: ingredientes, com nível de estoque e mínimo.
- ingredient_allergens: ligação entre ingrediente e alérgeno.
- dishes: pratos do cardápio, com preço e disponibilidade.
- dish_ingredients: ligação entre prato e ingrediente. A permissão "pode ser retirado" fica aqui, e não no ingrediente.
- Ainda em aberto: indicar por ingrediente se ele pode ser trocado ou apenas retirado.

### ordering

- orders: pedido, com estado, mesa, sessão, garçom que assumiu e chave de idempotência.
- order_items: itens do pedido, copiando do prato o nome, o preço e os alérgenos.
- order_item_removed_ingredients: ingredientes retirados de cada item.
- Estados do pedido: PLACED, CLAIMED_BY_WAITER, SENT_TO_KITCHEN, PREPARING, READY, DELIVERED e CANCELLED.
- A chave de idempotência evita pedido duplicado quando a mesma requisição é repetida.

### billing

- bills: conta de uma sessão de mesa, com total sem taxa e total com taxa.
- payments: pagamentos da conta. Um pagamento nunca é editado, apenas estornado.
- Quando a conta é paga, a sessão fecha e a mesa passa para TO_CLEAN.

### inventory

- stock_movements: entradas e saídas de estoque, com histórico imutável.
- O estoque nunca pode ficar negativo.
- É preciso sinalizar ingrediente abaixo do mínimo.
- Ainda em aberto: definir o que é "perto de acabar", entre o normal e o abaixo do mínimo.

### feedback

- issue_reports: problemas reportados por cliente, funcionário ou dono.

### finance

- Não tem tabelas próprias. Os relatórios são calculados a partir de payments e orders.
- Ainda em aberto: o lucro exige o custo dos ingredientes, que ainda não existe no banco.

### notifications

- Na versão 1 não tem tabela. Os painéis consultam as listas a cada 4 ou 5 segundos.

## Regras gerais que o banco precisa garantir

- E-mail de funcionário único dentro do mesmo restaurante.
- Apenas uma sessão aberta por mesa.
- Apenas uma conta por sessão de mesa.
- Chave de idempotência única por pedido.
- Histórico de estoque e pagamentos sem edição depois de criados; correções são feitas por novos registros de estorno ou movimento.
- Consultas sempre filtradas pelo restaurante, nunca por um valor enviado no corpo da chamada.
