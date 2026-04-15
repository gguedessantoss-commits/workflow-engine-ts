import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orquestra | Plataforma de Orquestração de Workflows",
  description:
    "Orquestra é uma plataforma para modelar, executar, monitorar e auditar workflows de aprovação, onboarding e operações internas.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
