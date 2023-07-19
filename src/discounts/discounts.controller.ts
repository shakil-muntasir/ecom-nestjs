import { Controller, Post, Body, HttpStatus, HttpException, Param, Delete, Patch, Get, UseGuards } from '@nestjs/common';
import { CreateDiscountDto } from './discounts.dto';
import { DiscountsService } from './discounts.service';
import { Discount} from './discounts.entity';
import { User } from 'src/users/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('/discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post('/')
  @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto): Promise<Discount> {
    try {
      const discount = await this.discountsService.create(createDiscountDto);
      return discount;
    } catch (error) {
     
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/')
  @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
  async findAll(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }
  @Get('/:id')
  @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
  async findOne(@Param('id') id: number): Promise<Discount> {
    return this.discountsService.findOneBy(id);
  }

  @Patch('/:id')
  @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
  async update(@Param('id') id: number, @Body() updateDiscountDto: CreateDiscountDto): Promise<Discount> {
    return this.discountsService.update(id, updateDiscountDto);
  }
  @Delete('/:id')
  @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
  async remove(@Param('id') id: number): Promise<Discount> {
    return this.discountsService.remove(id);
  }
}
