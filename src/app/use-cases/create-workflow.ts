import { Workflow, WorkflowStep } from '../../domain/entities/workflow.js'

export interface CreateWorkflowInput {
  id: string
  name: string
  steps: WorkflowStep[]
}

export class CreateWorkflowUseCase {
  execute(input: CreateWorkflowInput): Workflow {
    if (!input.name.trim()) {
      throw new Error('Workflow name is required')
    }

    if (input.steps.length === 0) {
      throw new Error('Workflow must have at least one step')
    }

    return new Workflow(input.id, input.name, input.steps)
  }
}