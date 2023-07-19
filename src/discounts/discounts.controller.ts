import { Controller, Post, Body, HttpStatus, HttpException, Param, Delete, Patch, Get } from '@nestjs/common';
import { CreateDiscountDto } from './discounts.dto';
import { DiscountsService } from './discounts.service';
import { Discount} from './discounts.entity';

@Controller('/discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post('/')
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto): Promise<Discount> {
    try {
      const discount = await this.discountsService.create(createDiscountDto);
      return discount;
    } catch (error) {
     
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/')
  async findAll(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Discount> {
    return this.discountsService.findOneBy(id);
  }
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() updateDiscountDto: CreateDiscountDto): Promise<Discount> {
    return this.discountsService.update(id, updateDiscountDto);
  }
  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<Discount> {
    return this.discountsService.remove(id);
  }
}
