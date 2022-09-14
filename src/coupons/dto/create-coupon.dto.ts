import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CouponType } from '../entities/coupon.type';

type CouponType = typeof CouponType[keyof typeof CouponType];

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(CouponType)
  @IsNotEmpty()
  type: CouponType;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  amount: number;

  @IsNumber()
  use: number;

  @IsNumber()
  remains: number;

  @IsDate()
  expirationDate: Date;
}
