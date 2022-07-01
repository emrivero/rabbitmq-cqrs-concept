import { Injectable } from '@nestjs/common';
import { AnotherRandomEvent } from '../../../../application/events/entities/another-random.event';
import { AnotherRandomEventID } from '../../../../application/events/identifiers';
import { RabbitMQMessage } from './rbmq.message';

@Injectable()
export class AnotherRandomMessage extends RabbitMQMessage<AnotherRandomEvent> {
  constructor() {
    super(
      AnotherRandomEventID,
      'events.another',
      'events',
      'events.another',
      (args: { payload: string }) => new AnotherRandomEvent(args.payload),
    );
  }
}
