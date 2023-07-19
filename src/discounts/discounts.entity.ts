import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/products/products.entity';

@Entity()
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;
   
    @ManyToOne(() => Product, (product) => product.discounts)
    @Column()
    productId: number;
  
    @Column()
    percentage: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    discount: number;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  }