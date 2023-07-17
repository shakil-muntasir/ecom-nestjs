import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product;

    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column('decimal')
    totalPrice: number;

     @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    updatedAt: Date;
}
