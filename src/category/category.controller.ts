import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@Controller('/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('/')
    index() {
        return this.categoryService.findAll();
    }

    @Post('/')
    store(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get('/:id')
    show(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Patch('/:id')
    update(
        @Param('id') id: number,
        @Body() createCategoryDto: CreateCategoryDto,
    ) {
        return this.categoryService.update(id, createCategoryDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    destroy(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }

    @Get('/:id/products')
    getCategory(@Param('id') id: number) {
        return this.categoryService.getProducts(id);
    }
}
