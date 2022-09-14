import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { EXCHANGE_URL } from '../config';
import { firstValueFrom } from 'rxjs';
import { CreateCurrencyInfoDto } from './dto/create-currency-info.dto';
import { CurrencyEntity } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
    private readonly httpService: HttpService
  ) {}

  async exchangeToDollar(won: number): Promise<number | undefined> {
    const currency = await this.getTodayCurrency();

    const wonPerDollar = currency.won;

    // 소수점 이하 두 자리까지 반올림 후 반환
    return Math.round((won / wonPerDollar + Number.EPSILON) * 100) / 100;
  }

  async exchangeToWon(dollar: number): Promise<number | undefined> {
    const currency = await this.getTodayCurrency();

    const wonPerDollar = currency.won;

    // 소수점 이하 두 자리까지 반올림 후 반환
    return Math.round((dollar * wonPerDollar + Number.EPSILON) * 100) / 100;
  }

  /**
   * @description
   * - API 호출이 일 1,000회이기 때문에 같은 날짜의 환율 데이터가 있는 경우 재활용
   * @returns {Promise<CurrencyEntity | undefined>}
   * @private
   */
  private async getTodayCurrency(): Promise<CurrencyEntity | undefined> {
    const currency = await this.currencyRepository.findOneBy({
      date: this.getToday(),
    });

    return currency || (await this.appendAndGetCurrencyData());
  }

  private async appendAndGetCurrencyData(): Promise<CurrencyEntity> {
    const today = this.getToday();

    const { data } = await firstValueFrom(this.httpService.get(EXCHANGE_URL));

    console.log(data);

    let wonPerDollar;

    /**
     * @description
     * - 비영업일의 데이터, 영업당일 11시 이전에 해당일의 데이터를 요청할 경우 null 값이 반환
     * - null 값이 반환되는 경우 전날 환율 적용
     */
    try {
      wonPerDollar = data.filter(function (e) {
        return e.cur_unit === 'USD';
      })[0].bkpr;

      wonPerDollar = wonPerDollar.replace(',', '');
    } catch (e) {
      const latestCurrency = await this.currencyRepository.find({
        order: { date: 'DESC' },
        take: 1,
      });

      wonPerDollar = latestCurrency[0].won;
    }

    return await this.currencyRepository.save(
      new CreateCurrencyInfoDto(1, wonPerDollar, today)
    );
  }

  private getToday(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  }
}
