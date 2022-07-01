import { IEvent, IMessageSource } from '@nestjs/cqrs';
import { Subject } from 'rxjs';
import { GenericEvent } from '../event/generic.event';

export abstract class Subscriber implements IMessageSource {
  protected bridge: Subject<any>;
  abstract subscribe(): void;
  bridgeEventsTo<T extends IEvent = GenericEvent>(subject: Subject<T>) {
    this.bridge = subject;
  }
}
