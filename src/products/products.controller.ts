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

import { ProductsService } from './products.service';
import { CreateProductDto } from './products.dto';

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/')
    index() {
        return this.productsService.findAll();
    }

    @Post('/')
    store(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get('/:id')
    show(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Patch('/:id')
    update(
        @Param('id') id: number,
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productsService.update(id, createProductDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    destroy(@Param('id') id: number) {
        this.productsService.delete(id);

        return;
    }

    @Get('/:id/category')
    getCategory(@Param('id') id: number) {
        return this.productsService.getCategory(id);
    }
}
