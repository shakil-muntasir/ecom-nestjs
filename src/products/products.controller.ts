import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './products.dto';
import { AuthGuard, SkipAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('/products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/')
    @SkipAuthGuard()
    index() {
        return this.productsService.findAll();
    }

    @Post('/')
    @UseGuards(new RoleGuard(['admin', 'manager']))
    store(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    show(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Patch('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager']))
    update(
        @Param('id') id: number,
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productsService.update(id, createProductDto);
    }

    @Delete('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager']))
    @HttpCode(HttpStatus.NO_CONTENT)
    destroy(@Param('id') id: number) {
        this.productsService.delete(id);

        return;
    }

    @Get('/:id/category')
    getCategory(@Param('id') id: number) {
        return this.productsService.getCategory(id);
    }
}
