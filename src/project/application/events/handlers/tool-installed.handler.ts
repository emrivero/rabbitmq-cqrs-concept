import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import chalk from 'chalk';
import { ToolInstalledEvent } from '../../../../message-broker-cqrs/application/events/tool-installed.event';

@EventsHandler(ToolInstalledEvent)
export class ToolInstalledHandler implements IEventHandler<ToolInstalledEvent> {
  handle(event: ToolInstalledEvent) {
    console.log(
      chalk.bgBlue('[EventHandler] - Installed Tool:', JSON.stringify(event)),
    );
  }
}
