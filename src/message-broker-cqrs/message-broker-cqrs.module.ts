import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Connection } from './domain/model/connection.abstract';
import { Publisher } from './domain/model/publisher.abstract';
import { Subscriber } from './domain/model/subscriber.abstract';
import { RBMQ_MESSAGES } from './infrastructure/rbmq/messages';
import { MessageMapper } from './infrastructure/rbmq/messages/mapper';
import { RabbitMQConnection } from './infrastructure/rbmq/rbmq-connection';
import { RabbitMQPublisher } from './infrastructure/rbmq/rbmq-publisher';
import { RabbitMQSubscriber } from './infrastructure/rbmq/rbmq-subscriber';

@Module({
  imports: [
    CqrsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      // useClass: RabbitMQConfigService,
      // imports: [RabbitMQModule],
      uri: 'amqp://admin:admin@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [
    {
      provide: Connection,
      useClass: RabbitMQConnection,
    },
    {
      provide: Subscriber,
      useClass: RabbitMQSubscriber,
    },
    {
      provide: Publisher,
      useClass: RabbitMQPublisher,
    },
    {
      provide: 'RBMQ_MESSAGES',
      useValue: RBMQ_MESSAGES,
    },
    MessageMapper,
  ],
})
export class MessageBrokerCQRS {}
