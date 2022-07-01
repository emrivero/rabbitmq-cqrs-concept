import { AggregateRoot } from '@nestjs/cqrs';
import { ToolInstalledEvent } from '../../application/events/entities/tool-installed.event';

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
      this.apply(new ToolInstalledEvent(nameTool, this.name));
    });
  }
}
