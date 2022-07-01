import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageBrokerCQRS } from './message-broker-cqrs/message-broker-cqrs.module';
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
    MessageBrokerCQRS,
    ProjectModule,
  ],
})
export class ApplicationModule {}
