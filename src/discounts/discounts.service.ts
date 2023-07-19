import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './discounts.entity'; // Update the import path
import { CreateDiscountDto } from './discounts.dto';
import { ProductsService } from '../products/products.service'; // Update the import path
import { Product } from '../products/products.entity'; // Update the import path
import { OrdersService } from '../orders/orders.service'; // Update the import path
import { Order } from '../orders/orders.entity'; // Update the import path
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
    private readonly productService: ProductsService,
    private readonly orderService: OrdersService,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const { ProductId, percentage } = createDiscountDto;
    const product = await this.productService.findOne(ProductId);
    if (!product) {
      throw new NotFoundException(`Product with id ${ProductId} not found`);
    }
    const discount = (percentage / 100) * product.price;

    const newDiscount = this.discountRepository.create({
      productId: product.id,
      percentage,
      discount,
    });
    const savedDiscount = await this.discountRepository.save(newDiscount);

    return savedDiscount;
  }
   async findAll(): Promise<Discount[]> {
    return this.discountRepository.find();
   }
    async findOneBy(id: number): Promise<Discount> {
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) {
      throw new NotFoundException(`Discount with id ${id} not found`);
    }
    return discount;
  }
  async update(id: number, updateDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discount = await this.findOneBy(id);
    const updatedDiscount = {
      ...discount,
      ...updateDiscountDto,
    };
    return this.discountRepository.save(updatedDiscount);
  }
  async remove(id: number): Promise<Discount> {
    const discount = await this.findOneBy(id);
    return this.discountRepository.remove(discount);
  }

}
