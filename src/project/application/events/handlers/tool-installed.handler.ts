import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ToolInstalledEvent } from '../entities/tool-installed.event';

@EventsHandler(ToolInstalledEvent)
export class ToolInstalledHandler implements IEventHandler<ToolInstalledEvent> {
  handle(event: ToolInstalledEvent) {
    console.log('[EventHandler] - Installed Tool:', JSON.stringify(event));
  }
}
