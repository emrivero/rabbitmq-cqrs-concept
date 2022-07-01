import { Project } from '../../../domain/model/project';

export class InstalledProjectDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly component: string,
    public readonly tools: string[],
  ) {}

  toEntity() {
    return new Project(this.id, this.name, this.component, this.tools);
  }
}
