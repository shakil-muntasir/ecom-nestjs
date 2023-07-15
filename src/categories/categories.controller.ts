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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';

@Controller('/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('/')
    index() {
        return this.categoriesService.findAll();
    }

    @Post('/')
    store(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get('/:id')
    show(@Param('id') id: number) {
        return this.categoriesService.findOne(id);
    }

    @Patch('/:id')
    update(
        @Param('id') id: number,
        @Body() createCategoryDto: CreateCategoryDto,
    ) {
        return this.categoriesService.update(id, createCategoryDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    destroy(@Param('id') id: number) {
        this.categoriesService.delete(id);

        return;
    }

    @Get('/:id/products')
    getCategory(@Param('id') id: number) {
        return this.categoriesService.getProducts(id);
    }
}
