import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from '../orders/entities/order.status';
import { CouponType } from './entities/coupon.type';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(CouponEntity)
    private couponRepository: Repository<CouponEntity>
  ) {}

  async create(
    createCouponDto: CreateCouponDto
  ): Promise<CreateCouponDto | undefined> {
    if (!(createCouponDto.type in CouponType)) {
      throw new BadRequestException();
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
}
