import { DomainEvent } from '../events/domain-event.js'
import { StepExecutedEvent } from '../events/step-executed-event.js'
import { WorkflowCompletedEvent } from '../events/workflow-completed-event.js'
import { DomainError } from '../errors/domain-error.js'
import { WorkflowHistoryEntry } from '../types/workflow-history.js'
import { Workflow, WorkflowStep } from './workflow.js'

export type WorkflowInstanceStatus = 'running' | 'completed' | 'failed'

export class WorkflowInstance {
  public readonly id: string
  public currentStep: WorkflowStep
  public status: WorkflowInstanceStatus = 'running'
  public history: WorkflowHistoryEntry[] = []
  public events: DomainEvent[] = []

  constructor(id: string, public readonly workflow: Workflow) {
    if (workflow.steps.length === 0) {
      throw new DomainError('Workflow must have steps')
    }

    this.id = id
    this.currentStep = workflow.steps[0]!

    this.history.push({
      stepId: this.currentStep.id,
      timestamp: new Date(),
    })

    this.events.push(new StepExecutedEvent(this.id, this.currentStep.id))
  }

  moveTo(nextStepId: string): void {
    const nextStep = this.workflow.steps.find(
      (s: WorkflowStep) => s.id === nextStepId,
    )

    if (!nextStep) {
      throw new DomainError(`Step ${nextStepId} not found`)
    }

    if (!this.currentStep.nextStepIds.includes(nextStepId)) {
      throw new DomainError(
        `Invalid transition from ${this.currentStep.id} to ${nextStepId}`,
      )
    }

    this.currentStep = nextStep

    this.history.push({
      stepId: nextStep.id,
      timestamp: new Date(),
    })

    this.events.push(new StepExecutedEvent(this.id, nextStep.id))

    if (nextStep.nextStepIds.length === 0) {
      this.status = 'completed'
      this.events.push(new WorkflowCompletedEvent(this.id))
    }
  }

  pullEvents(): DomainEvent[] {
    const pulledEvents = [...this.events]
    this.events = []

    return pulledEvents
  }
}