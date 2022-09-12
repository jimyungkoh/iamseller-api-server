import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountryEntity as Country } from '../../countries/entities/country.entity';

@Entity('delivery_fee')
export class DeliveryFeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  fee: number;

  @ManyToOne(() => Country, (country) => country.deliveryFee, {
    nullable: false,
  })
  country: Country;
}
