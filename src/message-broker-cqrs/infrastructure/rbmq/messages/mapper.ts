import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQMessage } from './rbmq.message';

@Injectable()
export class MessageMapper {
  constructor(
    @Inject('RBMQ_MESSAGES')
    private readonly messages: Array<RabbitMQMessage>,
  ) {}
  public map(id: string): RabbitMQMessage {
    const eventMapping = this.messages.find((event) => event.id === id);
    return eventMapping;
  }
}
