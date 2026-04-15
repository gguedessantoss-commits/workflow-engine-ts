import type { AuditEventRecord } from "@workflow-engine/core";
import { Badge, Card } from "@workflow-engine/ui";
import { ViewHeader } from "../../../components/view-header";
import { getControlTowerSnapshot } from "../../../lib/api";
import { formatAuditSeverity } from "../../../lib/labels";

function getAuditVariant(
  severity: AuditEventRecord["severity"],
): "critical" | "warning" | "neutral" {
  if (severity === "critical") {
    return "critical";
  }

  if (severity === "warning") {
    return "warning";
  }

  return "neutral";
}

export default async function AuditPage() {
  const snapshot = await getControlTowerSnapshot();

  return (
    <section className="dashboard-view">
      <ViewHeader
        eyebrow="Auditoria"
        title="Uma trilha legível de aprovações, handoffs e decisões de workflow."
        description="A auditoria da Orquestra conecta atores, automações e resultados para que qualquer processo possa ser explicado com clareza."
      />

      <div className="split-view">
        <Card className="audit-summary-card">
          <span className="landing-preview__eyebrow">Governança</span>
          <h3>Por que isso importa em uma operação real</h3>
          <ul className="sidebar-callout__list">
            <li>
              A liderança enxerga exatamente quando o caminho do fluxo mudou.
            </li>
            <li>
              Times diferentes compartilham a mesma narrativa operacional.
            </li>
            <li>
              Decisões importantes ficam presas ao histórico da instância.
            </li>
          </ul>
        </Card>

        <div className="audit-list">
          {snapshot.auditTrail.map((event) => (
            <Card className="audit-card" key={event.id}>
              <div className="audit-card__header">
                <div>
                  <span className="record-card__eyebrow">{event.at}</span>
                  <h3>{event.action}</h3>
                </div>
                <Badge variant={getAuditVariant(event.severity)}>
                  {formatAuditSeverity(event.severity)}
                </Badge>
              </div>

              <div className="audit-card__meta">
                <span>{event.actor}</span>
                <span>{event.source}</span>
              </div>

              <div className="audit-card__details">
                <div>
                  <span>Alvo</span>
                  <strong>{event.target}</strong>
                </div>
                <div>
                  <span>Detalhe</span>
                  <strong>{event.detail}</strong>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
