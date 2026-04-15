import type { DomainEvent } from "./domain-event.js";

export class StepExecutedEvent implements DomainEvent {
  name = "StepExecutedEvent";
  occurredAt = new Date();

  constructor(
    public readonly instanceId: string,
    public readonly stepId: string,
  ) {}
}
