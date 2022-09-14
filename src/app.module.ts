import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './database';
import { OrdersModule } from './orders/orders.module';
import { DeliveryFeeModule } from './deliveryFee/deliveryFee.module';
import { CouponsModule } from './coupons/coupons.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    OrdersModule,
    DeliveryFeeModule,
    CouponsModule,
    CurrencyModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
