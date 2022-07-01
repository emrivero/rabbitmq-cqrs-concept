import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Connection } from '../../domain/model/connection.abstract';
import { Publisher } from '../../domain/model/publisher.abstract';
import { Subscriber } from '../../domain/model/subscriber.abstract';

@Injectable()
export class RabbitMQConnection extends Connection {
  constructor(
    private readonly subscriber: Subscriber,
    private readonly eventBus: EventBus,
    private readonly publisher: Publisher,
  ) {
    super();
    this.subscriber.subscribe();
    this.subscriber.bridgeEventsTo(this.eventBus.subject$);
    this.publisher.connect();
    this.eventBus.publisher = this.publisher;
  }
}
