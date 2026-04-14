import { DomainEventHandler } from '../../../domain/events/domain-event-handler.js'
import { WorkflowCompletedEvent } from '../../../domain/events/workflow-completed-event.js'

export class LogWorkflowCompletedHandler
  implements DomainEventHandler<WorkflowCompletedEvent>
{
  handle(event: WorkflowCompletedEvent): void {
    console.log(
      `[EVENT] Workflow completed | instance=${event.instanceId} | at=${event.occurredAt.toISOString()}`,
    )
  }
}