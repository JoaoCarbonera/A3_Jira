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
| CT-