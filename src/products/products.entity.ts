import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { Discount } from 'src/discounts/discounts.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    image: string;

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToOne(() => Discount, (discount) => discount.products)
    discount: Discount;

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
