import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CountryEntity as Country } from '../../countries/entities/country.entity';

export type OrderStatus =
  | '결제완료'
  | '결제취소'
  | '배송중'
  | '배송완료'
  | '구매확정'
  | '교환'
  | '환불';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      '결제완료',
      '결제취소',
      '배송중',
      '배송완료',
      '구매확정',
      '교환',
      '환불',
    ],
    default: '결제완료',
  })
  status: OrderStatus;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  buyrCity: string;

  @Column({ nullable: false })
  buyrCounty: string;

  @Column({ nullable: false })
  buyrZipx: string;

  @Column({ nullable: false })
  vscode: string;

  @ManyToOne(() => Country, (country) => country.deliveryFee, {
    nullable: false,
  })
  country: Country;

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
