import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from 'src/category/category.controller';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
