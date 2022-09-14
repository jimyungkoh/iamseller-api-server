import { IsNotEmpty } from 'class-validator';

export class CreateCurrencyInfoDto {
  constructor(dollar: number, won: number, date: string) {
    this.dollar = dollar;
    this.won = won;
    this.date = date;
  }

  @IsNotEmpty()
  dollar: number;

  @IsNotEmpty()
  won: number;

  @IsNotEmpty()
  date: string;
}
