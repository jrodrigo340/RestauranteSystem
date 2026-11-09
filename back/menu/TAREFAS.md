# Tarefas do app menu

## Responsabilidade

Cuidar do cardápio, dos pratos, dos ingredientes e dos alérgenos.

## Tabelas (modelos) a criar

- Allergen.
- Ingredient.
- IngredientAllergen.
- Dish.
- DishIngredient.

A permissão "pode ser retirado" fica em DishIngredient, e não no ingrediente.

## Rotas

- GET /public/menu
- /admin/dishes
- /admin/ingredients
- PATCH /staff/dishes/{id}/availability

## Regras principais

- Prato esgotado não pode ser pedido.
- Prato com ingrediente zerado fica indisponível.

## Depende de

accounts.

## Ainda em aberto

Indicar por ingrediente se ele pode ser trocado ou apenas retirado. Este é um escopo novo e ainda não existe campo no documento do banco para isso.
