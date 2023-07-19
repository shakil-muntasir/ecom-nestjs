import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/orders.entity';
import { OrdersController } from 'src/orders/orders.controller';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/products.entity';
import { Discount } from './discounts.entity';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Discount,Order, Product])],
  controllers: [DiscountsController],
  providers: [ DiscountsService,OrdersService, ProductsService],
})
export class DiscountModule {}