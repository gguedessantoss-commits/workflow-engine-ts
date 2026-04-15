import type { LiveWorkflowRunRecord } from "@workflow-engine/core";
import { Badge, Card } from "@workflow-engine/ui";
import { ViewHeader } from "../../../components/view-header";
import { getControlTowerSnapshot } from "../../../lib/api";
import { formatRiskTone, formatRunStatus } from "../../../lib/labels";

function getRunVariant(status: LiveWorkflowRunRecord["status"]) {
  if (status === "blocked") {
    return "critical" as const;
  }

  if (status === "watch") {
    return "warning" as const;
  }

  return "neutral" as const;
}

function getRiskVariant(status: LiveWorkflowRunRecord["slaStatus"]) {
  if (status === "at-risk") {
    return "critical" as const;
  }

  if (status === "watch") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export default async function InstancesPage() {
  const snapshot = await getControlTowerSnapshot();

  return (
    <section className="dashboard-view">
      <ViewHeader
        eyebrow="Instâncias"
        title="Runs ativos, bloqueios e histórico de etapa em uma única fila operacional."
        description="A Orquestra trata cada workflow em execução como uma instância real com owner, contexto de negócio, risco de SLA e próximos passos visíveis."
      />

      <div className="record-grid">
        {snapshot.runs.map((run) => (
          <Card className="record-card" key={run.id}>
            <div className="record-card__header">
              <div>
                <span className="record-card__eyebrow">
                  {run.workflowName} • {run.requester}
                </span>
                <h3>{run.currentStep}</h3>
              </div>

              <div className="record-card__badges">
                <Badge variant={getRunVariant(run.status)}>
                  {formatRunStatus(run.status)}
                </Badge>
                <Badge variant={getRiskVariant(run.slaStatus)}>
                  {formatRiskTone(run.slaStatus)}
                </Badge>
              </div>
            </div>

            <p>{run.businessContext}</p>

            <div className="record-card__details">
              <div>
                <span>Owner</span>
                <strong>{run.owner}</strong>
              </div>
              <div>
                <span>Iniciado</span>
                <strong>{run.startedAt}</strong>
              </div>
              <div>
                <span>Última atualização</span>
                <strong>{run.lastUpdatedAt}</strong>
              </div>
              <div>
                <span>Próxima ação</span>
                <strong>{run.nextAction}</strong>
              </div>
            </div>

            <div className="tag-list">
              {run.history.map((entry) => (
                <span
                  className="tag-list__item"
                  key={`${run.id}-${entry.stepId}`}
                >
                  {entry.timestampLabel} • {entry.stepName}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
