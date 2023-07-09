import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { Category } from 'src/category/category.entity';
import { CreateProductDto } from 'src/product/product.dto';

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

    async create(createProductDto: CreateProductDto): Promise<Product | void> {
        const category = this.productRepository.create(createProductDto);
        return this.productRepository.save(category);
    }

    async update(
        id: number,
        createProductDto: CreateProductDto,
    ): Promise<Product | void> {
        const category = await this.productRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Product not found');
        }

        category.name = createProductDto.name;
        category.price = createProductDto.price;
        category.quantity = createProductDto.quantity;
        category.image = createProductDto.image;
        category.categoryId = createProductDto.categoryId;

        return this.productRepository.save(category);
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

    async getCategory(id: number): Promise<Category | void> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });

        return product.category;
    }
}
