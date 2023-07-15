import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { ProductsController } from 'src/products/products.controller';
import { ProductsService } from 'src/products/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
