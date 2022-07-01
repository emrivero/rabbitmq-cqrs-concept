import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InstallProjectCommand } from '../../../application/commands/entities/project-installed.command';
import { InstalledProjectDto } from '../dto/installed-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('install')
  async installProject(
    @Param('id') id: string,
    @Body() dto: InstalledProjectDto,
  ) {
    return this.commandBus.execute(
      new InstallProjectCommand(
        new InstalledProjectDto(dto.id, dto.name, dto.component, dto.tools),
      ),
    );
  }
}
