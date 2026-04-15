import type {
  AuditEventRecord,
  LiveWorkflowRunRecord,
  QueueHotspotRecord,
} from "@workflow-engine/core";

export function formatRiskTone(risk: QueueHotspotRecord["risk"]) {
  if (risk === "at-risk") {
    return "Em risco";
  }

  if (risk === "watch") {
    return "Atenção";
  }

  return "Saudável";
}

export function formatRunStatus(status: LiveWorkflowRunRecord["status"]) {
  if (status === "blocked") {
    return "Bloqueado";
  }

  if (status === "watch") {
    return "Atenção";
  }

  if (status === "completed") {
    return "Concluído";
  }

  return "Em andamento";
}

export function formatAuditSeverity(severity: AuditEventRecord["severity"]) {
  if (severity === "critical") {
    return "Crítico";
  }

  if (severity === "warning") {
    return "Atenção";
  }

  return "Informativo";
}
