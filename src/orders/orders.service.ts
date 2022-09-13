import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service';
import { CountryEntity } from '../countries/entities/country.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
    @Inject(DeliveryFeeService)
    private deliveryFeeService: DeliveryFeeService
  ) {}

  async findAll(page = 1) {
    const take = 20;

    return await this.ordersRepository
      .createQueryBuilder('order')
      .select('order.id')
      .addSelect('order.status')
      .addSelect('order.price')
      .addSelect('order.buyrCountry')
      .take(take)
      .skip(take * (page - 1))
      .getMany();
  }

  async create(
    createOrderDto: CreateOrderDto
  ): Promise<CreateOrderDto | undefined> {
    const country = await this.countryRepository.findOneBy({
      countryCode: createOrderDto.buyrCountry,
    });

    console.log(country.id);

    const deliveryFee = await this.deliveryFeeService.getDeliveryFee(
      country,
      createOrderDto.quantity
    );

    console.log(deliveryFee);

    return createOrderDto;
  }
}
