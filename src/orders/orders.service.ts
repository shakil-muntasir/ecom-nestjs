import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions} from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './orders.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
    [x: string]: any;
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async createOrder(orderDto: CreateOrderDto) {
        const order = this.orderRepository.create(orderDto);
        return this.orderRepository.save(order);
    }
    async findAll() : Promise<Order[]> {
        return this.orderRepository.find();
    }
    async getOrderById(id: number): Promise<Order> {
        const options: FindOneOptions<Order> = {
            where: { id: id },
        };
        return this.orderRepository.findOneOrFail(options);
    }
    async getOrder(id: number): Promise<Order> {
        const options: FindOneOptions<Order> = { where: { id } };
        return this.orderRepository.findOne(options);
    }
    async updateOrder(id: number, orderDto: CreateOrderDto) {
        const order = await this.getOrderById(id);
        const updatedOrder = Object.assign(order, orderDto);
        return this.orderRepository.save(updatedOrder);
    }
    async deleteOrder(id: number) {
        const order = await this.getOrderById(id);
        return this.orderRepository.remove(order);
    }

}
