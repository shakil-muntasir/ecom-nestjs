import { IsArray, IsBoolean, IsNumber, IsEmail, IsString} from 'class-validator';
import { ManyToOne } from 'typeorm';
export interface OrderedProduct {
    id: number;
    quantity: number;
  }
  
  export type DeliveryOption = 'shop pickup' | 'home delivery';
  
  export class CreateOrderDto {
    [x: string]: any;
    
    userId: number;
    orderedProducts: OrderedProduct[]
    deliveryOption: DeliveryOption
    address: string
    phone: string
    isDelivered: boolean;
    
}
