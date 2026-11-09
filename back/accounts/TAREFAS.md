# Tarefas do app accounts

## Responsabilidade

Cuidar do restaurante e dos funcionários, do login de funcionário e das permissões por perfil.

## Tabelas (modelos) a criar

- Restaurant, na tabela restaurants.
- Staff, na tabela staff.

O Staff não usa o usuário padrão do Django, porque o e-mail é único apenas dentro de cada restaurante.

Perfis de funcionário: WAITER (garçom), KITCHEN (cozinha) e OWNER (dono).

## Rotas

- POST /staff/auth/login
- /admin/staff
- /admin/restaurant/settings

## Regras principais

- O login é feito com restaurantSlug, e-mail e senha, e devolve um token.
- Toda consulta do sistema filtra pelo restaurante que vem do token, nunca do corpo da chamada.

## Depende de

Nenhum app.

## Ainda em aberto

Nada registrado até o momento.
