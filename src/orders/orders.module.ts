import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService],
})
export class OrdersModule {}
