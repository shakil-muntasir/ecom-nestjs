import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from 'src/products/products.entity';



@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('decimal')
  totalPrice: number;

  @Column()
  deliveryOption: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ type: 'json', nullable: true })
  orderedProducts: any[];

  @Column({ default: false }) 
  isDelivered: boolean;

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

