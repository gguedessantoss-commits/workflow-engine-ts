import { DashboardShell } from "../../components/dashboard-shell";
import { getControlTowerSnapshot } from "../../lib/api";

export default async function DashboardPage() {
  const snapshot = await getControlTowerSnapshot();
  return (
    <DashboardShell
      automations={snapshot.automations}
      orchestrationPrinciples={snapshot.orchestrationPrinciples}
      runs={snapshot.runs}
      summary={snapshot.dashboard}
    />
  );
}
