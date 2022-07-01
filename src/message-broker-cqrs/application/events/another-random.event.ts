import { GenericEvent } from '../../domain/event/generic.event';
import { AnotherRandomEventID } from '../identifiers';

export class AnotherRandomEvent extends GenericEvent {
  constructor(public readonly payload: string) {
    super(AnotherRandomEventID);
  }
}
