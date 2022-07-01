import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { GenericEvent } from '../event/generic.event';

export abstract class Publisher implements IEventPublisher {
  abstract connect(): void;
  abstract publish<T extends IEvent = GenericEvent>(event: T);
}
