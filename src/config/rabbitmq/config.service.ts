import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQConfigService
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private configService: ConfigService) {}
  createModuleConfig(): RabbitMQConfig {
    return {
      connectionInitOptions: {
        wait: false,
      },
      uri: this.uri,
    };
  }

  get uri(): string {
    return this.configService.get<string>('rabbitmq.uri');
  }
}
