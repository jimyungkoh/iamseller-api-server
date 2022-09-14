import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocalDate } from '@js-joda/core';

@Entity('currency')
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  dollar: number;

  @Column({ nullable: false })
  won: number;

  @Column({ type: 'date' })
  date: string;
}
