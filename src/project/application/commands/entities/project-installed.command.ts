import { InstalledProjectDto } from '../../../infrastructure/rest/dto/installed-project.dto';

export class InstallProjectCommand {
  constructor(public readonly dto: InstalledProjectDto) {}
}
