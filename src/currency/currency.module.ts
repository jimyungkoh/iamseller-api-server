import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './entities/currency.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [CurrencyService],
  imports: [TypeOrmModule.forFeature([CurrencyEntity]), HttpModule],
})
export class CurrencyModule {}
