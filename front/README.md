# Front-end do Restaurante System

## 1. O que é esta pasta

Esta é a pasta do front-end do sistema do restaurante. Ela é separada do back-end e contém apenas a estrutura inicial, com uma página simples de teste e arquivos de orientação.

## 2. Pré-requisitos

- VS Code instalado.
- Extensão Live Server instalada no VS Code.

## 3. Passo a passo para ver

1. Abra a pasta front no VS Code.
2. No painel de arquivos, clique com o botão direito no arquivo index.html.
3. Escolha a opção "Open with Live Server".
4. O navegador deve abrir mostrando o título "Front-end funcionando".
5. Para parar, feche a aba do navegador ou pare o Live Server no VS Code.

## 4. Mapa das pastas

- cliente: telas usadas pelo cliente, abertas pelo QR code da mesa. Veja cliente/TAREFAS.md.
- garcom: telas de login, mapa de mesas, pedidos, avisos e contas. Veja garcom/TAREFAS.md.
- cozinha: painel de comandas e disponibilidade dos pratos. Veja cozinha/TAREFAS.md.
- dono: telas de administração do restaurante. Veja dono/TAREFAS.md.
- comum: arquivos compartilhados, incluindo o config.js com o endereço do back. Veja comum/TAREFAS.md.
- mock: dados de mentira usados enquanto o back não está pronto. Veja mock/TAREFAS.md.

## 5. Como o front se liga ao back

- O front e o back são projetos separados. O front roda em http://127.0.0.1:5500 e o back roda em http://127.0.0.1:8000.
- O endereço do back ficará em um único arquivo de configuração, o comum/config.js, que ainda precisa ser criado.
- Enquanto o back não estiver pronto, o front usa dados de mentira, que ficam na pasta mock.
- Para a integração real, o back precisará liberar o endereço do front (CORS). Isso fica registrado como pendência e ainda não foi feito.

## 6. Combinados do time

- Os nomes dos campos no front devem ser iguais aos do contrato JSON.
- Nenhum cálculo de valor deve ser feito na tela. Os valores chegam prontos do back.

## 7. Problemas comuns

- O Live Server não aparece: confira se a extensão Live Server está instalada e se a pasta front foi aberta no VS Code.
- A página abre em branco: confira se o arquivo index.html está na raiz da pasta front e se o endereço aberto é o do Live Server.
- O navegador mostra o arquivo em vez de abrir pelo servidor: você abriu o arquivo direto do disco. Use a opção "Open with Live Server" para abrir pelo endereço http://127.0.0.1:5500.
