"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/dashboard",
    label: "Visão geral",
    description: "Pulso executivo e gargalos das etapas",
  },
  {
    href: "/dashboard/definitions",
    label: "Templates",
    description: "Modelos de workflow e blueprints de processo",
  },
  {
    href: "/dashboard/instances",
    label: "Instâncias",
    description: "Fluxos em execução, owners e próxima ação",
  },
  {
    href: "/dashboard/automation",
    label: "Automações",
    description: "Event bus, handoffs e regras operacionais",
  },
  {
    href: "/dashboard/audit",
    label: "Auditoria",
    description: "Ações, aprovações e trilha de decisão",
  },
] as const;

function isActiveRoute(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="dashboard-nav" aria-label="Navegação do dashboard">
      {navigationItems.map((item) => {
        const active = isActiveRoute(pathname, item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`dashboard-nav__link${active ? " dashboard-nav__link--active" : ""}`}
            key={item.href}
            href={item.href}
          >
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </Link>
        );
      })}
    </nav>
  );
}
