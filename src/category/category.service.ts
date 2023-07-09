import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import { CreateCategoryDto } from 'src/category/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(id: number): Promise<Category | null> {
        return this.categoryRepository.findOneBy({ id });
    }

    async create(
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category | void> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    async update(
        id: number,
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category | void> {
        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        category.name = createCategoryDto.name;

        return this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }

    async getProducts(id: number): Promise<Product[] | void> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: {
                products: true,
            },
        });

        return category.products;
    }
}
