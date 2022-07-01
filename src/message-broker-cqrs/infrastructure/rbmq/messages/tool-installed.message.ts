import { Injectable } from '@nestjs/common';
import { ToolInstalledEvent } from '../../../application/events/tool-installed.event';
import { ToolInstalledEventID } from '../../../application/identifiers';
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
