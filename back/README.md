# Back-end do Restaurante System

## 1. O que é esta pasta

Esta é a pasta do back-end do sistema do restaurante. Ela foi criada com os comandos oficiais do Django e contém apenas a estrutura inicial do projeto e dos apps. Nenhuma regra de negócio foi escrita ainda.

## 2. Pré-requisitos

- Python 3.12 ou superior.
- Git.

## 3. Passo a passo para rodar

1. Abra um terminal.
2. Entre na pasta back.
3. Crie o ambiente virtual com o comando: python -m venv venv
4. Ative o ambiente virtual.
   - No Windows: venv\Scripts\activate
   - No Linux ou macOS: source venv/bin/activate
5. Instale as dependências com o comando: python -m pip install -r requirements.txt
6. Aplique as migrações com o comando: python manage.py migrate
7. Suba o servidor com o comando: python manage.py runserver
8. Abra o navegador no endereço http://127.0.0.1:8000/
9. Deve aparecer a página de boas-vindas do Django, com a mensagem de que a instalação funcionou. Isso é a prova de que está tudo certo.
10. Para parar o servidor, volte ao terminal e pressione Ctrl+C.

Se preferir não ativar o ambiente virtual, use o Python da venv diretamente em cada comando. No Windows, comece os comandos com venv\Scripts\python. No Linux ou macOS, comece com ./venv/bin/python.

## 4. Opcional: criar um superusuário

1. Com a venv ativada, rode o comando: python manage.py createsuperuser
2. Informe o nome de usuário, o e-mail e a senha quando o terminal pedir.
3. Suba o servidor com python manage.py runserver.
4. Abra o endereço http://127.0.0.1:8000/admin/ e entre com os dados cadastrados.

## 5. Mapa das pastas

- config: guarda as configurações do projeto, incluindo o arquivo settings.py, e o endereço principal das rotas.
- accounts: restaurante, funcionários, login e permissões. Veja accounts/TAREFAS.md.
- dining: mesas e sessões de mesa. Veja dining/TAREFAS.md.
- menu: cardápio, pratos, ingredientes e alérgenos. Veja menu/TAREFAS.md.
- ordering: pedidos, confirmação do garçom e etapas até a entrega. Veja ordering/TAREFAS.md.
- billing: conta, taxa de serviço, divisão e pagamentos. Veja billing/TAREFAS.md.
- inventory: estoque de ingredientes. Veja inventory/TAREFAS.md.
- finance: relatórios financeiros somente leitura. Veja finance/TAREFAS.md.
- notifications: avisos ao garçom e à cozinha. Veja notifications/TAREFAS.md.
- feedback: reporte de problemas. Veja feedback/TAREFAS.md.

## 6. Combinados do time

- Ninguém muda nomes de pastas, apps ou campos sem avisar o grupo.
- Cada pessoa trabalha apenas na sua pasta.
- A venv, o arquivo .env e o banco db.sqlite3 nunca vão para o Git.

## 7. Problemas comuns

- "python não encontrado": confira se o Python 3.12 ou superior está instalado e se a opção de adicionar o Python ao PATH foi marcada na instalação. No Windows, também é possível usar o comando py no lugar de python.
- "ModuleNotFoundError: django": a venv não está ativada. Ative a venv novamente e rode o comando outra vez.
- "porta 8000 em uso": use outra porta, por exemplo com o comando python manage.py runserver 8001. Depois abra o endereço com a porta nova.
- Bloqueio de scripts no PowerShell: o Windows pode impedir a ativação da venv. Rode o comando Set-ExecutionPolicy -Scope CurrentUser RemoteSigned, confirme e tente ativar de novo. Outra opção é chamar o Python da venv diretamente, sem ativar.

## 8. Próximos passos do back-end

- Trocar o SQLite pelo PostgreSQL.
- Instalar o Django REST Framework e as demais bibliotecas necessárias.
- Ler as variáveis do arquivo .env.
