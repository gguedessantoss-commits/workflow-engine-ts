import { buildControlTowerSnapshot } from "@workflow-engine/core";
import { Card } from "@workflow-engine/ui";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  {
    href: "#problem",
    label: "Problema",
  },
  {
    href: "#solution",
    label: "Solução",
  },
  {
    href: "#templates",
    label: "Templates",
  },
  {
    href: "#in-action",
    label: "Na prática",
  },
  {
    href: "#automation",
    label: "Automações",
  },
];

const painPoints = [
  {
    title: "Processos vivem em ferramentas soltas",
    description:
      "Aprovações, handoffs e exceções acabam em planilhas, e-mails, tickets e mensagens, sem uma visão única da execução.",
  },
  {
    title: "Ninguém sabe onde o workflow travou",
    description:
      "Quando a etapa atual, o owner e a próxima ação não estão claros, o processo para e o gargalo só aparece tarde demais.",
  },
  {
    title: "Auditoria vira reconstrução manual",
    description:
      "Sem um histórico estruturado de transições, aprovações e automações, explicar o que aconteceu custa tempo e confiança.",
  },
];

const workflowModel = [
  {
    title: "Modelar templates",
    description:
      "Defina etapas, transições e caminhos de decisão para compras, onboarding, compliance, reembolso e operações internas.",
  },
  {
    title: "Executar instâncias",
    description:
      "Cada processo entra em execução com owner, etapa atual, contexto de negócio e trilha de histórico.",
  },
  {
    title: "Automatizar handoffs",
    description:
      "Eventos e regras operacionais fazem o fluxo andar, disparam digests, escalonamentos e mudanças de estado sem perder governança.",
  },
  {
    title: "Monitorar e auditar",
    description:
      "A plataforma mostra gargalos, instâncias ativas, risco de SLA e timeline de decisões em uma mesma camada de controle.",
  },
];

const audience = [
  {
    title: "Finance ops",
    description:
      "Para aprovações de compra, despesas excepcionais, reembolsos e rotas de decisão com SLA apertado.",
  },
  {
    title: "People ops e IT",
    description:
      "Para onboarding, provisionamento, acessos e handoffs entre RH, gestor e service desk.",
  },
  {
    title: "Shared services",
    description:
      "Para processos internos que cruzam áreas e precisam de ownership claro em cada etapa.",
  },
  {
    title: "Governança e compliance",
    description:
      "Para trilha auditável, visibilidade de exceções e explicação confiável do caminho que cada workflow percorreu.",
  },
];

const capabilities = [
  {
    title: "Templates de workflow",
    description:
      "Fluxos modelados com etapas, transições válidas e blueprints orientados a casos reais do negócio.",
  },
  {
    title: "Controle de instâncias",
    description:
      "Cada workflow em execução mostra etapa atual, owner, contexto, risco e próxima ação recomendada.",
  },
  {
    title: "Fila de gargalos",
    description:
      "A torre de controle destaca onde o processo está acumulando espera e em qual etapa o risco está crescendo.",
  },
  {
    title: "Automações orientadas a evento",
    description:
      "Triggers e handlers internos ajudam a automatizar handoffs, digests e escalonamentos usando o estado real do fluxo.",
  },
  {
    title: "Trilha de auditoria",
    description:
      "Cada decisão, mudança de branch e intervenção automática pode ser explicada por meio de um histórico legível.",
  },
  {
    title: "Base pronta para evoluir",
    description:
      "A arquitetura continua preparada para API, persistência, filas, auth e observabilidade sem quebrar o domínio central.",
  },
];

const demoGallery = [
  {
    eyebrow: "Visão geral da torre",
    title: "Instâncias, gargalos e métricas em um único painel.",
    description:
      "A visão geral resume o que a operação precisa saber agora: onde o fluxo travou, o que está perto do limite e quais automações estão agindo.",
    image: "/images/landing/orquestra-overview.svg",
    href: "/dashboard",
    cta: "Abrir visão geral",
  },
  {
    eyebrow: "Templates ativos",
    title: "A plataforma deixa claro o que é possível construir.",
    description:
      "Os templates mostram etapas, ownership e nível de automação para fluxos como aprovação de compra, onboarding e compliance de fornecedor.",
    image: "/images/landing/orquestra-definitions.svg",
    href: "/dashboard/definitions",
    cta: "Abrir templates",
  },
  {
    eyebrow: "Instâncias em execução",
    title: "Cada run mostra status, owner, histórico e próxima ação.",
    description:
      "A fila de instâncias transforma o motor de workflow em uma experiência de produto clara para operadores e liderança.",
    image: "/images/landing/orquestra-instances.svg",
    href: "/dashboard/instances",
    cta: "Abrir instâncias",
  },
  {
    eyebrow: "Automações e auditoria",
    title: "Eventos, handoffs e trilha de decisão ficam visíveis.",
    description:
      "A plataforma conecta regras orientadas a evento com auditoria legível, sem esconder o que foi automático e o que foi decisão humana.",
    image: "/images/landing/orquestra-automation.svg",
    href: "/dashboard/automation",
    cta: "Abrir automações",
  },
] as const;

export default function HomePage() {
  const snapshot = buildControlTowerSnapshot();
  const heroStats = snapshot.dashboard.metrics.slice(0, 3);
  const productSignals = snapshot.dashboard.highlights;
  const featuredAutomations = snapshot.automations.slice(0, 4);

  return (
    <main className="landing-page">
      <header className="site-header">
        <Link className="brand" href="/">
          Orquestra
        </Link>

        <nav className="site-nav" aria-label="Seções da landing">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <Link className="button button--ghost" href="/dashboard">
          Ver plataforma ao vivo
        </Link>
      </header>

      <section className="landing-hero">
        <div className="landing-hero__content">
          <span className="landing-pill">
            Orquestração de workflows para aprovações e operações internas
          </span>
          <h1>
            Modele, execute e monitore workflows críticos sem perder instâncias,
            automações e auditoria de vista.
          </h1>
          <p>
            Orquestra é a camada de produto sobre o{" "}
            <code>workflow-engine-ts</code>: uma plataforma para tirar processos
            de planilhas, chats e handoffs manuais e colocá-los em uma torre de
            controle legível.
          </p>

          <div className="hero-checklist">
            <span>Templates de processo</span>
            <span>Instâncias em execução</span>
            <span>Automações via eventos</span>
            <span>Auditoria confiável</span>
          </div>

          <div className="landing-actions">
            <Link className="button button--primary" href="/dashboard">
              Abrir studio
            </Link>
            <a className="button button--ghost" href="#templates">
              Ver o que é possível criar
            </a>
          </div>
        </div>

        <Card className="landing-preview">
          <span className="landing-preview__eyebrow">Definição do produto</span>
          <strong>O que a Orquestra entrega</strong>
          <p>
            Uma plataforma B2B para modelar workflows, executar instâncias,
            enxergar gargalos e explicar decisões sem depender de reconstrução
            manual.
          </p>
          <ul>
            {productSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="hero-stat-grid">
        {heroStats.map((stat) => (
          <Card className="hero-stat" key={stat.label}>
            <span className="hero-stat__label">{stat.label}</span>
            <strong className="hero-stat__value">{stat.value}</strong>
            <p>{stat.hint}</p>
          </Card>
        ))}
      </section>

      <section className="section-shell" id="problem">
        <div className="section-heading">
          <span className="section-title__eyebrow">O problema</span>
          <h2>
            Processos críticos ficam opacos quando o workflow real está
            espalhado por ferramentas demais.
          </h2>
          <p>
            O <code>workflow-engine-ts</code> já resolve a base de domínio. O
            que faltava era uma camada de produto que transformasse essa
            capacidade em visibilidade operacional, ownership e narrativa para
            apresentação.
          </p>
        </div>

        <div className="problem-grid">
          {painPoints.map((item, index) => (
            <Card className="problem-card" key={item.title}>
              <span className="problem-card__index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell" id="solution">
        <div className="section-heading">
          <span className="section-title__eyebrow">A solução</span>
          <h2>
            A engine vira produto quando templates, runs e automações aparecem
            em uma mesma camada de controle.
          </h2>
          <p>
            Em vez de apresentar só classes e entidades, a Orquestra mostra como
            o motor se comporta em cenários reais de negócio: compras,
            onboarding, reembolso e compliance.
          </p>
        </div>

        <div className="workflow-grid">
          {workflowModel.map((step, index) => (
            <Card className="workflow-step" key={step.title}>
              <span className="workflow-step__number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell" id="templates">
        <div className="section-heading">
          <span className="section-title__eyebrow">O que dá para criar</span>
          <h2>
            A mesma plataforma pode sustentar processos de áreas muito
            diferentes sem reinventar o motor.
          </h2>
          <p>
            Os exemplos abaixo são modelados em cima do mesmo núcleo de workflow
            e ajudam a comunicar rapidamente o valor do sistema.
          </p>
        </div>

        <div className="workstream-grid">
          {snapshot.blueprintExamples.map((blueprint) => (
            <Card className="workstream-card" key={blueprint.name}>
              <div className="workstream-card__header">
                <h3>{blueprint.name}</h3>
                <span className="tag-list__item">Blueprint</span>
              </div>
              <p>{blueprint.summary}</p>
              <div className="tag-list">
                {blueprint.steps.map((step) => (
                  <span className="tag-list__item" key={step}>
                    {step}
                  </span>
                ))}
              </div>
              <div className="workstream-card__meta">
                <span>{blueprint.useCase}</span>
                <strong>Processo modelável</strong>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell" id="in-action">
        <div className="section-heading">
          <span className="section-title__eyebrow">Na prática</span>
          <h2>
            O produto deixa de parecer conceito quando a pessoa vê o workflow
            acontecendo.
          </h2>
          <p>
            Essas telas mostram como o motor foi empacotado como uma plataforma
            de orquestração, com templates, runs, automações e auditoria.
          </p>
        </div>

        <div className="demo-gallery">
          {demoGallery.map((item) => (
            <Card className="demo-gallery__card" key={item.title}>
              <div className="demo-gallery__image">
                <Image
                  alt={item.title}
                  className="demo-gallery__image-asset"
                  height={1200}
                  src={item.image}
                  width={1600}
                />
              </div>

              <div className="demo-gallery__content">
                <span className="landing-preview__eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="demo-gallery__link" href={item.href}>
                  {item.cta}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell" id="automation">
        <div className="section-heading">
          <span className="section-title__eyebrow">Automações e eventos</span>
          <h2>
            O motor fica mais convincente quando a plataforma mostra o que pode
            ser automatizado em cima dele.
          </h2>
          <p>
            Handoffs, escalonamentos, digests e regras de fila são exemplos de
            como a engine pode sair do papel e operar processos reais.
          </p>
        </div>

        <div className="playbook-layout">
          <Card className="alert-board">
            <span className="landing-preview__eyebrow">
              Sinais operacionais
            </span>
            <h3>Etapas que merecem atenção agora</h3>

            <div className="alert-stack">
              {snapshot.dashboard.hotspots.map((hotspot) => (
                <article
                  className={`alert-card alert-card--${
                    hotspot.risk === "at-risk"
                      ? "critical"
                      : hotspot.risk === "watch"
                        ? "warning"
                        : "neutral"
                  }`}
                  key={hotspot.id}
                >
                  <span className="alert-card__label">
                    {hotspot.workflowName}
                  </span>
                  <h4>{hotspot.stepName}</h4>
                  <p>
                    <strong>Fila:</strong> {hotspot.queuedItems} itens em espera
                    com média de {hotspot.averageWait}.
                  </p>
                  <p>
                    <strong>Leitura:</strong> {hotspot.note}
                  </p>
                </article>
              ))}
            </div>
          </Card>

          <div className="playbook-grid">
            {featuredAutomations.map((automation) => (
              <Card className="playbook-card" key={automation.id}>
                <h3>{automation.name}</h3>
                <p>{automation.description}</p>
                <p>
                  <strong>Trigger:</strong> {automation.trigger}
                </p>
                <p>
                  <strong>Ação:</strong> {automation.action}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" id="capabilities">
        <div className="section-heading">
          <span className="section-title__eyebrow">Capacidades</span>
          <h2>
            A apresentação fica forte porque o produto mistura domínio técnico e
            sinais claros de plataforma madura.
          </h2>
          <p>
            O resultado não é um CRUD de processos. É uma experiência que mostra
            modelagem, execução, visibilidade e governança em torno do workflow.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((capability) => (
            <Card className="capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell section-shell--split" id="audience">
        <div className="section-heading">
          <span className="section-title__eyebrow">Onde faz sentido</span>
          <h2>
            A Orquestra funciona melhor onde o processo cruza times e precisa de
            ownership claro em cada etapa.
          </h2>
          <p>
            O produto tem mais credibilidade em contextos de aprovação,
            onboarding, exceções e governança operacional.
          </p>
        </div>

        <div className="use-case-layout">
          <Card className="use-case-card">
            <span className="landing-preview__eyebrow">
              Times que ganham com isso
            </span>
            <ul className="use-case-list">
              {audience.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="cta-section">
            <span className="landing-preview__eyebrow">Demo ao vivo</span>
            <h2>
              Abra a torre de controle e veja a workflow engine empacotada como
              produto.
            </h2>
            <p>
              O dashboard mostra como templates, instâncias, automações e trilha
              de auditoria podem conviver em uma experiência de apresentação com
              cara de sistema sênior.
            </p>

            <div className="landing-actions">
              <Link className="button button--primary" href="/dashboard">
                Abrir dashboard
              </Link>
              <Link
                className="button button--ghost"
                href="/api/v1/control-tower/snapshot"
              >
                Inspecionar API pública
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
