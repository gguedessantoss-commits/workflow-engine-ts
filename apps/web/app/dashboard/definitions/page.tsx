import { Card } from "@workflow-engine/ui";
import { ViewHeader } from "../../../components/view-header";
import { getControlTowerSnapshot } from "../../../lib/api";

export default async function DefinitionsPage() {
  const snapshot = await getControlTowerSnapshot();

  return (
    <section className="dashboard-view">
      <ViewHeader
        eyebrow="Templates"
        title="Modelos de workflow prontos para aprovações, handoffs e operações internas."
        description="Cada template mostra o tipo de processo suportado, o time owner, as etapas modeladas e o nível de automação já embutido na plataforma."
      />

      <section className="workstream-grid">
        {snapshot.templates.map((template) => (
          <Card className="workstream-card" key={template.id}>
            <div className="workstream-card__header">
              <h3>{template.name}</h3>
              <span className="tag-list__item">{template.category}</span>
            </div>
            <p>{template.description}</p>
            <div className="workstream-card__meta">
              <span>{template.ownerTeam}</span>
              <strong>{template.averageLeadTime}</strong>
            </div>

            <div className="tag-list">
              {template.steps.map((step) => (
                <span className="tag-list__item" key={step}>
                  {step}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <section className="dashboard-lower-grid">
        {snapshot.blueprintExamples.map((blueprint) => (
          <Card className="audit-summary-card" key={blueprint.name}>
            <span className="landing-preview__eyebrow">Exemplo de uso</span>
            <h3>{blueprint.name}</h3>
            <p>{blueprint.summary}</p>
            <div className="tag-list">
              {blueprint.steps.map((step) => (
                <span className="tag-list__item" key={step}>
                  {step}
                </span>
              ))}
            </div>
            <p>{blueprint.useCase}</p>
          </Card>
        ))}
      </section>
    </section>
  );
}
