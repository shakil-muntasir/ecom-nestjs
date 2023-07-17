import { Body, 
    Controller, 
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    HttpCode,
    HttpStatus,
    UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './orders.dto';
import { OrdersService } from './orders.service';
import { RoleGuard } from 'src/auth/role.guard';
import { Order } from './order.entity';
@Controller('/orders')
@UseGuards(AuthGuard)
export class OrdersController {
    [x: string]: any;
    constructor(private readonly ordersService: OrdersService) {}

    @Post('/')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee', 'customer']))
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }
    @Get('/')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    index() {
        return this.ordersService.findAll();
    }
    @Get('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee', 'customer']))
    async getOrder(@Param('id') id: number): Promise<Order> {
        return this.ordersService.getOrder(id); // Use ordersService.getOrder method
    }
    
    @Patch('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    updateOrder(
        @Param('id') id: number,
        @Body() createOrderDto: CreateOrderDto,
    ) {
        return this.ordersService.updateOrder(id, createOrderDto);
    }
    @Delete('/:id')
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteOrder(@Param('id') id: number) {
        this.ordersService.deleteOrder(id);
        return;
    }
    @Get('/:id/user') 
    @UseGuards(new RoleGuard(['admin', 'manager', 'employee']))
    getUser(@Param('id') id: number) {
        return this.ordersService.getUser(id);
    }


}
function index(arg0: any, arg1: { user: any; }, arg2: { user: any; }) {
    throw new Error('Function not implemented.');
}

