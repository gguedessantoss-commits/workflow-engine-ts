import { DomainError } from "../../domain/errors/domain-error.js";
import type { WorkflowInstanceRepository } from "../contracts/workflow-instance-repository.js";

export interface AdvanceWorkflowInstanceInput {
  instanceId: string;
  nextStepId: string;
}

export class AdvanceWorkflowInstanceUseCase {
  constructor(
    private readonly workflowInstanceRepository: WorkflowInstanceRepository,
  ) {}

  async execute(input: AdvanceWorkflowInstanceInput): Promise<void> {
    const instance = await this.workflowInstanceRepository.findById(
      input.instanceId,
    );

    if (!instance) {
      throw new DomainError("Workflow instance not found");
    }

    instance.moveTo(input.nextStepId);

    await this.workflowInstanceRepository.save(instance);
  }
}
