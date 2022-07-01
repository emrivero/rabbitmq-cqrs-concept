import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import chalk from 'chalk';
import { GenericEvent } from '../../domain/event/generic.event';
import { Publisher } from '../../domain/model/publisher.abstract';
import { MessageMapper } from './messages/mapper';

@Injectable()
export class RabbitMQPublisher extends Publisher {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private messageMapper: MessageMapper,
  ) {
    super();
  }

  connect(): void {}

  publish(event: unknown) {
    const eventInstance = event as GenericEvent;
    const message = this.messageMapper.map(eventInstance.id);
    console.log(
      chalk.green(
        `[Publish RabbitMQ Message] ${JSON.stringify(eventInstance)}`,
      ),
    );
    console.log('...........');
    this.amqpConnection.publish(
      message.exchange,
      '',
      JSON.stringify(eventInstance),
    );
  }
}
