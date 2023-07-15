import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { Product } from 'src/products/products.entity';
import { CreateCategoryDto } from 'src/categories/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);

        return await this.categoryRepository.save(category);
    }

    async update(
        id: number,
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        category.name = createCategoryDto.name;

        return await this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<DeleteResult> {
        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return await this.categoryRepository.delete(category.id);
    }

    async getProducts(id: number): Promise<Product[]> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: {
                products: true,
            },
        });

        return category.products;
    }
}
