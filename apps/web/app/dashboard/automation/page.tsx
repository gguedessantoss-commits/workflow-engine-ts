import type { QueueHotspotRecord } from "@workflow-engine/core";
import { Badge, Card } from "@workflow-engine/ui";
import { ViewHeader } from "../../../components/view-header";
import { getControlTowerSnapshot } from "../../../lib/api";
import { formatRiskTone } from "../../../lib/labels";

function getRiskVariant(risk: QueueHotspotRecord["risk"]) {
  if (risk === "at-risk") {
    return "critical" as const;
  }

  if (risk === "watch") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export default async function AutomationPage() {
  const snapshot = await getControlTowerSnapshot();

  return (
    <section className="dashboard-view">
      <ViewHeader
        eyebrow="Automações"
        title="Regras orientadas a evento que movem o workflow sem esconder a governança."
        description="A automação na Orquestra nasce do próprio motor de workflows: triggers, handoffs, digests e escalações ligadas ao estado real da instância."
      />

      <section className="workstream-grid">
        {snapshot.automations.map((automation) => (
          <Card className="workstream-card" key={automation.id}>
            <div className="workstream-card__header">
              <h3>{automation.name}</h3>
              <Badge variant="neutral">{automation.reliability}</Badge>
            </div>
            <p>{automation.description}</p>
            <div className="record-card__details">
              <div>
                <span>Trigger</span>
                <strong>{automation.trigger}</strong>
              </div>
              <div>
                <span>Ação</span>
                <strong>{automation.action}</strong>
              </div>
              <div>
                <span>Alvo</span>
                <strong>{automation.target}</strong>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="split-view">
        <Card className="audit-summary-card">
          <span className="landing-preview__eyebrow">Como isso ajuda</span>
          <ul className="sidebar-callout__list">
            <li>Elimina handoffs manuais entre revisões e aprovações.</li>
            <li>Escalações passam a nascer do estado real da instância.</li>
            <li>
              Times conseguem automatizar sem perder a trilha de auditoria.
            </li>
          </ul>
        </Card>

        <div className="audit-list">
          {snapshot.dashboard.hotspots.map((hotspot) => (
            <Card className="audit-card" key={hotspot.id}>
              <div className="audit-card__header">
                <div>
                  <span className="record-card__eyebrow">
                    {hotspot.workflowName}
                  </span>
                  <h3>{hotspot.stepName}</h3>
                </div>
                <Badge variant={getRiskVariant(hotspot.risk)}>
                  {formatRiskTone(hotspot.risk)}
                </Badge>
              </div>

              <p>{hotspot.note}</p>

              <div className="audit-card__details">
                <div>
                  <span>Fila</span>
                  <strong>{hotspot.queuedItems} itens</strong>
                </div>
                <div>
                  <span>Espera média</span>
                  <strong>{hotspot.averageWait}</strong>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
