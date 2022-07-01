import { AmqpConnection, Nack } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import chalk from 'chalk';
import { GenericEvent } from '../../domain/event/generic.event';
import { Subscriber } from '../../domain/model/subscriber.abstract';
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
          console.log(chalk.blue(`[Listen RabbitMQ Message] ${msg}`));
          if (this.bridge) {
            const eventMsg = JSON.parse(msg);
            const genericEvent = eventMsg as GenericEvent;
            const rabbitMessage = this.messageMapper.map(genericEvent.id);
            const event = rabbitMessage.eventConstructor(eventMsg);
            console.log(
              chalk.yellowBright(`[Pass event to event handler] - ${msg}`),
            );
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
