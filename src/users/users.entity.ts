import { Exclude } from 'class-transformer';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/order.entity';
export type Role = 'admin' | 'manager' | 'employee' | 'customer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column('text', { array: true, nullable: true })
    roles: Role[];

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

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
    
}
