import { GenericEvent } from '../../../domain/messaging/generic.event';
import { ToolInstalledEventID } from '../identifiers';

export class ToolInstalledEvent extends GenericEvent {
  constructor(
    public readonly projectName: string,
    public readonly environmentName: string,
  ) {
    super(ToolInstalledEventID);
  }
}
