import { CountryEntity as Country } from '../../countries/entities/country.entity';
import { CouponEntity as Coupon } from '../../coupons/entities/coupon.entity';
import { OrderStatus } from '../entities/order.status';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export class CreateOrderDto {
  @IsString()
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  buyrCity: string;

  @IsString()
  @IsNotEmpty()
  buyrCountry: string;

  @IsString()
  buyrZipx: string;

  @IsString()
  @IsNotEmpty()
  vscode: string;

  @IsString()
  coupon: Coupon;
}
