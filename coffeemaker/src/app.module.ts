import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';

const DB_HOSTNAME = process.env.DB_HOSTNAME || 'app_db';
const DB_NAME = process.env.DB_NAME || 'coffe_maker';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_PORT = parseInt(process.env.DB_PORT) || 5432;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOSTNAME,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      entities: [Order],
      synchronize: true,
    }),
    OrderModule,
  ],
})
export class AppModule {}
