import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { CountryEntity } from '../countries/entities/country.entity';
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service';
import { DeliveryFeeEntity } from '../deliveryFee/entities/deliveryFee.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, DeliveryFeeService],
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CountryEntity, DeliveryFeeEntity]),
  ],
})
export class OrdersModule {}
