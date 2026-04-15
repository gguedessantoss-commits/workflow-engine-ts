import type { DomainEventHandler } from "../../../domain/events/domain-event-handler.js";
import type { StepExecutedEvent } from "../../../domain/events/step-executed-event.js";

export class LogStepExecutedHandler
  implements DomainEventHandler<StepExecutedEvent>
{
  handle(event: StepExecutedEvent): void {
    console.log(
      `[EVENT] Step executed | instance=${event.instanceId} | step=${event.stepId} | at=${event.occurredAt.toISOString()}`,
    );
  }
}
