import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    UseGuards,
    HttpStatus,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('/categories')
@UseGuards(AuthGuard)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('/')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    index() {
        return this.categoriesService.findAll();
    }

    @Post('/')
    @UseGuards(new RoleGuard(['admin', 'manager']))
    store(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    show(@Param('id') id: number) {
        return this.categoriesService.findOne(id);
    }

    @Patch('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager']))
    update(
        @Param('id') id: number,
        @Body() createCategoryDto: CreateCategoryDto,
    ) {
        return this.categoriesService.update(id, createCategoryDto);
    }

    @Delete('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager']))
    @HttpCode(HttpStatus.NO_CONTENT)
    destroy(@Param('id') id: number) {
        this.categoriesService.delete(id);

        return;
    }

    @Get('/:id/products')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    getCategory(@Param('id') id: number) {
        return this.categoriesService.getProducts(id);
    }
}
