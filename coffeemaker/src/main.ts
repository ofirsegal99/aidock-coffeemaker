import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const RABBITMQ_ADDRESS = process.env.RABBITMQ_ADDRESS || 'app_rabbit';
const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME || 'root';
const RABBITMQ_USER_PASSWORD = process.env.RABBITMQ_USER_PASSWORD || 'root';
const RABBITMQ_PORT = parseInt(process.env.RABBITMQ_PORT) || 5672;
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'orders_queue';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_USER_PASSWORD}@${RABBITMQ_ADDRESS}:${RABBITMQ_PORT}`,
      ],
      queue: RABBITMQ_QUEUE,
      queueOptions: { durable: false },
      socketOptions: { noDelay: true },
    },
  });
  await app.startAllMicroservices();
  await app.init();
  await app.listen(5000);
}
bootstrap();
