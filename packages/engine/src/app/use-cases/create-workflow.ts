import { Workflow, type WorkflowStep } from "../../domain/entities/workflow.js";
import { DomainError } from "../../domain/errors/domain-error.js";
import { WorkflowValidator } from "../../domain/services/workflow-validator.js";

export interface CreateWorkflowInput {
  id: string;
  name: string;
  steps: WorkflowStep[];
}

export class CreateWorkflowUseCase {
  execute(input: CreateWorkflowInput): Workflow {
    if (!input.name.trim()) {
      throw new DomainError("Workflow name is required");
    }

    if (input.steps.length === 0) {
      throw new DomainError("Workflow must have at least one step");
    }

    WorkflowValidator.validate(input.steps);

    const workflow = new Workflow(input.id, input.name, input.steps);
    workflow.activate();

    return workflow;
  }
}
