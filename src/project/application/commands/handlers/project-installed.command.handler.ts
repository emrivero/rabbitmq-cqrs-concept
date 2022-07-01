import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InstallProjectCommand } from '../entities/project-installed.command';

@CommandHandler(InstallProjectCommand)
export class InstallProjectCommandHandler
  implements ICommandHandler<InstallProjectCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: InstallProjectCommand) {
    const { dto } = command;
    console.log(
      '[ProjectCommandHandler] - InstallProjectCommand...',
      JSON.stringify(dto),
    );
    const project = this.publisher.mergeObjectContext(dto.toEntity());
    project.install();
    project.commit();
  }
}
