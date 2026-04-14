# 🚀 Workflow Engine (TypeScript)

Uma workflow engine desenvolvida em TypeScript com foco em arquitetura limpa, domínio bem definido e processamento orientado a eventos.

---

## 🧠 Sobre o projeto

Este projeto implementa um motor de execução de workflows capaz de modelar, executar e controlar fluxos de processos com estados, transições e histórico auditável.

A solução foi construída seguindo princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, garantindo separação de responsabilidades, baixo acoplamento e alta testabilidade.

O sistema permite a criação de workflows, execução de instâncias, controle de estado, validação de transições e emissão de eventos de domínio.

---

## ⚙️ O que é uma Workflow Engine?

Uma workflow engine é um sistema responsável por gerenciar processos estruturados, definindo:

- etapas (steps)
- transições entre etapas
- regras de execução
- estados do processo

Exemplo de fluxo:

draft → review → approved  
                ↘ rejected

---

## 🏗️ Arquitetura

O projeto segue os princípios de Clean Architecture:

src  
├── domain        # Regras de negócio puras  
├── app           # Casos de uso (application layer)  
├── infra         # Implementações (event bus, repository)  
└── main          # Entrada da aplicação (composition root)  

---

## 🧩 Principais conceitos implementados

### 🔹 Domain Layer
- Entidades (`Workflow`, `WorkflowInstance`)
- Erros de domínio (`DomainError`)
- Serviços (`WorkflowValidator`)
- Tipos (`WorkflowHistoryEntry`)

---

### 🔹 Application Layer
- `CreateWorkflowUseCase`
- `AdvanceWorkflowInstanceUseCase`

Responsável por orquestrar regras de negócio sem depender de infraestrutura.

---

### 🔹 Infrastructure Layer
- `InMemoryWorkflowInstanceRepository`
- `InMemoryEventBus`
- Event Handlers

---

## 🔁 Execução do Workflow

O sistema separa:

### 👉 Workflow (definição)
Define o fluxo:

draft → review → approved / rejected

---

### 👉 WorkflowInstance (execução)
Executa o fluxo em tempo real:

- controla estado atual
- valida transições
- registra histórico
- dispara eventos

---

## 📊 Histórico auditável

Cada transição é registrada com timestamp:

[
  { stepId: 'draft', timestamp: Date },
  { stepId: 'review', timestamp: Date },
  { stepId: 'approved', timestamp: Date }
]

Isso permite:

- rastreabilidade
- auditoria
- análise de processos

---

## 📡 Domain Events

Eventos são gerados automaticamente durante a execução:

- StepExecutedEvent
- WorkflowCompletedEvent

---

## 🔄 Event Bus (Pub/Sub)

O sistema utiliza um Event Bus interno:

eventBus.subscribe('StepExecutedEvent', handler)  
eventBus.publish(events)  

Isso permite:

- desacoplamento entre domínio e reações
- fácil integração com logs, filas ou notificações
- arquitetura orientada a eventos

---

## 🧩 Handlers

Exemplo de handlers implementados:

- LogStepExecutedHandler
- LogWorkflowCompletedHandler

---

## 🗄️ Repository Pattern

Abstração da persistência:

WorkflowInstanceRepository

Implementação atual:

InMemoryWorkflowInstanceRepository

Facilmente substituível por banco de dados real.

---

## 🧪 Testes

Testes unitários com Vitest cobrindo:

- inicialização do workflow
- transições válidas
- transições inválidas
- finalização do fluxo

Executar:

npm run test

---

## ▶️ Como rodar o projeto

npm install  
npm run dev  

---

## 📊 Exemplo de saída

Inicial: draft running  
Após review: review running  
Final: approved completed  

Eventos:

[EVENT] Step executed | instance=instance-1 | step=draft  
[EVENT] Step executed | instance=instance-1 | step=review  
[EVENT] Workflow completed | instance=instance-1  

---

## 💡 Casos de uso reais

Este tipo de engine pode ser utilizado para:

- aprovação de pedidos
- aprovação de documentos
- onboarding de colaboradores
- fluxo de reembolso
- análise de processos internos
- sistemas de tickets

---

## 🚀 Próximos passos

- API REST com Fastify
- Persistência com PostgreSQL
- Interface web com formulários
- Autenticação e autorização
- Integração com filas (Kafka / RabbitMQ)
- Deploy com Docker

---

## 📌 Autor

Gabriel Santos