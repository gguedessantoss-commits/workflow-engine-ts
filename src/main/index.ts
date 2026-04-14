import { AdvanceWorkflowInstanceUseCase } from '../app/use-cases/advance-workflow-instance.js'
import { CreateWorkflowUseCase } from '../app/use-cases/create-workflow.js'
import { WorkflowInstance } from '../domain/entities/workflow-instance.js'
import { InMemoryWorkflowInstanceRepository } from '../infra/repositories/in-memory-workflow-instance-repository.js'
import { InMemoryEventBus } from '../infra/workflow/in-memory-event-bus.js'
import { LogStepExecutedHandler } from '../infra/workflow/handlers/log-step-executed-handler.js'
import { LogWorkflowCompletedHandler } from '../infra/workflow/handlers/log-workflow-completed-handler.js'

const createWorkflowUseCase = new CreateWorkflowUseCase()
const workflowInstanceRepository = new InMemoryWorkflowInstanceRepository()
const advanceWorkflowInstanceUseCase = new AdvanceWorkflowInstanceUseCase(
  workflowInstanceRepository,
)

const eventBus = new InMemoryEventBus()

eventBus.subscribe('StepExecutedEvent', new LogStepExecutedHandler())
eventBus.subscribe('WorkflowCompletedEvent', new LogWorkflowCompletedHandler())

const workflow = createWorkflowUseCase.execute({
  id: 'wf-1',
  name: 'Order Approval Flow',
  steps: [
    { id: 'draft', name: 'Draft', nextStepIds: ['review'] },
    { id: 'review', name: 'Review', nextStepIds: ['approved', 'rejected'] },
    { id: 'approved', name: 'Approved', nextStepIds: [] },
    { id: 'rejected', name: 'Rejected', nextStepIds: [] },
  ],
})

const instance = new WorkflowInstance('instance-1', workflow)

await workflowInstanceRepository.save(instance)
await eventBus.publish(instance.pullEvents())

console.log('Inicial:', instance.currentStep.id, instance.status)

await advanceWorkflowInstanceUseCase.execute({
  instanceId: 'instance-1',
  nextStepId: 'review',
})

const afterReview = await workflowInstanceRepository.findById('instance-1')

if (!afterReview) {
  throw new Error('Workflow instance not found after review')
}

await eventBus.publish(afterReview.pullEvents())

console.log('Após review:', afterReview.currentStep.id, afterReview.status)

await advanceWorkflowInstanceUseCase.execute({
  instanceId: 'instance-1',
  nextStepId: 'approved',
})

const afterApproved = await workflowInstanceRepository.findById('instance-1')

if (!afterApproved) {
  throw new Error('Workflow instance not found after approval')
}

await eventBus.publish(afterApproved.pullEvents())

console.log('Final:', afterApproved.currentStep.id, afterApproved.status)
console.log('Histórico:', afterApproved.history)
console.log('Eventos pendentes após publish:', afterApproved.events)