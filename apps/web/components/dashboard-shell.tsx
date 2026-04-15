import type {
  AutomationRuleRecord,
  ControlTowerSummary,
  LiveWorkflowRunRecord,
} from "@workflow-engine/core";
import { Badge, Card } from "@workflow-engine/ui";
import { formatRiskTone } from "../lib/labels";
import { MetricCard } from "./metric-card";
import { SectionTitle } from "./section-title";
import { ViewHeader } from "./view-header";

type DashboardShellProps = {
  automations: AutomationRuleRecord[];
  orchestrationPrinciples: string[];
  runs: LiveWorkflowRunRecord[];
  summary: ControlTowerSummary;
};

function getRiskVariant(risk: string): "critical" | "warning" | "neutral" {
  if (risk === "at-risk") {
    return "critical";
  }

  if (risk === "watch") {
    return "warning";
  }

  return "neutral";
}

export function DashboardShell({
  automations,
  orchestrationPrinciples,
  runs,
  summary,
}: DashboardShellProps) {
  return (
    <section className="dashboard-view">
      <ViewHeader
        eyebrow="Visão geral"
        title="Visão consolidada sobre templates, instâncias ativas e gargalos de etapa."
        description="A visão geral da Orquestra resume o que o time de processos precisa enxergar agora: filas, owners, automações e risco operacional por workflow."
      />

      <section className="dashboard-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Camada viva de orquestração</p>
          <h1>{summary.workspaceName}</h1>
          <p className="dashboard-hero__lede">
            Templates, instâncias, automações e auditoria em uma única
            superfície de controle.
          </p>
        </div>

        <Card className="hero-panel">
          <span className="hero-panel__label">Snapshot</span>
          <strong>{summary.periodLabel}</strong>
          <p>
            Gerado em <span>{summary.generatedAtLabel}</span> com o mesmo
            contrato tipado que alimenta a API.
          </p>
        </Card>
      </section>

      <section className="metric-grid">
        {summary.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="dashboard-main-grid">
        <Card className="dashboard-panel dashboard-panel--incidents">
          <SectionTitle
            eyebrow="Gargalos"
            title="Gargalos por etapa"
            description="A torre de controle aponta onde o fluxo está acumulando fila, tempo de espera e risco."
          />

          <div className="incident-list">
            {summary.hotspots.map((hotspot) => (
              <article className="incident-row" key={hotspot.id}>
                <div className="incident-row__heading">
                  <div>
                    <p className="incident-row__service">
                      {hotspot.workflowName}
                    </p>
                    <h3>{hotspot.stepName}</h3>
                  </div>
                  <Badge variant={getRiskVariant(hotspot.risk)}>
                    {formatRiskTone(hotspot.risk)}
                  </Badge>
                </div>

                <p className="incident-row__impact">{hotspot.note}</p>

                <div className="incident-row__meta">
                  <span>{hotspot.queuedItems} itens aguardando</span>
                  <span>Espera média {hotspot.averageWait}</span>
                  <span>Foco de operação</span>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel dashboard-panel--services">
          <SectionTitle
            eyebrow="Runs ativos"
            title="Instâncias em andamento"
            description="Cada instância mostra owner, etapa atual, contexto do negócio e próxima ação."
          />

          <div className="service-list">
            {runs.slice(0, 3).map((run) => (
              <div className="service-row" key={run.id}>
                <div className="service-row__header">
                  <strong>{run.workflowName}</strong>
                  <Badge variant={getRiskVariant(run.slaStatus)}>
                    {formatRiskTone(run.slaStatus)}
                  </Badge>
                </div>
                <p>{run.businessContext}</p>
                <div className="service-row__meta">
                  <span>{run.currentStep}</span>
                  <span>{run.owner}</span>
                  <span>{run.lastUpdatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="dashboard-lower-grid">
        <Card className="dashboard-panel">
          <SectionTitle
            eyebrow="Camada de automação"
            title="Regras e handoffs"
            description="Automações orientadas a evento ajudam o workflow a andar sem perder trilha de auditoria."
          />

          <div className="workstream-list">
            {automations.slice(0, 3).map((automation) => (
              <div className="workstream-list__item" key={automation.id}>
                <div className="workstream-list__header">
                  <strong>{automation.name}</strong>
                  <Badge variant="neutral">{automation.reliability}</Badge>
                </div>
                <p>{automation.description}</p>
                <div className="workstream-list__meta">
                  <span>{automation.trigger}</span>
                  <span>{automation.action}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel">
          <SectionTitle
            eyebrow="Timeline"
            title="Eventos recentes"
            description="Uma timeline compacta para explicar o que aconteceu com a camada de workflow nos últimos minutos."
          />

          <div className="activity-list">
            {summary.activity.map((event) => (
              <div className="activity-item" key={event.id}>
                <span className="activity-item__time">{event.at}</span>
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card className="dashboard-panel dashboard-panel--principles">
        <SectionTitle
          eyebrow="Modelo operacional"
          title="Princípios que sustentam a orquestração"
          description="Essas regras de produto fazem a plataforma parecer um sistema sério de workflows, não apenas uma tela bonita."
        />

        <ul className="highlight-list">
          {orchestrationPrinciples.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
