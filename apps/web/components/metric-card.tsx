import type { ControlTowerMetric } from "@workflow-engine/core";
import { Card } from "@workflow-engine/ui";

type MetricCardProps = {
  metric: ControlTowerMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card className="metric-card">
      <div className="metric-card__header">
        <span className="metric-card__label">{metric.label}</span>
        <span
          className={`metric-card__trend metric-card__trend--${metric.tone}`}
        >
          {metric.delta}
        </span>
      </div>
      <strong className="metric-card__value">{metric.value}</strong>
      <p className="metric-card__hint">{metric.hint}</p>
    </Card>
  );
}
