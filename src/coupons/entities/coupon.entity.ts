import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CouponType } from './coupon.type';
import { OrderEntity as Order } from '../../orders/entities/order.entity';

type CouponType = typeof CouponType[keyof typeof CouponType];

@Entity('coupon')
export class CouponEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ type: 'enum', enum: CouponType, nullable: false })
  type: CouponType;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false, default: 0 })
  use: number;

  @Column({ nullable: false })
  remains: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  expirationDate: Date;

  @OneToMany(() => Order, (order) => order.coupon, {})
  orders: Order[];
}
