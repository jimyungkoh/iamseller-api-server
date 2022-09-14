import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll(@Query() { page }) {
    return this.couponsService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couponsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.couponsService.delete(+id);
  }
}
