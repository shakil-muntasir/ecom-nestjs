import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Category } from 'src/categories/categories.entity';
import { CreateProductDto } from 'src/products/products.dto';

@Injectable()
export class ProductsService {
    findOneBy: any;
    static id: any;
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product | void> {
        const category = this.productRepository.create(createProductDto);
        return await this.productRepository.save(category);
    }

    async update(
        id: number,
        createProductDto: CreateProductDto,
    ): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        product.name = createProductDto.name;
        product.price = createProductDto.price;
        product.quantity = createProductDto.quantity;
        product.description = createProductDto.description;
        product.image = createProductDto.image;
        product.categoryId = createProductDto.categoryId;

        return await this.productRepository.save(product);
    }

    async delete(id: number): Promise<DeleteResult> {
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return await this.productRepository.delete(id);
    }

    async getCategory(id: number): Promise<Category> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });

        return product.category;
    }
}
