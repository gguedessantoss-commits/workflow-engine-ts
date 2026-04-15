import type { DomainEvent } from "./domain-event.js";

export interface DomainEventHandler<T extends DomainEvent = DomainEvent> {
  handle(event: T): Promise<void> | void;
}
