import { GenericEvent } from '../../../../domain/messaging/generic.event';

export class RabbitMQMessage<T extends GenericEvent = GenericEvent> {
  constructor(
    public readonly id: string,
    public readonly queue: string,
    public readonly exchange: string,
    public readonly routingKey: string,
    public readonly eventConstructor: (args: { [k: string]: any }) => T,
  ) {}
}
