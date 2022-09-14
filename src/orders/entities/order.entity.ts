import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CountryEntity as Country } from '../../countries/entities/country.entity';
import { CouponEntity as Coupon } from '../../coupons/entities/coupon.entity';
import { OrderStatus } from './order.status';

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: '결제완료',
  })
  status: OrderStatus;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  deliveryFee: number;

  @Column({ default: 0, nullable: false })
  discountPrice: number;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: false })
  buyrName: string;

  @Column({ nullable: true })
  buyrCity: string;

  @Column({ nullable: false })
  buyrCountry: string;

  @Column({ nullable: true })
  buyrZipx: string;

  @Column({ nullable: false })
  vscode: string;

  @ManyToOne(() => Country, (country) => country.orders, {
    nullable: false,
  })
  country: Country;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders, {
    nullable: true,
  })
  coupon: Coupon;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  startedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => null,
  })
  endedAt: Date;
}
