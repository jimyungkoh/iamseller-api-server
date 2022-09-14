import {
  IsBoolean,
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
  type: CouponType;

  @IsBoolean()
  @IsNotEmpty()
  international: boolean;

  @IsNotEmpty()
  value: number;

  totalDiscountAmount?: number = 0;

  @IsNotEmpty()
  amount: number;

  use?: number = 0;

  remains: number;

  expirationDate: Date;
}
