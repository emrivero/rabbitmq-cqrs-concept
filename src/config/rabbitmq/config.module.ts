import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfigService } from './config.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  providers: [ConfigService, RabbitMQConfigService],
  exports: [ConfigService, RabbitMQConfigService],
})
export class RabbitMQConfigModule {}
