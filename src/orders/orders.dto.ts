import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsEmail,
    IsString,
    IsNotEmpty,
} from 'class-validator';
import { ManyToOne } from 'typeorm';
export interface OrderedProduct {
    id: number;
    quantity: number;
    discount: boolean;
}

export type DeliveryOption = 'shop pickup' | 'home delivery';

export class CreateOrderDto {
    [x: string]: any;

    userId: number;
    orderedProducts: OrderedProduct[];
    deliveryOption: DeliveryOption;
    totalPrice: number;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;
    isDelivered: boolean;
}
