import { DomainError } from "../errors/domain-error.js";
import { WorkflowValidator } from "../services/workflow-validator.js";

export type WorkflowStatus = "draft" | "active" | "completed" | "cancelled";

export interface WorkflowStep {
  id: string;
  name: string;
  nextStepIds: string[];
}

export class Workflow {
  public readonly id: string;
  public readonly name: string;
  public readonly steps: WorkflowStep[];
  public status: WorkflowStatus;

  constructor(
    id: string,
    name: string,
    steps: WorkflowStep[],
    status: WorkflowStatus = "draft",
  ) {
    WorkflowValidator.validate(steps);

    this.id = id;
    this.name = name;
    this.steps = steps;
    this.status = status;
  }

  activate(): void {
    if (this.steps.length === 0) {
      throw new DomainError("Workflow cannot be activated without steps");
    }

    this.status = "active";
  }

  complete(): void {
    if (this.status !== "active") {
      throw new DomainError("Only active workflows can be completed");
    }

    this.status = "completed";
  }

  cancel(): void {
    if (this.status === "completed") {
      throw new DomainError("Completed workflows cannot be cancelled");
    }

    this.status = "cancelled";
  }
}
