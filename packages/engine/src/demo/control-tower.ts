import { CreateWorkflowUseCase } from "../app/use-cases/create-workflow.js";
import type { Workflow } from "../domain/entities/workflow.js";
import { WorkflowInstance } from "../domain/entities/workflow-instance.js";
import type { WorkflowHistoryEntry } from "../domain/types/workflow-history.js";

type MetricTone = "up" | "down" | "steady";
type RiskTone = "healthy" | "watch" | "at-risk";
type AuditSeverity = "critical" | "warning" | "neutral";
type RunStatus = "running" | "watch" | "blocked" | "completed";

export interface ControlTowerMetric {
  label: string;
  value: string;
  delta: string;
  hint: string;
  tone: MetricTone;
}

export interface QueueHotspotRecord {
  id: string;
  workflowName: string;
  stepName: string;
  queuedItems: number;
  averageWait: string;
  risk: RiskTone;
  note: string;
}

export interface SummaryActivityRecord {
  id: string;
  at: string;
  title: string;
  detail: string;
}

export interface ControlTowerSummary {
  workspaceName: string;
  periodLabel: string;
  generatedAtLabel: string;
  metrics: ControlTowerMetric[];
  hotspots: QueueHotspotRecord[];
  activity: SummaryActivityRecord[];
  highlights: string[];
}

export interface WorkflowTemplateRecord {
  id: string;
  name: string;
  category: string;
  ownerTeam: string;
  description: string;
  steps: string[];
  entryStep: string;
  terminalSteps: string[];
  runningInstances: number;
  automationCoverage: string;
  averageLeadTime: string;
}

export interface LiveWorkflowRunRecord {
  id: string;
  workflowName: string;
  requester: string;
  owner: string;
  currentStep: string;
  status: RunStatus;
  slaStatus: RiskTone;
  startedAt: string;
  lastUpdatedAt: string;
  businessContext: string;
  nextAction: string;
  history: Array<
    WorkflowHistoryEntry & { stepName: string; timestampLabel: string }
  >;
}

export interface AutomationRuleRecord {
  id: string;
  name: string;
  trigger: string;
  action: string;
  target: string;
  reliability: string;
  description: string;
}

export interface AuditEventRecord {
  id: string;
  at: string;
  actor: string;
  source: string;
  action: string;
  target: string;
  detail: string;
  severity: AuditSeverity;
}

export interface BlueprintExample {
  name: string;
  summary: string;
  useCase: string;
  steps: string[];
}

export interface ControlTowerSnapshot {
  workspaceName: string;
  workspaceNarrative: string;
  sector: string;
  coverageWindow: string;
  orchestrationStatus: string;
  dashboard: ControlTowerSummary;
  templates: WorkflowTemplateRecord[];
  runs: LiveWorkflowRunRecord[];
  automations: AutomationRuleRecord[];
  auditTrail: AuditEventRecord[];
  blueprintExamples: BlueprintExample[];
  orchestrationPrinciples: string[];
}

type RunSeed = {
  id: string;
  workflow: Workflow;
  requester: string;
  owner: string;
  status: RunStatus;
  slaStatus: RiskTone;
  startedAt: string;
  lastUpdatedAt: string;
  businessContext: string;
  nextAction: string;
  path: string[];
  timeline: string[];
};

const createWorkflow = new CreateWorkflowUseCase();

const workflowCatalog = [
  createWorkflow.execute({
    id: "wf-purchase-approval",
    name: "Aprovação de compra",
    steps: [
      {
        id: "request-submitted",
        name: "Solicitação registrada",
        nextStepIds: ["finance-review"],
      },
      {
        id: "finance-review",
        name: "Análise financeira",
        nextStepIds: ["director-approval"],
      },
      {
        id: "director-approval",
        name: "Aprovação final",
        nextStepIds: ["approved", "rejected"],
      },
      { id: "approved", name: "Aprovado", nextStepIds: [] },
      { id: "rejected", name: "Rejeitado", nextStepIds: [] },
    ],
  }),
  createWorkflow.execute({
    id: "wf-onboarding",
    name: "Onboarding de colaborador",
    steps: [
      { id: "intake", name: "Intake", nextStepIds: ["manager-approval"] },
      {
        id: "manager-approval",
        name: "Aprovação do gestor",
        nextStepIds: ["it-provisioning"],
      },
      {
        id: "it-provisioning",
        name: "Provisionamento de TI",
        nextStepIds: ["orientation"],
      },
      { id: "orientation", name: "Orientação", nextStepIds: ["completed"] },
      { id: "completed", name: "Concluído", nextStepIds: [] },
    ],
  }),
  createWorkflow.execute({
    id: "wf-refund-exception",
    name: "Exceção de reembolso",
    steps: [
      { id: "intake", name: "Intake", nextStepIds: ["fraud-review"] },
      {
        id: "fraud-review",
        name: "Revisão de risco",
        nextStepIds: ["finance-approval", "rejected"],
      },
      {
        id: "finance-approval",
        name: "Aprovação financeira",
        nextStepIds: ["payout"],
      },
      { id: "payout", name: "Pagamento", nextStepIds: [] },
      { id: "rejected", name: "Rejeitado", nextStepIds: [] },
    ],
  }),
  createWorkflow.execute({
    id: "wf-vendor-compliance",
    name: "Compliance de fornecedor",
    steps: [
      { id: "intake", name: "Intake", nextStepIds: ["legal-review"] },
      {
        id: "legal-review",
        name: "Revisão jurídica",
        nextStepIds: ["security-review"],
      },
      {
        id: "security-review",
        name: "Revisão de segurança",
        nextStepIds: ["approved", "remediation"],
      },
      { id: "approved", name: "Aprovado", nextStepIds: [] },
      { id: "remediation", name: "Remediação", nextStepIds: [] },
    ],
  }),
] as const;

const templateMetadata: Record<
  string,
  Omit<WorkflowTemplateRecord, "steps" | "entryStep" | "terminalSteps">
> = {
  "wf-purchase-approval": {
    id: "wf-purchase-approval",
    name: "Aprovação de compra",
    category: "Operações financeiras",
    ownerTeam: "Compras + Financeiro",
    description:
      "Orquestra solicitações de compra com análise financeira, decisão final e checkpoints claros de SLA.",
    runningInstances: 6,
    automationCoverage: "92%",
    averageLeadTime: "5h 20m",
  },
  "wf-onboarding": {
    id: "wf-onboarding",
    name: "Onboarding de colaborador",
    category: "Operações de pessoas",
    ownerTeam: "RH + Service Desk",
    description:
      "Coordena aprovações, provisionamento e etapas de entrada entre people ops e TI.",
    runningInstances: 4,
    automationCoverage: "88%",
    averageLeadTime: "2,3 dias",
  },
  "wf-refund-exception": {
    id: "wf-refund-exception",
    name: "Exceção de reembolso",
    category: "Operações de atendimento",
    ownerTeam: "Risco + Financeiro",
    description:
      "Trata reembolsos fora da política com revisão, aprovação e gatilhos de automação para pagamento.",
    runningInstances: 5,
    automationCoverage: "95%",
    averageLeadTime: "3h 42m",
  },
  "wf-vendor-compliance": {
    id: "wf-vendor-compliance",
    name: "Compliance de fornecedor",
    category: "Jurídico e segurança",
    ownerTeam: "Jurídico + Segurança",
    description:
      "Acompanha onboarding de fornecedores com revisão jurídica, validação de segurança e remediação quando necessário.",
    runningInstances: 3,
    automationCoverage: "81%",
    averageLeadTime: "4,1 dias",
  },
};

const runSeeds: RunSeed[] = [
  {
    id: "run-104",
    workflow: workflowCatalog[0],
    requester: "Marina Sousa",
    owner: "Fábio Lima",
    status: "watch",
    slaStatus: "at-risk",
    startedAt: "08:12",
    lastUpdatedAt: "09:26",
    businessContext:
      "Expansão emergencial de orçamento para operação logística com janela curta de compra.",
    nextAction:
      "Coletar a decisão final antes do fechamento da janela de compra.",
    path: ["request-submitted", "finance-review", "director-approval"],
    timeline: ["08:12", "08:37", "09:26"],
  },
  {
    id: "run-097",
    workflow: workflowCatalog[1],
    requester: "Bot de intake de RH",
    owner: "Nina Costa",
    status: "blocked",
    slaStatus: "watch",
    startedAt: "07:48",
    lastUpdatedAt: "09:04",
    businessContext:
      "Onboarding de uma nova liderança de suporte que começa amanhã cedo.",
    nextAction:
      "Resolver a exceção de inventário de notebook e liberar o provisionamento.",
    path: ["intake", "manager-approval", "it-provisioning"],
    timeline: ["07:48", "08:05", "09:04"],
  },
  {
    id: "run-089",
    workflow: workflowCatalog[2],
    requester: "Julia Mendes",
    owner: "Mesa de risco",
    status: "running",
    slaStatus: "healthy",
    startedAt: "09:02",
    lastUpdatedAt: "09:18",
    businessContext:
      "Exceção de reembolso acima do limite de autoaprovação após disputa de entrega.",
    nextAction:
      "Confirmar as notas da revisão de risco e encaminhar para aprovação financeira.",
    path: ["intake", "fraud-review"],
    timeline: ["09:02", "09:18"],
  },
  {
    id: "run-076",
    workflow: workflowCatalog[3],
    requester: "Portal de fornecedores",
    owner: "Governança de segurança",
    status: "completed",
    slaStatus: "healthy",
    startedAt: "Ontem",
    lastUpdatedAt: "09:11",
    businessContext:
      "Onboarding de novo fornecedor para frente de analytics operacional.",
    nextAction: "Workflow concluído e repassado para vendor management.",
    path: ["intake", "legal-review", "security-review", "approved"],
    timeline: ["Ontem", "08:15", "08:42", "09:11"],
  },
];

const automations: AutomationRuleRecord[] = [
  {
    id: "auto-01",
    name: "Escalonamento da aprovação final",
    trigger:
      "Aprovação de compra entra na etapa final com menos de 90 minutos de SLA restante.",
    action: "Escalonar no Slack e criar entrada no digest executivo.",
    target: "Esteira de aprovação de compra",
    reliability: "99.4%",
    description:
      "Protege aprovações de alto valor contra travamento perto do fim da janela de compra.",
  },
  {
    id: "auto-02",
    name: "Handler de exceção de TI",
    trigger:
      "Instância de onboarding fica mais de 45 minutos em provisionamento de TI.",
    action:
      "Criar evento de bloqueio, notificar service desk e anexar checklist de fallback.",
    target: "Esteira de onboarding",
    reliability: "98.8%",
    description:
      "Transforma atrasos de provisionamento em bloqueios visíveis em vez de fila escondida.",
  },
  {
    id: "auto-03",
    name: "Branch de reembolso aprovado",
    trigger: "Revisão de risco aprova a continuidade da exceção de reembolso.",
    action:
      "Encaminhar para aprovação financeira e preparar payload de pagamento automaticamente.",
    target: "Esteira de exceção de reembolso",
    reliability: "99.1%",
    description:
      "Remove o handoff manual entre análise de risco e operação financeira.",
  },
  {
    id: "auto-04",
    name: "Publicador de digest de compliance",
    trigger:
      "Workflow de compliance de fornecedor muda de owner ou de branch de decisão.",
    action:
      "Publicar digest de auditoria para jurídico, segurança e vendor management.",
    target: "Esteira de compliance de fornecedor",
    reliability: "97.9%",
    description:
      "Mantém times cross-functional alinhados quando o workflow muda de direção.",
  },
];

const auditTrail: AuditEventRecord[] = [
  {
    id: "audit-01",
    at: "09:26",
    actor: "Fábio Lima",
    source: "Decisão humana",
    action: "Aprovação final solicitada",
    target: "run-104 / Aprovação de compra",
    detail:
      "Solicitação de alto valor entrou na etapa final com SLA pressionado.",
    severity: "warning",
  },
  {
    id: "audit-02",
    at: "09:18",
    actor: "Mesa de risco",
    source: "Análise operacional",
    action: "Revisão de risco concluída",
    target: "run-089 / Exceção de reembolso",
    detail:
      "Workflow permaneceu elegível para aprovação financeira após análise de risco.",
    severity: "neutral",
  },
  {
    id: "audit-03",
    at: "09:11",
    actor: "Governança de segurança",
    source: "Fechamento do fluxo",
    action: "Workflow de fornecedor concluído",
    target: "run-076 / Compliance de fornecedor",
    detail:
      "Fornecedor passou por revisão jurídica e de segurança sem branch de remediação.",
    severity: "neutral",
  },
  {
    id: "audit-04",
    at: "09:04",
    actor: "Automação do service desk",
    source: "Automação orientada a evento",
    action: "Bloqueio de provisionamento registrado",
    target: "run-097 / Onboarding de colaborador",
    detail:
      "Divergência de alocação de notebook gerou evento de bloqueio e escalonamento.",
    severity: "critical",
  },
];

const blueprintExamples: BlueprintExample[] = [
  {
    name: "Aprovação de compras",
    summary:
      "Fluxo para solicitações de compra com aprovação financeira e decisão final de diretoria.",
    useCase: "Controle de gastos e compras emergenciais.",
    steps: ["Solicitação", "Financeiro", "Diretoria", "Aprovado / Rejeitado"],
  },
  {
    name: "Onboarding de colaborador",
    summary:
      "Fluxo de entrada de novos colaboradores com aprovação, provisionamento e orientação.",
    useCase: "People ops e service desk trabalhando juntos.",
    steps: ["Intake", "Gestor", "TI", "Orientação", "Concluído"],
  },
  {
    name: "Exceção de reembolso",
    summary:
      "Fluxo para reembolsos fora da política, com revisão de risco e aprovação financeira.",
    useCase: "Operações de atendimento e risco.",
    steps: ["Intake", "Risco", "Financeiro", "Pagamento / Rejeitado"],
  },
  {
    name: "Compliance de fornecedor",
    summary:
      "Fluxo para onboarding de fornecedores com revisão jurídica e segurança.",
    useCase: "Jurídico, segurança e vendor management.",
    steps: ["Intake", "Jurídico", "Segurança", "Aprovado / Remediação"],
  },
];

const orchestrationPrinciples = [
  "Cada instância precisa de owner, passo atual e próxima ação visível.",
  "Automações devem reduzir handoffs manuais sem esconder a trilha de auditoria.",
  "Times precisam enxergar gargalos de etapa antes de enxergar somente SLAs estourados.",
];

function buildTemplateRecord(workflow: Workflow): WorkflowTemplateRecord {
  const metadata = templateMetadata[workflow.id];

  if (!metadata) {
    throw new Error(`Missing template metadata for ${workflow.id}`);
  }

  return {
    ...metadata,
    steps: workflow.steps.map((step) => step.name),
    entryStep: workflow.steps[0]?.name ?? "Undefined",
    terminalSteps: workflow.steps
      .filter((step) => step.nextStepIds.length === 0)
      .map((step) => step.name),
  };
}

function resolveStepName(workflow: Workflow, stepId: string) {
  return workflow.steps.find((step) => step.id === stepId)?.name ?? stepId;
}

function materializeRun(seed: RunSeed): LiveWorkflowRunRecord {
  const instance = new WorkflowInstance(seed.id, seed.workflow);

  for (const stepId of seed.path.slice(1)) {
    instance.moveTo(stepId);
  }

  const history = instance.history.map((entry, index) => ({
    ...entry,
    stepName: resolveStepName(seed.workflow, entry.stepId),
    timestampLabel: seed.timeline[index] ?? seed.lastUpdatedAt,
  }));

  return {
    id: seed.id,
    workflowName: seed.workflow.name,
    requester: seed.requester,
    owner: seed.owner,
    currentStep: resolveStepName(seed.workflow, instance.currentStep.id),
    status: seed.status,
    slaStatus: seed.slaStatus,
    startedAt: seed.startedAt,
    lastUpdatedAt: seed.lastUpdatedAt,
    businessContext: seed.businessContext,
    nextAction: seed.nextAction,
    history,
  };
}

function buildMetrics(
  runs: LiveWorkflowRunRecord[],
  templates: WorkflowTemplateRecord[],
): ControlTowerMetric[] {
  const activeRuns = runs.filter((run) => run.status !== "completed");
  const blockedRuns = runs.filter((run) => run.status === "blocked");

  return [
    {
      label: "Instâncias ativas",
      value: `${activeRuns.length}`,
      delta: "+3",
      hint: "Fluxos em execução visíveis pela torre de controle.",
      tone: "up",
    },
    {
      label: "Templates ativos",
      value: `${templates.length}`,
      delta: "+1",
      hint: "Modelos de workflow em operação nas áreas suportadas.",
      tone: "up",
    },
    {
      label: "Automações ligadas",
      value: `${automations.length}`,
      delta: "99.0%",
      hint: "Confiabilidade agregada das regras que disparam eventos e handoffs.",
      tone: "steady",
    },
    {
      label: "Bloqueios visíveis",
      value: `${blockedRuns.length}`,
      delta: "-1",
      hint: "Instâncias que já estão com gargalo operacional explícito.",
      tone: "down",
    },
  ];
}

export function buildControlTowerSnapshot(): ControlTowerSnapshot {
  const templates = workflowCatalog.map(buildTemplateRecord);
  const runs = runSeeds.map(materializeRun);

  const dashboard: ControlTowerSummary = {
    workspaceName: "Orquestra / Torre de Controle de Workflows",
    periodLabel: "Pulso operacional da manhã",
    generatedAtLabel: "09:30 local",
    metrics: buildMetrics(runs, templates),
    hotspots: [
      {
        id: "hotspot-01",
        workflowName: "Aprovação de compra",
        stepName: "Aprovação final",
        queuedItems: 3,
        averageWait: "1h 14m",
        risk: "at-risk",
        note: "Janela de aprovação apertada para requisições de alto valor.",
      },
      {
        id: "hotspot-02",
        workflowName: "Onboarding de colaborador",
        stepName: "Provisionamento de TI",
        queuedItems: 5,
        averageWait: "46m",
        risk: "watch",
        note: "Inventário de dispositivos virou gargalo em dois onboarding flows.",
      },
      {
        id: "hotspot-03",
        workflowName: "Compliance de fornecedor",
        stepName: "Revisão de segurança",
        queuedItems: 2,
        averageWait: "6h 05m",
        risk: "watch",
        note: "Fila pequena, mas com lead time acima do esperado para fornecedores novos.",
      },
    ],
    activity: [
      {
        id: "act-01",
        at: "09:26",
        title: "Instância enviada para aprovação final",
        detail:
          "Aprovação de compra run-104 entrou na etapa final com SLA em observação.",
      },
      {
        id: "act-02",
        at: "09:18",
        title: "Automação de handoff executada",
        detail:
          "Exceção de reembolso avançou da revisão de risco para aprovação financeira automaticamente.",
      },
      {
        id: "act-03",
        at: "09:11",
        title: "Workflow concluído",
        detail:
          "Compliance de fornecedor run-076 foi encerrado com trilha completa de auditoria.",
      },
      {
        id: "act-04",
        at: "09:04",
        title: "Bloqueio operacional registrado",
        detail:
          "Onboarding de colaborador run-097 abriu evento de bloqueio por falta de equipamento.",
      },
    ],
    highlights: [
      "O snapshot usa a engine real para materializar instâncias e transições válidas.",
      "A camada web demonstra templates, runs, automações e auditoria sem inventar um domínio paralelo.",
      "A arquitetura segue pronta para API, persistência relacional, filas e observabilidade.",
    ],
  };

  return {
    workspaceName: "Orquestra / Torre de Controle de Workflows",
    workspaceNarrative:
      "Uma torre de controle para workflows de aprovação, onboarding e operações internas, com instâncias em execução, automações ativas e gargalos explícitos.",
    sector: "Financeiro, people ops, jurídico, segurança e shared services",
    coverageWindow:
      "Orquestração de processos internos sensíveis a SLA e handoffs cross-functional",
    orchestrationStatus: "Em atenção",
    dashboard,
    templates,
    runs,
    automations,
    auditTrail,
    blueprintExamples,
    orchestrationPrinciples,
  };
}
