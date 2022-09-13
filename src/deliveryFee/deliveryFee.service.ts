import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryFeeEntity } from './entities/deliveryFee.entity';
import { Repository } from 'typeorm';
import { CountryEntity } from '../countries/entities/country.entity';

@Injectable()
export class DeliveryFeeService {
  constructor(
    @InjectRepository(DeliveryFeeEntity)
    private deliveryRepository: Repository<DeliveryFeeEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>
  ) {}

  async getDeliveryFee(country: CountryEntity, quantity: number) {
    const delivery = await this.deliveryRepository.findOne({
      relations: ['country'],
      where: { country: country, quantity: quantity },
    });

    if (!delivery) {
      throw new NotFoundException(
        'The requested URL was not found on this server.'
      );
    }

    return delivery.fee;
  }
}
