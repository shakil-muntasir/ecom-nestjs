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
import { CreateDto } from './dto/create.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  index() {
    return this.productService.findAll();
  }

  @Post('products')
  store(@Body() productCreate: CreateDto) {
    return this.productService.create(productCreate);
  }

  @Get('products/:id')
  show(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch('products/:id')
  update(@Param('id') id: number, @Body() productCreate: CreateDto, ) {
    return this.productService.update(id, productCreate);
  }

  @Delete('products/:id')
  @HttpCode(204)
  destroy(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Get('products/:id/category')
  getCategory(@Param('id') id: number) {
    
    return this.productService.getCategory(id);
  }
}
