import { WorkflowInstance } from '../../domain/entities/workflow-instance.js'

export interface WorkflowInstanceRepository {
  save(instance: WorkflowInstance): Promise<void>
  findById(id: string): Promise<WorkflowInstance | null>
}