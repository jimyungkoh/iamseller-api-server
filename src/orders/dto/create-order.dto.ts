import { CountryEntity as Country } from '../../countries/entities/country.entity';
import { CouponEntity as Coupon } from '../../coupons/entities/coupon.entity';
import { OrderStatus } from '../entities/order.status';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export class CreateOrderDto {
  readonly status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  deliveryFee: number;

  discountPrice?: number = 0;

  total: number;

  @IsString()
  @IsNotEmpty()
  readonly buyrName: string;

  @IsString()
  readonly buyrCity: string;

  @IsString()
  @IsNotEmpty()
  readonly buyrCountry: string;

  @IsString()
  readonly buyrZipx: string;

  @IsString()
  @IsNotEmpty()
  readonly vscode: string;

  @IsString()
  couponCode: string;

  @Exclude()
  country: Country;

  @Exclude()
  coupon: Coupon;
}
