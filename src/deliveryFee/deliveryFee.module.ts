import { Module } from '@nestjs/common';
import { DeliveryFeeService } from './deliveryFee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryFeeEntity } from './entities/deliveryFee.entity';
import { CountryEntity } from '../countries/entities/country.entity';

@Module({
  providers: [DeliveryFeeService],
  imports: [TypeOrmModule.forFeature([DeliveryFeeEntity, CountryEntity])],
})
export class DeliveryFeeModule {}
