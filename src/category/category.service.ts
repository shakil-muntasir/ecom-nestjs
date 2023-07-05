import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { CreateDto } from 'src/category/dto/create.dto';

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

  async create(categoryCreate: CreateDto): Promise<Category | void> {
    const category = this.categoryRepository.create(categoryCreate);
    return this.categoryRepository.save(category);
  }

  async update(id: number, categoryCreate: CreateDto): Promise<Category | void> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = categoryCreate.name;

    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
