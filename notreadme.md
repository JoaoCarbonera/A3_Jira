# Plano de Testes Inicial

## Escopo Inicial
1.  Criar tarefa
2.  Editar tarefa
3.  Excluir Tarefa
4.  Designar tarefa
5.  Filtrar tarefa

## Estratégia
- **Testes Unitários**
  - Testar componentes de frontend e backend de forma isolada, verificar se modais funcionam corretamente ou não.
- **Testes de Integração**
  - Verificar comunicação entre módulos, persistência no banco de dados, comunicação entre componentes distintos.
- **Testes End-to-End**
  - Fluxo de usuário normal (login para log-off).

## Plano de Testes Manual (Caixa Preta)

| ID | Título do Caso de Teste | Pré-requisitos | Ações/Passos | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- |
| CT-001 | Criação de Tarefa | 1. O usuário deve estar autenticado (logado).<br>2. O usuário deve estar visualizando o Kanban Board de um projeto.<br>3. Deve existir, no mínimo, uma coluna no board (ex: "To Do"). | 1. Clicar no botão para "Criar uma issue".<br>2. No formulário pop-up, preencher o campo "Resumo" com o texto "Minha Primeira Tarefa".<br>3. Selecionar o status/lista "To Do" no menu suspenso.<br>4. Clicar no botão "Criar". | O modal de criação deve ser fechado. O novo card, intitulado "Minha Primeira Tarefa", deve aparecer na coluna "To Do" do Kanban Board. |
| CT-002 | Edição/Movimentação de Tarefa entre Colunas | 1. A tarefa "Minha Primeira Tarefa" deve existir na coluna "To Do".<br>2. Deve haver uma coluna de destino, por exemplo, "Done". | 1. Clicar e manter pressionado o card da tarefa "Minha Primeira Tarefa".<br>2. Arrastar o card da coluna de origem ("To Do") para a coluna de destino ("Done").<br>3. Soltar o botão do mouse. | O card da tarefa deve ser movido com sucesso e permanecer visível na coluna "Done". |
| CT-003 | Atribuição de Tarefa | 1. A tarefa "Minha Primeira Tarefa" deve estar disponível.<br>2. O projeto deve contar com pelo menos mais um membro (ex: "Membro B"). | 1. Clicar no card "Minha Primeira Tarefa" para abrir o modal de detalhes da tarefa.<br>2. Localizar o campo de seleção de responsável ("Assignee").<br>3. Clicar no dropdown e selecionar o usuário "Membro B".<br>4. Fechar o modal de detalhes. | O ícone do "Membro B" deve ser exibido no card da tarefa no Kanban Board. |
| CT-004 | Filtragem de Tarefas (Visualização Pessoal) | O sistema permite efetuar um filtro de tarefas organizando as que estão são mais antigas. | 1. Clicar na coluna superior do board nas opção de funil.<br>2. Selecionar as notas mais antigas. | O board organiza as notas em ordem crescente por data de criação. |
| CT-005 | Exclusão de Tarefa (Validação do Fluxo de Confirmação) | 1. Permitir que seja possível a exclusão de qualquer card. | 1. Clicar no card que deseja excluir.<br>2. Clicar no ícone de exclusão.<br>3. Gerar uma caixa de confirmação da ação.<br>4. Clicar no botão de confirmação "Excluir". | A mensagem na tela aparece com um som ao final informando que o card foi excluído com sucesso. |