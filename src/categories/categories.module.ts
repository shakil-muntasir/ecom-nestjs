import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from 'src/categories/categories.controller';
import { Category } from 'src/categories/categories.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
