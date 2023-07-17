import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './orders.dto';
import { FindOneOptions} from 'typeorm';
@Injectable()
export class OrderRepository {
    [x: string]: any;
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const order = this.orderRepository.create(createOrderDto);
        return this.orderRepository.save(order);
    }

    async updateOrder(
        id: number,
        updateOrderDto: CreateOrderDto,
    ): Promise<Order> {
        const order = await this.getOrderById(id);
        Object.assign(order, updateOrderDto);
        return this.orderRepository.save(order);
    }

    async deleteOrder(id: number): Promise<void> {
        const result = await this.orderRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Order not found');
        }
    }

    async getOrder(id: number): Promise<Order> {
        const options: FindOneOptions<Order> = { where: { id } };
        return this.orderRepository.findOne(options); // Use findOne instead of findOneOrFail
    }
    
    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user') 
            .getMany();
    }
}
