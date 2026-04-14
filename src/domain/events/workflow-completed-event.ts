import { DomainEvent } from './domain-event.js'

export class WorkflowCompletedEvent implements DomainEvent {
  name = 'WorkflowCompletedEvent'
  occurredAt = new Date()

  constructor(public readonly instanceId: string) {}
}