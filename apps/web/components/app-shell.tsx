import type { ControlTowerSnapshot } from "@workflow-engine/core";
import { Badge, Card } from "@workflow-engine/ui";
import Link from "next/link";
import { DashboardNav } from "./dashboard-nav";

type AppShellProps = {
  snapshot: ControlTowerSnapshot;
  children: React.ReactNode;
};

function getStatusVariant(status: string): "critical" | "warning" | "neutral" {
  const normalizedStatus = status.toLowerCase();

  if (
    normalizedStatus.includes("atenção") ||
    normalizedStatus.includes("atencao")
  ) {
    return "warning";
  }

  if (
    normalizedStatus.includes("crítico") ||
    normalizedStatus.includes("critico")
  ) {
    return "critical";
  }

  return "neutral";
}

export function AppShell({ snapshot, children }: AppShellProps) {
  const metrics = snapshot.dashboard.metrics.slice(0, 3);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link className="app-brand" href="/">
          Orquestra
        </Link>

        <Card className="workspace-card">
          <div className="workspace-card__header">
            <span className="landing-preview__eyebrow">Ambiente ativo</span>
            <Badge variant={getStatusVariant(snapshot.orchestrationStatus)}>
              {snapshot.orchestrationStatus}
            </Badge>
          </div>

          <strong className="workspace-card__title">
            {snapshot.workspaceName}
          </strong>
          <p>{snapshot.workspaceNarrative}</p>

          <div className="workspace-card__meta">
            <span>{snapshot.sector}</span>
            <span>{snapshot.coverageWindow}</span>
          </div>
        </Card>

        <DashboardNav />

        <Card className="sidebar-callout">
          <span className="landing-preview__eyebrow">
            Princípios de orquestração
          </span>
          <ul className="sidebar-callout__list">
            {snapshot.orchestrationPrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </Card>
      </aside>

      <div className="app-main">
        <section className="app-topbar">
          <div>
            <p className="app-topbar__eyebrow">
              Torre de controle de workflows
            </p>
            <h1>{snapshot.workspaceName}</h1>
            <p className="app-topbar__description">
              Modele, acompanhe e governe workflows de aprovação, onboarding e
              operações internas em uma mesma camada de controle.
            </p>
          </div>

          <div className="app-topbar__metrics">
            {metrics.map((metric) => (
              <Card className="app-topbar__metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.hint}</p>
              </Card>
            ))}
          </div>
        </section>

        {children}
      </div>
    </div>
  );
}
