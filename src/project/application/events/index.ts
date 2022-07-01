import { AnotherRandomEvent } from './entities/another-random.event';
import { ToolInstalledEvent } from './entities/tool-installed.event';
import { ToolInstalledHandler } from './handlers/tool-installed.handler';

export const EventsConsumed = [ToolInstalledEvent];

export const EventsProduced = [ToolInstalledEvent, AnotherRandomEvent];

export const EventsHandlers = [ToolInstalledHandler];
