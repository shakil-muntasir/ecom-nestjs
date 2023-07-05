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
import { CreateDto } from './dto/create.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('categories')
  index() {
    return this.categoryService.findAll();
  }

  @Post('categories')
  store(@Body() categoryCreate: CreateDto) {
    return this.categoryService.create(categoryCreate);
  }

  @Get('categories/:id')
  show(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch('categories/:id')
  update(@Param('id') id: number, @Body() userCreate: CreateDto, ) {
    return this.categoryService.update(id, userCreate);
  }

  @Delete('categories/:id')
  @HttpCode(204)
  destroy(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
