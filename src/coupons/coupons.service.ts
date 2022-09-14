import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity as Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { CouponType } from './entities/coupon.type';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { firstValueFrom } from 'rxjs';

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
      throw new NotFoundException();
    }

    return coupon;
  }

  async update(
    id: number,
    updateCouponDto: UpdateCouponDto
  ): Promise<Coupon | undefined> {
    let coupon = await this.couponRepository.findOneBy({ id: id });

    if (!coupon) {
      throw new NotFoundException();
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

  async delete(id: number): Promise<boolean | undefined> {
    const coupon = await this.couponRepository.findOneBy({ id: id });

    if (!coupon) {
      throw new NotFoundException();
    }

    return (await this.couponRepository.delete({ id: id })) && true;
  }
}
