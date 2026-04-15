# Orquestra

Orquestra é a camada de produto construída sobre o `workflow-engine-ts`: uma plataforma de orquestração de workflows para aprovações, onboarding, compliance e operações internas.

Em vez de apresentar só o motor de workflow em isolamento, este repositório agora demonstra como o domínio pode ser empacotado como produto, com landing page, control tower, templates, instâncias em execução, automações e trilha de auditoria.

## O que este projeto demonstra

- modelagem de workflows com domínio tipado
- execução de instâncias com transições válidas
- automações orientadas a evento
- visão operacional de gargalos e risco
- trilha de auditoria legível
- monorepo TypeScript com pacotes reutilizáveis

## Estrutura

```text
apps/
  web/        Next.js app com landing e dashboard
packages/
  engine/     Core da workflow engine e snapshot de demo
  ui/         Componentes compartilhados da interface
```

## Rodando localmente

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Depois abra:

- `http://localhost:3000`
- `http://localhost:3000/dashboard`
- `http://localhost:3000/api/v1/control-tower/snapshot`

## Scripts principais

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Narrativa do produto

Orquestra resolve um problema recorrente em empresas com processos internos críticos: aprovações, handoffs e exceções ficam espalhados entre ferramentas demais, sem visibilidade clara de owner, etapa atual, risco e histórico decisório.

A proposta aqui é mostrar uma plataforma que:

- centraliza templates de processo
- expõe instâncias em execução com contexto real
- transforma gargalos em sinais operacionais claros
- conecta automação e auditoria na mesma experiência

## Observação

O `README.legacy.md` foi preservado como registro da versão original do projeto, focada apenas na engine.
