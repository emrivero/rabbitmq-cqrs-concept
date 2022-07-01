import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Connection } from './project/domain/messaging/connection.abstract';
import { Publisher } from './project/domain/messaging/publisher.abstract';
import { Subscriber } from './project/domain/messaging/subscriber.abstract';
import { RBMQ_MESSAGES } from './project/infrastructure/messaging/rbmq/messages';
import { MessageMapper } from './project/infrastructure/messaging/rbmq/messages/mapper';
import { RabbitMQConnection } from './project/infrastructure/messaging/rbmq/rbmq-connection';
import { RabbitMQPublisher } from './project/infrastructure/messaging/rbmq/rbmq-publisher';
import { RabbitMQSubscriber } from './project/infrastructure/messaging/rbmq/rbmq-subscriber';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    CqrsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      // useClass: RabbitMQConfigService,
      // imports: [RabbitMQModule],
      uri: 'amqp://admin:admin@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
    ProjectModule,
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
export class ApplicationModule {}
