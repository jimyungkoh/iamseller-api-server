import { CountryEntity as Country } from '../../countries/entities/country.entity';
import { CouponEntity as Coupon } from '../../coupons/entities/coupon.entity';
import { OrderStatus } from '../entities/order.status';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export class CreateOrderDto {
  @ApiProperty({
    default: OrderStatus.결제완료,
    description: '주문 상태',
    enum: OrderStatus,
  })
  readonly status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1, description: '주문 수량' })
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 157, description: '상품 가격' })
  readonly price: number;

  deliveryFee: number;

  discountPrice?: number = 0;

  total: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Jason Koh', description: '구매자 이름' })
  readonly buyrName: string;

  @IsString()
  @ApiProperty({ default: 'flushing', description: '구매자 지역' })
  readonly buyrCity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'US', description: '구매자 국가 코드' })
  readonly buyrCountry: string;

  @IsString()
  @ApiProperty({ default: '11355', description: '구매자 우편번호' })
  readonly buyrZipx: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: '13817',
    description: '요구사항에 vscode에 대한 설명이 없었다,, 아무 문자나 입력',
  })
  readonly vscode: string;

  @ApiProperty({
    default: 'WELCOME',
    description: '쿠폰 코드 (없을시 입력 안해도 됨)',
  })
  couponCode: string;

  @Exclude()
  country: Country;

  @Exclude()
  coupon: Coupon;
}
