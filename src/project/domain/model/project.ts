import { AggregateRoot } from '@nestjs/cqrs';
import { ToolInstalledEvent } from '../../../message-broker-cqrs/application/events/tool-installed.event';

export class Project extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly component: string,
    public readonly tools: string[],
  ) {
    super();
  }

  install() {
    this.tools.forEach((nameTool) => {
      // TODO: Domain -> message-broker-cqrs/application/events ??
      this.apply(new ToolInstalledEvent(nameTool, this.name));
    });
  }
}
