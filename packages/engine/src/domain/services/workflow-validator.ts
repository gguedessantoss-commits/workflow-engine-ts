import type { WorkflowStep } from "../entities/workflow.js";
import { DomainError } from "../errors/domain-error.js";

export function validateWorkflowSteps(steps: WorkflowStep[]): void {
  if (steps.length === 0) {
    throw new DomainError("Workflow must have at least one step");
  }

  const stepIds = new Set(steps.map((step) => step.id));

  for (const step of steps) {
    for (const nextStepId of step.nextStepIds) {
      if (!stepIds.has(nextStepId)) {
        throw new DomainError(
          `Invalid transition: step ${step.id} references unknown step ${nextStepId}`,
        );
      }
    }
  }
}

export const WorkflowValidator = {
  validate: validateWorkflowSteps,
};
