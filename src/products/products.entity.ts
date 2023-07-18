import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToMany
} from 'typeorm';
import { Category } from 'src/categories/categories.entity';
// import { Order } from 'src/orders/order.entity';
@Entity()
export class Product {
    [x: string]: any;
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

