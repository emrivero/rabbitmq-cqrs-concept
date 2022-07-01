import { Injectable } from '@nestjs/common';
import { ToolInstalledEvent } from '../../../../application/events/entities/tool-installed.event';
import { ToolInstalledEventID } from '../../../../application/events/identifiers';
import { RabbitMQMessage } from './rbmq.message';

@Injectable()
export class ToolInstalledMessage extends RabbitMQMessage<ToolInstalledEvent> {
  constructor() {
    super(
      ToolInstalledEventID,
      'events.default',
      'events',
      'events.*',
      (args: { projectName: string; environmentName: string }) =>
        new ToolInstalledEvent(args.projectName, args.environmentName),
    );
  }
}
