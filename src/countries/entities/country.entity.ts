import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryFeeEntity as DeliveryFee } from '../../deliveryFee/entities/deliveryFee.entity';
import { OrderEntity as Order } from '../../orders/entities/order.entity';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  countryCode: string;

  @Column({ nullable: false })
  countryDcode: string;

  @Column({ nullable: false, unique: true })
  countryName: string;

  @OneToMany(() => DeliveryFee, (deliveryFee) => deliveryFee.country, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deliveryFee: DeliveryFee[];

  @OneToMany(() => Order, (order) => order.country, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Order[];
}
