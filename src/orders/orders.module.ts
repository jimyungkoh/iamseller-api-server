import { Module, NestModule } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { CountryEntity } from '../countries/entities/country.entity';
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service';
import { DeliveryFeeEntity } from '../deliveryFee/entities/deliveryFee.entity';
import { CurrencyService } from '../currency/currency.service';
import { CurrencyEntity } from '../currency/entities/currency.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CouponsService } from '../coupons/coupons.service';
import { CouponEntity } from '../coupons/entities/coupon.entity';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    DeliveryFeeService,
    CurrencyService,
    CouponsService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      CountryEntity,
      DeliveryFeeEntity,
      CurrencyEntity,
      CouponEntity,
    ]),
    HttpModule,
  ],
})
export class OrdersModule {}
