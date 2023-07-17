import { IsInt, IsNumber, IsString, Min } from 'class-validator';
import { User } from 'src/users/users.entity';
import { ManyToOne } from 'typeorm';

export class CreateOrderDto {
    @IsInt()
    productId: number;

    @IsString()
    productName: string;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsNumber()
    totalPrice: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}
