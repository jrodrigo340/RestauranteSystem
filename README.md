# Sistema para Restaurante

Sistema web de restaurante: o cliente vê o cardápio, e o restaurante cadastra os pratos.
Por enquanto, o projeto é só o **front-end** (as telas), feito em HTML.

Este guia é para **quem vai mexer no projeto**. Siga os passos na ordem. Se tiver dúvida, pergunte antes de rodar o comando.

## 1. Onde mexer

Todo o trabalho fica dentro da pasta **`template/`**.

```
repositorio/
├── README.md      ← este guia (não mexa)
└── template/      ← aqui ficam as páginas do site
```

## 2. Cinco palavras para conhecer

| Palavra | O que é |
|---|---|
| **Repositório** | A pasta do projeto, guardada no GitHub. |
| **Branch** | Uma cópia de trabalho só sua. Você mexe nela sem estragar o projeto. |
| **Commit** | Uma "foto" do seu trabalho, com uma mensagem dizendo o que mudou. |
| **Push** | Enviar os seus commits do computador para o GitHub. |
| **Pull Request** | O pedido para juntar a sua branch ao projeto principal. |

A branch **`main`** é a versão oficial. **Ninguém trabalha direto nela.**

## 3. Preparação (faça só uma vez)

1. Instale o **Git** e crie uma conta no **GitHub**.
2. Diga ao Git quem você é (troque pelo seu nome e e-mail):

```
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"
```

3. Baixe o projeto para o seu computador (troque pelo endereço do repositório):

```
git clone ENDERECO-DO-REPOSITORIO
cd NOME-DA-PASTA
```

## 4. Passo a passo de cada tarefa

Repita estes passos sempre que for fazer algo novo.

**Passo 1: atualize a `main`**

```
git checkout main
git pull origin main
```

**Passo 2: crie a sua branch.** Use um nome curto, em minúsculas, sem acento e com hífen.

```
git checkout -b front-cardapio
```

**Passo 3: trabalhe.** Faça uma parte pequena e vá para o passo 4. Não acumule horas de trabalho.

**Passo 4: veja o que mudou**

```
git status
```

Confira se só aparecem os arquivos que você mexeu.

**Passo 5: escolha o que vai no commit.** Escreva o nome do arquivo.

```
git add template/index.html
```

**Passo 6: faça o commit**

```
git commit -m "feat: cria a página do cardápio"
```

**Passo 7: envie para o GitHub.** Antes, traga as novidades da `main`:

```
git pull origin main
git push -u origin front-cardapio
```

O `-u` só é necessário na primeira vez. Depois, basta `git push`.

**Passo 8: abra o Pull Request.** No GitHub, clique em **Compare & pull request**, escolha a base `main` e preencha:

```
## O que foi feito
(1 ou 2 linhas)

## Como testar
(o que abrir e o que deve aparecer)
```

Depois que o seu pedido for aceito, limpe e comece de novo:

```
git checkout main
git pull origin main
git branch -d front-cardapio
```

## 5. Como escrever a mensagem do commit

Formato: `tipo: o que você fez`

| Tipo | Quando usar |
|---|---|
| `feat` | Algo novo (uma página, um campo) |
| `fix` | Corrigir um erro |
| `docs` | Mexer só em texto ou comentários |

**Bons exemplos**

```
feat: cria a página sobre
fix: corrige o link do menu
docs: atualiza o README
```

**Maus exemplos**

```
ajustes
final
final2
```

Regras rápidas:
- Escreva em português, começando com um verbo (cria, corrige, adiciona).
- **Um commit, uma ideia.** Se precisou usar "e" na mensagem, faça dois commits.
- Todo commit deve deixar o site funcionando.

## 6. O que nunca vai para o GitHub

- Senhas e arquivos `.env`
- Pastas do seu editor (`.vscode/`, `.idea/`)
- Arquivos do sistema (`.DS_Store`)

Se você enviou uma senha por engano, **avise o coordenador na hora**. Apagar o arquivo depois não basta, porque ele fica no histórico.

## 7. Se algo der errado

| Situação | O que fazer |
|---|---|
| Adicionei um arquivo errado (ainda sem commit) | `git restore --staged caminho/do/arquivo` |
| Errei a mensagem do último commit (ainda sem push) | `git commit --amend -m "mensagem certa"` |
| O Git recusou o push | Rode `git pull origin main` e tente de novo |
| Apareceu **conflito** | **Pare** e avise o coordenador |
| Estou na branch errada | Pare e avise o coordenador |

**Nunca** use `git push --force` e nunca apague o trabalho de outra pessoa.

## 8. Resumo

1. Trabalhe só dentro de `template/`.
2. Comece sempre da `main` atualizada.
3. Uma branch para cada tarefa.
4. Commits pequenos, com mensagem `tipo: descrição`.
5. Confira o `git status` antes de cada commit.
6. Dê `git pull` antes do `git push`.
7. Abra um Pull Request pequeno e explique como testar.
8. Deu conflito ou dúvida? Pare e pergunte.
