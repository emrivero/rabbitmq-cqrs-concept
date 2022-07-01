import { AmqpConnection, Nack } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { GenericEvent } from '../../../domain/messaging/generic.event';
import { Subscriber } from '../../../domain/messaging/subscriber.abstract';
import { MessageMapper } from './messages/mapper';
import { RabbitMQMessage } from './messages/rbmq.message';

@Injectable()
export class RabbitMQSubscriber extends Subscriber {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject('RBMQ_MESSAGES')
    private readonly messages: Array<RabbitMQMessage>,
    private messageMapper: MessageMapper,
  ) {
    super();
  }

  subscribe() {
    this.messages.forEach((rbmqMessage) => {
      this.amqpConnection.createSubscriber<string>(
        async (msg) => {
          console.log(`[Listen RabbitMQ Message] ${msg}`);
          if (this.bridge) {
            const eventMsg = JSON.parse(msg);
            const genericEvent = eventMsg as GenericEvent;
            const rabbitMessage = this.messageMapper.map(genericEvent.id);
            const event = rabbitMessage.eventConstructor(eventMsg);
            console.log(`[Pass event to event handler]`, msg);
            this.bridge.next(event);
            return new Nack(false);
          }
        },
        {
          errorHandler: (channel, msg, e) => {
            throw e;
          },
          allowNonJsonMessages: true,
          queue: rbmqMessage.queue,
        },
        `handler_${rbmqMessage.queue}`,
      );
    });
  }
}
