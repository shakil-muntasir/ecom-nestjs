import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { Category } from 'src/category/category.entity';
import { CreateDto } from 'src/product/dto/create.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async create(productCreate: CreateDto): Promise<Product | void> {
    const category = this.productRepository.create(productCreate);
    return this.productRepository.save(category);
  }

  async update(id: number, productCreate: CreateDto): Promise<Product | void> {
    const category = await this.productRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Product not found');
    }

    category.name = productCreate.name;
    category.price = productCreate.price;
    category.quantity = productCreate.quantity;
    category.image = productCreate.image;
    category.categoryId = productCreate.categoryId;

    return this.productRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getCategory(id: number): Promise<Category | void> {
    const product = await this.productRepository.findOneBy({ id });
    return product.category;
  }
}
