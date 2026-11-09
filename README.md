# Sistema para Restaurante

Sistema que permite ao cliente ver o cardápio e pedir pelo celular (QR code da mesa), com confirmação do garçom, comanda na cozinha, pedido de conta e controle do dono.

Este README é para **todo mundo que mexe no repositório**. Ele explica como cada pessoa cria a sua branch e como escrever commits limpos. Leia inteiro antes de começar e volte aqui sempre que tiver dúvida.

## 1. Quem mexe em quê

O repositório tem uma pasta para cada parte. **Cada pessoa trabalha só na sua pasta.**

| Pasta | Parte | Responsável | O que tem |
|---|---|---|---|
| `banco/` | Banco de dados | Ajudante A | Estrutura, dados de exemplo, testes, backup |
| `back/` | Back-end em Django | Ajudante B | A API e as regras do sistema |
| `front/` | Front-end em HTML, CSS e JS | Ajudante C | As telas |
| `docs/` | Documentos de planejamento | Coordenador | Mapa, anexo, guias |

Mexer na pasta de outra pessoa só com aviso e combinado antes. O **Docker** não faz parte do trabalho dos ajudantes: o coordenador cuida dele na montagem final.

Cada pasta tem um `README.md` ou um `TAREFAS.md` com o que fazer nela. Os nomes de tabelas, campos, estados e rotas seguem **sempre** o documento "Mapa de Front, Back e Banco de Dados". Nada de mudar nome por conta própria.

## 2. Três palavras que você precisa conhecer

| Palavra | O que é, em uma frase |
|---|---|
| **Branch** | Uma "cópia de trabalho" separada, onde você mexe sem atrapalhar ninguém. |
| **Commit** | Uma foto do seu trabalho em um momento, com uma mensagem dizendo o que mudou. |
| **Pull Request (PR)** | O pedido para juntar a sua branch na `main`, para o coordenador revisar. |

A branch `main` é a versão boa e oficial do projeto. **Ninguém manda commit direto para a `main`.** Todo trabalho entra por Pull Request, e só o coordenador junta.

## 3. Preparação (uma vez só)

1. Instale o Git e crie sua conta no GitHub.
2. Diga ao Git quem você é, para os commits saírem com o seu nome:

```
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"
```

3. Baixe o repositório (troque pelo endereço que o coordenador passar):

```
git clone ENDERECO-DO-REPOSITORIO
cd restaurante
```

## 4. Nome das branches

Uma branch para **uma tarefa**, com o nome no formato `pasta/o-que-voce-esta-fazendo`:

| Parte | Exemplos |
|---|---|
| Banco | `banco/schema-grupo-1`, `banco/dados-de-exemplo`, `banco/testes-integridade` |
| Back | `back/modelos-accounts`, `back/login-funcionario`, `back/criar-pedido` |
| Front | `front/cliente-cardapio`, `front/garcom-chamados`, `front/arquivos-comuns` |

Regras do nome:
- Tudo em minúsculas, sem acento e sem espaço (use hífen).
- Curto e específico. Evite nomes como `teste`, `ajustes` ou `minha-branch`.
- Uma branch por tarefa e curta: se passou de 2 ou 3 dias, divida em tarefas menores.
- Use a numeração dos passos do seu documento técnico como guia de tarefa.

## 5. O fluxo do dia a dia

Esses oito passos se repetem a cada tarefa.

**1. Comece da `main` atualizada**

```
git checkout main
git pull origin main
```

**2. Crie a sua branch**

```
git checkout -b back/login-funcionario
```

**3. Trabalhe.** Faça um pedaço pequeno que funcione e vá para o passo 4. Não deixe horas de trabalho acumuladas.

**4. Veja o que mudou, antes de guardar**

```
git status
git diff
```

Confira se só aparecem arquivos da sua pasta e que você realmente mexeu.

**5. Escolha o que entra no commit**

```
git add back/accounts/models.py
git add back/accounts/TAREFAS.md
```

Prefira adicionar os arquivos pelo nome. Se for adicionar uma pasta inteira (`git add back/`), rode `git status` antes e depois para conferir o que entrou. Evite `git add .` na raiz.

**6. Confira o que vai entrar e faça o commit**

```
git diff --staged
git commit -m "feat(back): cria os modelos Restaurant e Staff"
```

**7. Envie para o GitHub**

```
git push -u origin back/login-funcionario
```

No primeiro envio use `-u`. Nos próximos, basta `git push`. **Envie pelo menos uma vez por dia**: assim o coordenador acompanha o progresso e o seu trabalho não fica só no seu computador.

**8. Abra o Pull Request** no GitHub, com a base `main` e a sua branch. Use o modelo da seção 8. Depois que o coordenador juntar:

```
git checkout main
git pull origin main
git branch -d back/login-funcionario
```

### Se a `main` mudou enquanto você trabalhava

Antes de abrir o Pull Request, traga as novidades para a sua branch:

```
git pull origin main
```

Se o Git avisar de **conflito**, **pare** e avise o coordenador. Não tente resolver apagando linhas sem entender. Como cada pessoa trabalha só na sua pasta, conflitos são raros: se apareceu um, alguém mexeu onde não devia ou um arquivo compartilhado mudou.

## 6. Boas práticas de commit

### 6.1 Formato da mensagem

```
tipo(pasta): descrição curta no imperativo
```

| Parte | Como escrever |
|---|---|
| `tipo` | `feat` (algo novo), `fix` (correção), `docs` (só texto), `refactor` (reorganizar sem mudar o resultado), `test` (testes), `chore` (tarefas de manutenção) |
| `pasta` | `banco`, `back`, `front` ou `docs` |
| descrição | Verbo no imperativo ("cria", "corrige", "adiciona"), em português, com até 72 caracteres, sem ponto final |

**Bons exemplos**

```
feat(banco): cria as tabelas do grupo 1 (restaurants e staff)
feat(back): adiciona a transição de estados do pedido
fix(front): impede o envio do pedido sem itens
docs(back): explica como rodar o servidor no README
test(back): cobre o caso de pedido repetido com a mesma chave
```

**Maus exemplos**

```
ajustes
alterei umas coisas
final
final2
funcionando agora
corrigindo
```

### 6.2 Um commit, uma ideia

- Cada commit faz **uma coisa só**. Se na mensagem você precisa usar "e" para juntar dois assuntos, são dois commits.
- Commit pequeno e frequente é melhor do que um commit gigante no fim do dia. Fica fácil de entender e de desfazer.
- Todo commit deve deixar o projeto **funcionando**. Não envie código quebrado "para terminar depois".
- Se precisar explicar o motivo, escreva uma linha em branco e um parágrafo depois da descrição (use `git commit` sem `-m` para abrir o editor).

### 6.3 O que nunca vai para o Git

| Nunca commite | Por quê |
|---|---|
| `venv/`, `.venv/` | Cada pessoa cria a sua. Pesa muito e muda de computador para computador |
| `__pycache__/`, `*.pyc` | Arquivos gerados automaticamente |
| `.env` | Tem senhas e chaves. Só o `.env.example` (com valores falsos) vai |
| `db.sqlite3` | É o banco do seu computador, não do projeto |
| `*.dump`, `*.log` | Backups e registros de execução |
| `.DS_Store`, `.idea/`, `.vscode/` | Configurações do seu computador ou editor |

O repositório tem um `.gitignore` que já bloqueia a maioria. Mesmo assim, confira o `git status` antes de cada commit.

**Se você commitou uma senha ou chave por engano:** avise o coordenador **na hora**. Apagar o arquivo em um commit novo não basta, porque ele continua no histórico. A senha precisa ser trocada.

### 6.4 Antes de cada commit, confira

- [ ] O código roda e eu testei a parte que mexi.
- [ ] Os nomes de tabelas, campos, estados e rotas estão **iguais ao Mapa**.
- [ ] Não sobraram `print`, `console.log` de teste nem código antigo comentado.
- [ ] Não há senha, chave ou endereço fixo escritos no código.
- [ ] Só aparecem arquivos da minha pasta no `git status`.
- [ ] A mensagem diz **o que** mudou e está no formato da seção 6.1.

## 7. Se algo der errado

| Situação | O que fazer |
|---|---|
| Adicionei um arquivo errado (ainda não fiz o commit) | `git restore --staged caminho/do/arquivo` |
| Errei a mensagem do último commit (ainda não enviei) | `git commit --amend -m "mensagem certa"` |
| Esqueci um arquivo no último commit (ainda não enviei) | `git add arquivo` e depois `git commit --amend --no-edit` |
| Quero descartar o que mudei em um arquivo (ainda sem commit) | `git restore caminho/do/arquivo`. **Cuidado:** isso apaga a sua mudança |
| Percebi que estou na branch errada | Pare, não faça commit e avise o coordenador. Se já fez, avise antes de mexer |
| O Git recusou o envio (`push`) | Rode `git pull origin main`, resolva ou avise, e tente de novo |
| Apareceu conflito | **Pare** e avise o coordenador |

**Regras de segurança:**
- **Nunca** use `git push --force` ou `git push -f`.
- Nunca apague branches ou commits de outras pessoas.
- Dúvida sobre um comando? Pergunte antes de rodar. Quase tudo no Git tem conserto, mas alguns comandos apagam trabalho de verdade.

## 8. Pull Request: como abrir e o que escrever

**Título:** igual ao formato do commit, por exemplo `feat(back): login de funcionário`.

**Descrição (copie e preencha):**

```
## O que foi feito
(2 ou 3 linhas)

## Passo do documento técnico
(ex.: Back, passo 5: acesso e permissões)

## Como testar
(o que abrir ou rodar, e o que deve aparecer)

## Prova de que funciona
(print, vídeo curto ou resultado dos testes)

## Checklist
- [ ] Nomes iguais ao Mapa
- [ ] Sem senhas, .env, venv ou db.sqlite3
- [ ] Só arquivos da minha pasta
- [ ] README ou TAREFAS.md atualizado, se mudou algo que outras pessoas precisam saber
```

**Depois de abrir:**
- Se o coordenador pedir mudanças, faça na **mesma branch**, com novos commits, e envie com `git push`. O Pull Request se atualiza sozinho.
- Um Pull Request deve ser **pequeno** (uma tarefa). Pull Requests gigantes demoram a ser revisados e escondem erros.

## 9. Resumo de uma página

1. Trabalhe só na sua pasta.
2. Comece sempre da `main` atualizada (`git pull origin main`).
3. Uma branch por tarefa: `pasta/o-que-esta-fazendo`.
4. Commits pequenos, com mensagens no formato `tipo(pasta): descrição`.
5. Confira `git status` e `git diff --staged` antes de cada commit.
6. Envie pelo menos uma vez por dia.
7. Abra um Pull Request pequeno, com prova de que funciona.
8. Nunca commite senhas, `.env`, `venv` ou `db.sqlite3`.
9. Conflito ou dúvida: pare e pergunte.
