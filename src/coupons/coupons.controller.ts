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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('coupons')
@ApiTags('쿠폰관리 API')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @ApiOperation({ summary: '쿠폰 생성 API', description: '쿠폰을 생성합니다.' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 400,
    description:
      "${createCouponDto.type} is not valid type | Coupon's code should be 'unique'",
  })
  async create(@Body() createCouponDto: CreateCouponDto) {
    return await this.couponsService.create(createCouponDto);
  }

  @Get()
  @ApiImplicitQuery({
    name: 'page',
    required: false,
    description: '쿠폰 20개씩 출력 {ex) page 1인 경우 1~20개 출력}',
    type: Number,
  })
  @ApiOperation({
    summary: '여러 건 쿠폰 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  findAll(@Query() { page }) {
    return this.couponsService.findAll(page);
  }

  @Get(':id')
  @ApiOperation({
    summary: '단건 쿠폰 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 404,
    description: "${id} doesn't exist in coupons",
  })
  findOne(@Param('id') id: number) {
    return this.couponsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '쿠폰 수정 API (filed 허용값은 CreateCouponDto 참고)',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 404,
    description: "${id} doesn't exist in coupons",
  })
  update(@Param('id') id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '쿠폰 삭제 API',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 404,
    description: "${id} doesn't exist in coupons",
  })
  delete(@Param('id') id: number) {
    return this.couponsService.delete(+id);
  }
}
