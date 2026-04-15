import type { DomainEvent } from "../../domain/events/domain-event.js";
import type { DomainEventHandler } from "../../domain/events/domain-event-handler.js";

type EventHandlerMap = Map<string, DomainEventHandler[]>;

export class InMemoryEventBus {
  private readonly handlers: EventHandlerMap = new Map();

  subscribe(eventName: string, handler: DomainEventHandler): void {
    const existingHandlers = this.handlers.get(eventName) ?? [];

    existingHandlers.push(handler);
    this.handlers.set(eventName, existingHandlers);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const handlers = this.handlers.get(event.name) ?? [];

      for (const handler of handlers) {
        await handler.handle(event);
      }
    }
  }
}
