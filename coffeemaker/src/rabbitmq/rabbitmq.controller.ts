import { Controller, Post, Body } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RmqRecordBuilder,
  Transport,
} from '@nestjs/microservices';
import { createOrderDto } from '../order/order.dto';
import { OrderService } from '../order/order.service';

const RABBITMQ_ADDRESS = process.env.RABBITMQ_ADDRESS || 'app_rabbit';
const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME || 'root';
const RABBITMQ_USER_PASSWORD = process.env.RABBITMQ_USER_PASSWORD || 'root';
const RABBITMQ_PORT = parseInt(process.env.RABBITMQ_PORT) || 5672;
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'orders_queue';

@Controller()
export class RabbitmqController {
  client: ClientProxy;

  constructor(private readonly orderService: OrderService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_USER_PASSWORD}@${RABBITMQ_ADDRESS}:${RABBITMQ_PORT}`,
        ],
        queue: RABBITMQ_QUEUE,
        noAck: false,
        queueOptions: { durable: false },
        socketOptions: { noDelay: true },
      },
    });
  }

  @Post('new_rabbit_order')
  create(@Body() orderDto: createOrderDto) {
    try {
      let orderPriority = 0;
      if (orderDto.position.toLowerCase() == 'boss') {
        console.log("Boss's drink detected, setting priority to 100");
        orderPriority = 100;
      }
      const record = new RmqRecordBuilder(orderDto)
        .setOptions({
          priority: orderPriority,
        })
        .build();
      return this.client.send('new_order', record);
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern('new_order')
  save(data: createOrderDto) {
    return this.orderService.create(data);
  }
}
