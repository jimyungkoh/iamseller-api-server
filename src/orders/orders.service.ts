import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service';
import { CountryEntity } from '../countries/entities/country.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './entities/order.status';
import { faker } from '@faker-js/faker';

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

  async findAll(page = 1) {
    const take = 20;

    return await this.ordersRepository
      .createQueryBuilder('order')
      .select('order.id')
      .addSelect('order.status')
      .addSelect('order.price')
      .addSelect('order.buyrName')
      .addSelect('order.buyrCountry')
      .take(take)
      .skip(take * (page - 1))
      .getMany();
  }

  async findOne(id: number) {
    const post = await this.ordersRepository.findOneBy({ id: id });

    if (!post) {
      throw new NotFoundException();
    }

    if (!post.endedAt) {
      delete post.endedAt;
    }

    return post;
  }

  async findByName(name: string, page = 1) {
    const take = 20;

    return await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.buyrName like :name', { name: `%${name}%` })
      .take(20)
      .take(take)
      .skip(take * (page - 1))
      .getMany();
  }

  async updateOrderStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    const order = await this.ordersRepository.findOneBy({ id: id });

    if (!order) {
      throw new NotFoundException();
    }

    if (!(updateOrderStatusDto.status in OrderStatus)) {
      throw new BadRequestException();
    }

    if (updateOrderStatusDto.status === OrderStatus.구매확정) {
      order.endedAt = new Date();
    }

    order.status = updateOrderStatusDto.status;

    await this.ordersRepository.save(order);

    return order;
  }
}
