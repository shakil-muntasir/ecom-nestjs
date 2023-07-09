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

import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';

@Controller('/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/')
    index() {
        return this.productService.findAll();
    }

    @Post('/')
    store(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get('/:id')
    show(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Patch('/:id')
    update(
        @Param('id') id: number,
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productService.update(id, createProductDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    destroy(@Param('id') id: number) {
        return this.productService.delete(id);
    }

    @Get('/:id/category')
    getCategory(@Param('id') id: number) {
        return this.productService.getCategory(id);
    }
}
