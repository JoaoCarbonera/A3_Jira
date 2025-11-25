# 🚀 Task Manager - Jira

Um aplicativo web de gerenciamento de projetos e tarefas, baseado na metodologia Kanban, focado em performance e qualidade de código.

## 👥 Integrantes do Grupo

*   **Arthur Wiatrowski** 
*   **Gabriel Mancio**
*   **João Augusto**
*   **Jonathan Toledo** 

---

## 🎯 Conceito e Problema Resolvido

O aplicativo foi desenvolvido para auxiliar na **organização de tarefas do dia a dia**, garantindo que o usuário consiga **priorizar tarefas por nível de importância** e utilizar **colunas "kanban"** para visualizar o fluxo de trabalho. Além disso, o software permite que **várias pessoas trabalhem em conjunto no mesmo projeto**.

O projeto é baseado no conceito de um clone de gerenciador de projetos, com referência ao repositório `https://github.com/zayarlyn/jira-clone`.

## 📋 Escopo Inicial e Requisitos Funcionais (RFs)

As funcionalidades principais desenvolvidas incluem:

*   Criar tarefa. (RF02)
*   Editar tarefa. (RF03)
*   Excluir Tarefa. (RF04)
*   Priorizar tarefa. (RF05)
*   Designar tarefa. (RF06)
*   Filtrar tarefa. (RF07)

Outras funcionalidades incluídas no *Backlog* são: Criar projeto (RF01) e Personalizar as colunas do Kanban (RF08).

---

## 🛠️ Tecnologias e Arquitetura

O projeto adota uma arquitetura **Cliente-Servidor** (desacoplada), com o *backend* implementado como uma **API RESTful**.

### Stack Principal

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend** (View Layer) | **React** | Aplicação cliente Single Page Application (SPA). Desenvolvida primariamente em **TypeScript** (82.0% da linguagem base). |
| **Backend** (Controller Layer) | **Express** (Node.js) | Servidor responsável pela lógica de negócio e autenticação. |
| **Persistência** (Model Layer) | **MySQL** + **Prisma ORM** | Banco de dados relacional. O acesso é feito via Prisma ORM. |
| **Estilização** | **Tailwind CSS** | Utilizada para garantir que a interface seja **totalmente responsiva** (RNF-04). |

---

## 💻 Instruções de Setup e Execução

Para rodar o projeto localmente, siga os passos abaixo. O projeto é dividido em `express-backend` e `react-frontend`.

### Pré-requisitos
*   Node.js e npm/yarn.
*   Instância do MySQL rodando.
*   Configuração do Prisma ORM (para rodar migrações iniciais).

### 1. Backend Setup (`express-backend`)

```bash
# Navegue até a pasta do backend
cd express-backend
```
```bash
# Instale as dependências
npm install
```
```bash
# Configure o banco de dados e rode as migrações
npx prisma migrate de
```
```bash
# Inicie o servidor
npm run start
```

### 2. Frontend Setup (react-frontend)

```bash
# Navegue até a pasta do frontend
cd react-frontend 
```
```bash
# Instale as dependências
npm install
```
```bash
# Inicie a aplicação
npm run dev
```
O aplicativo deve estar acessível em ````http://localhost:5173/````

--------------------------------------------------------------------------------
## 🧪 Qualidade e Estratégia de Testes

A qualidade do sistema é garantida através de um planejamento que inclui testes manuais e automatizados
.
Ferramentas de Teste
Utilizamos Selenium, Java, JUnit, e Cucumber para a automação e relatórios
.
Estratégia de Testes
1. Testes Unitários: Focados em isolar componentes do frontend e backend, verificando se modais e lógicas funcionam corretamente
.
    * Exemplos: Testes unitários de Login e Registro foram implementados (CT-01 a CT-05), incluindo verificação de sucesso de registro/login e tratamento de erros (e-mail existente, senha incorreta, usuário inexistente)
.
2. Testes de Integração: Visam verificar a comunicação entre módulos, a persistência no banco de dados, e a comunicação entre componentes distintos
.
3. Testes End-to-End (E2E): Focam no fluxo normal do usuário, desde o login até o log-off
.

## Evidências de Qualidade
  * Testes Automatizados: O repositório contém 10 casos de testes unitários executados (e.g., Auth Controller)
.
  * Branch de Testes: A evidência do uso do Git (commits, branches, Pull Requests) está centralizada na branch testes
.
  * Relatórios de Testes: Relatórios de testes unitários (JUnit) e relatórios de E2E (Allure Report) foram gerados
.

# Links de Relatorios de Metricas Gerados:

<img width="1921" height="1080" alt="jest_html_reporters" src="https://github.com/user-attachments/assets/9cdc44df-bd10-46d3-a342-e7994ffb557e" />

https://drive.google.com/file/d/1ZYyQHsopfvxLgCmzA_vlwfDGV_1XG5tD/view?usp=drive_link

### Plano de Testes Manual (Caixa Preta)

A tabela a seguir consolida os casos de teste planejados para validar as principais funcionalidades do Kanban Board [1, 2, 4, 5].

| ID | Título do Caso de Teste | Pré-requisitos | Ações/Passos | Resultado Esperado |
| :---: | :--- | :--- | :--- | :--- |
| **CT-001** | **Criação de Tarefa** | 1. O usuário deve estar autenticado (logado) . 2. O usuário deve estar visualizando o Kanban Board . 3. Deve existir, no mínimo, uma coluna no board (ex: "To Do") . | 1. Clicar no botão para "Criar uma issue" . 2. No formulário pop-up, preencher o campo "Resumo" com o texto "Minha Primeira Tarefa" . 3. Selecionar o status/lista "To Do" . 4. Clicar no botão "Criar" . | O modal de criação deve ser fechado. O novo card, intitulado "Minha Primeira Tarefa", deve aparecer na coluna "To Do" do Kanban Board  |
| **CT-002** | **Edição/Movimentação de Tarefa entre Colunas** | 1. A tarefa "Minha Primeira Tarefa" deve existir na coluna "To Do"  2. Deve haver uma coluna de destino, por exemplo, "Done"  | 1. Clicar e manter pressionado o card da tarefa "Minha Primeira Tarefa"  2. Arrastar o card da coluna de origem ("To Do") para a coluna de destino ("Done")  3. Soltar o botão do mouse  | O card da tarefa deve ser movido com sucesso e permanecer visível na coluna "Done"  |
| **CT-003** | **Atribuição de Responsável à Tarefa** | 1. A tarefa "Minha Primeira Tarefa" deve estar disponível . 2. O projeto deve contar com pelo menos mais um membro (ex: "Membro B") . | 1. Clicar no card "Minha Primeira Tarefa" para abrir o modal de detalhes . 2. Localizar o campo de seleção de responsável ("Assignee") . 3. Clicar no dropdown e selecionar o usuário "Membro B" . 4. Fechar o modal de detalhes . | O ícone/avatar do "Membro B" deve ser exibido no card da tarefa no Kanban Board  |
| **CT-004** | **Filtragem de Tarefas (Visualização Pessoal)** | O sistema permite efetuar um filtro de tarefas organizando as que estão são mais antigas . | 1. Clicar na opção de funil/filtro na barra superior do board . 2. Selecionar as notas mais antigas . | O board organiza as notas em ordem crescente por data de criação . |
| **CT-005** | **Exclusão de Tarefa (Validação do Fluxo de Confirmação)** | 1. Permitir que seja possível a exclusão de qualquer card . | 1. Clicar no card que deseja excluir  2. Clicar no ícone de exclusão  3. Gerar uma caixa de confirmação da ação . 4. Clicar no botão de confirmação "Excluir"  | Uma mensagem de sucesso deve ser exibida, confirmando a exclusão do card . A mensagem na tela aparece com um som ao final . |

--------------------------------------------------------------------------------
