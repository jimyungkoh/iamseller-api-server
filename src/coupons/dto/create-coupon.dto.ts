import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CouponType } from '../entities/coupon.type';
import { ApiProperty } from '@nestjs/swagger';

type CouponType = typeof CouponType[keyof typeof CouponType];

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'HELLO',
    description: '쿠폰 코드',
  })
  code: string;

  @IsEnum(CouponType)
  @ApiProperty({
    default: CouponType.rate,
    description: '쿠폰 타입',
    enum: CouponType,
  })
  type: CouponType;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    default: true,
    description: '해외 전용 코드 여부 (적절한 할인을 위함)',
  })
  international: boolean;

  @IsNotEmpty()
  @ApiProperty({
    default: 10,
    description:
      '할인율 | 할인 가격 (배송비의 경우 배송비를 할인하므로 영향 X)',
  })
  value: number;

  totalDiscountAmount?: number = 0;

  @IsNotEmpty()
  @ApiProperty({
    default: 100,
    description: '쿠폰 발행량',
  })
  amount: number;

  use?: number = 0;

  remains: number;

  @ApiProperty({
    default: new Date(),
    required: false,
    description: '쿠폰 유효기간 (미입력시 10일 뒤로 자동 설정)',
  })
  expirationDate: Date;
}
