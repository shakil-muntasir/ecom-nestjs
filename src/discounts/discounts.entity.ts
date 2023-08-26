import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from 'src/products/products.entity';

@Entity('discounts')
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    percentage: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    discount: number;

    @Column()
    productId: number;

    @OneToMany(() => Discount, (discount) => discount.products)
    products: Product[];
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  }