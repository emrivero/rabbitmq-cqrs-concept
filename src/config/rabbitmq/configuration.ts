import { registerAs } from '@nestjs/config';
export default registerAs('rabbitmq', () => ({
  uri: `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_USER}@localhost:5672`,
}));
