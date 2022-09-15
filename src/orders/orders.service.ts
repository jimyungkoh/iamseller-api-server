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
import { CurrencyService } from '../currency/currency.service';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
    @Inject(DeliveryFeeService)
    private deliveryFeeService: DeliveryFeeService,
    @Inject(CurrencyService)
    private currencyService: CurrencyService,
    @Inject(CouponsService)
    private couponService: CouponsService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto> {
    const country = await this.countryRepository.findOneBy({
      countryCode: createOrderDto.buyrCountry,
    });

    if (!country) {
      throw new NotFoundException(
        `country ${createOrderDto.country} doesn't exist in countries`
      );
    }

    createOrderDto.country = country;

    let deliveryFee = await this.deliveryFeeService.getDeliveryFee(
      country,
      createOrderDto.quantity
    );

    if (createOrderDto.buyrCountry !== 'KR') {
      deliveryFee = await this.currencyService.exchangeToDollar(deliveryFee);
    }

    createOrderDto.deliveryFee = deliveryFee;

    let coupon;

    if (!!createOrderDto.couponCode) {
      coupon = await this.couponService.findOneByCode(
        createOrderDto.couponCode
      );

      const discountPrice = await this.couponService.getDiscountPrice(
        coupon,
        createOrderDto
      );

      delete createOrderDto.couponCode;
      createOrderDto.coupon = coupon;
      createOrderDto.discountPrice = discountPrice;
    }

    createOrderDto.total =
      createOrderDto.price +
      createOrderDto.deliveryFee -
      createOrderDto.discountPrice;

    await this.ordersRepository.save(createOrderDto);

    if (!!coupon) {
      await this.couponService.updateCouponQuantities(coupon);
    }

    return createOrderDto;
  }

  async findAll(page = 1) {
    const take = 20;

    return await this.ordersRepository
      .createQueryBuilder('order')
      .select('order.id')
      .addSelect('order.status')
      .addSelect('order.total')
      .addSelect('order.buyrName')
      .addSelect('order.buyrCountry')
      .take(take)
      .skip(take * (page - 1))
      .getMany();
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOneBy({ id: id });

    if (!order) {
      throw new NotFoundException(`${id} doesn't exist in orders`);
    }

    if (!order.endedAt) {
      delete order.endedAt;
    }

    return order;
  }

  async findByName(name: string, page = 1) {
    const take = 20;

    return await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.buyrName like :name', { name: `%${name}%` })
      .select('order.id')
      .addSelect('order.status')
      .addSelect('order.total')
      .addSelect('order.buyrName')
      .addSelect('order.buyrCountry')
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
      throw new NotFoundException(`${id} doesn't exist in orders`);
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
