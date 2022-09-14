import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity, CouponEntity as Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { CouponType } from './entities/coupon.type';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CreateOrderDto } from '../orders/dto/create-order.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>
  ) {}

  async create(
    createCouponDto: CreateCouponDto
  ): Promise<CreateCouponDto | undefined> {
    if (!(createCouponDto.type in CouponType)) {
      throw new BadRequestException(
        `${createCouponDto.type} is not valid type`
      );
    }

    if (await this.findOneByCode(createCouponDto.code)) {
      throw new BadRequestException(`Coupon's code should be 'unique'`);
    }

    createCouponDto.use = 0;
    createCouponDto.remains = createCouponDto.amount;

    if (!createCouponDto.expirationDate) {
      const now = new Date();
      const after10Days = now.setDate(now.getDate() + 10);
      createCouponDto.expirationDate = new Date(after10Days);
    }

    return this.couponRepository.save(createCouponDto);
  }

  async findAll(page = 1): Promise<Coupon[] | undefined> {
    const take = 20;

    return await this.couponRepository
      .createQueryBuilder('coupon')
      .select('coupon.id')
      .addSelect('coupon.type')
      .addSelect('coupon.use')
      .addSelect('coupon.remains')
      .take(take)
      .skip(take * (page - 1))
      .getMany();
  }

  async findOne(id: number): Promise<Coupon | undefined> {
    const coupon = await this.couponRepository.findOneBy({ id: id });

    if (!coupon) {
      throw new NotFoundException(`${id} doesn't exist in coupons`);
    }

    return coupon;
  }

  async findOneByCode(couponCode: string) {
    const coupon = await this.couponRepository.findOneBy({
      code: couponCode,
    });

    if (!coupon) {
      throw new NotFoundException();
    }

    return coupon;
  }

  async getDiscountPrice(
    coupon: CouponEntity,
    order: CreateOrderDto
  ): Promise<number | undefined> {
    if (coupon.international && order.buyrCountry === 'KR') {
      throw new BadRequestException(
        `International coupon not valid for ${order.buyrCountry}`
      );
    } else if (!coupon.international && order.buyrCountry !== 'KR') {
      throw new BadRequestException(
        `National coupon not valid for ${order.buyrCountry}`
      );
    }

    if (coupon.type === CouponType.delivery) {
      return order.deliveryFee;
    } else if (coupon.type === CouponType.fixed) {
      return order.price <= coupon.value ? order.price : coupon.value;
    }

    const rateDiscountPrice =
      Math.round((order.price * (coupon.value / 100) + Number.EPSILON) * 100) /
      100;

    return rateDiscountPrice >= order.price ? order.price : rateDiscountPrice;
  }

  async update(
    id: number,
    updateCouponDto: UpdateCouponDto
  ): Promise<Coupon | undefined> {
    let coupon = await this.couponRepository.findOneBy({ id: id });

    if (!coupon) {
      throw new NotFoundException(`${id} doesn't exist in coupons`);
    }

    coupon = Object.assign(
      coupon,
      Object.fromEntries(
        Object.entries(updateCouponDto).filter(([, value]) => !!value)
      )
    );

    await this.couponRepository.save(coupon);

    return coupon;
  }

  async updateCouponQuantities(coupon: Coupon): Promise<boolean | undefined> {
    const couponEntity = await this.couponRepository.findOne({
      relations: ['orders'],
      select: ['orders'],
      where: { id: coupon.id },
    });

    couponEntity.use = couponEntity.orders.length;
    couponEntity.remains = couponEntity.amount - couponEntity.use;

    return (await this.couponRepository.save(couponEntity)) && true;
  }

  async delete(id: number): Promise<boolean | undefined> {
    const coupon = await this.couponRepository.findOneBy({ id: id });

    if (!coupon) {
      throw new NotFoundException(`${id} doesn't exist in coupons`);
    }

    return (await this.couponRepository.delete({ id: id })) && true;
  }
}
