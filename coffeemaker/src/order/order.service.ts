/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { createOrderDto } from './order.dto';
import { Order } from './order.entity';
const schedule = require('node-schedule');

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    console.log('Recovering scheduled orders from the Database');
    this.findUnsuppliedOrders().then((orders) => {
      if (orders.length == 0) {
        console.log('No orders to recover, skipping...');
      } else {
        console.log(`Recovering ${orders.length} orders:`);
        orders.map((order) => {
          this.scheduleSupply(order);
        });
      }
    });
  }

  findOrderMonthYear(month: number, year: number): Promise<Order[]> {
    const start = new Date(year, month);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    return this.orderRepository.find({
      where: {
        time: Between(start.toISOString(), end.toISOString()),
      },
    });
  }

  findUnsuppliedOrders(): Promise<Order[]> {
    const now = new Date(Date.now()).toISOString();
    return this.orderRepository.find({
      where: {
        time: MoreThan(now),
        isSupplied: false,
      },
    });
  }

  getAllOrdersGroupedByName(): Promise<Order[]> {
    console.log('Called getAllOrdersGroupedByName');
    return this.orderRepository
      .createQueryBuilder()
      .select('name, COUNT(*)')
      .groupBy('name')
      .orderBy('COUNT(*)', 'DESC')
      .execute();
  }

  create(orderDto: createOrderDto) {
    const order = new Order();
    order.drink = orderDto.drink;
    order.name = orderDto.name;
    order.position = orderDto.position;
    order.time = new Date(orderDto.time).toISOString();
    order.isSupplied = false;

    return this.orderRepository.save(order).then((val) => {
      return this.scheduleSupply(val);
    });
  }

  scheduleSupply(order: Order) {
    console.log(`Creating a schedule at ${order.time} for ${order.id}`);
    schedule.scheduleJob(
      order.time,
      function (repo) {
        console.log(
          `in ${order.time} task, changing ${order.id} to supplied: true`,
        );
        order.isSupplied = true;
        repo.update(order.id, order);
      }.bind(null, this.orderRepository),
    );
    return order;
  }
}
