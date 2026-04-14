import { WorkflowInstanceRepository } from '../../app/contracts/workflow-instance-repository.js'
import { WorkflowInstance } from '../../domain/entities/workflow-instance.js'

export class InMemoryWorkflowInstanceRepository
  implements WorkflowInstanceRepository
{
  private readonly items = new Map<string, WorkflowInstance>()

  async save(instance: WorkflowInstance): Promise<void> {
    this.items.set(instance.id, instance)
  }

  async findById(id: string): Promise<WorkflowInstance | null> {
    return this.items.get(id) ?? null
  }
}