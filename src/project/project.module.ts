import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './application/commands/handlers';
import { EventsHandlers } from './application/events';
import { ProjectController } from './infrastructure/rest/controllers/project.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ProjectController],
  providers: [...EventsHandlers, ...CommandHandlers],
})
export class ProjectModule {}
