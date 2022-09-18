import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { createOrderDto } from './order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('order_history')
  findOrderMonthYear(
    @Query('month') month: number,
    @Query('year') year: number,
  ): Promise<Order[]> {
    return this.orderService.findOrderMonthYear(month, year);
  }

  @Get('histogram')
  getAllOrdersGroupedByName(): Promise<Order[]> {
    return this.orderService.getAllOrdersGroupedByName();
  }

  @Get('waiting_list')
  getUnsuppliedOrders(): Promise<Order[]> {
    return this.orderService.findUnsuppliedOrders();
  }

  @Post('new_order')
  async create(@Body() orderDto: createOrderDto) {
    return this.orderService.create(orderDto);
  }
}
