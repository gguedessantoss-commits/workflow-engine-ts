import { AppShell } from "../../components/app-shell";
import { getControlTowerSnapshot } from "../../lib/api";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const snapshot = await getControlTowerSnapshot();

  return (
    <main className="dashboard-page">
      <AppShell snapshot={snapshot}>{children}</AppShell>
    </main>
  );
}
