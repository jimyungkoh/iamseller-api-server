import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('orders')
@ApiTags('주문관리 API')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: '주문 생성 API', description: '주문을 생성합니다.' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 400,
    description:
      'International(National) coupon not valid for ${order.buyrCountry}',
  })
  @ApiResponse({
    status: 404,
    description:
      "country ${createOrderDto.country} doesn't exist in countries | country ${country.countryCode} or quantity ${quantity} isn't in the deliveryFee table",
  })
  @UseInterceptors(new TransformInterceptor())
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiImplicitQuery({
    name: 'name',
    required: false,
    description: '주문자 이름(있으면 findByName 메서드 호출, 반환)',
    type: String,
  })
  @ApiImplicitQuery({
    name: 'page',
    required: false,
    description: '주문 20개씩 출력 {ex) page 1인 경우 1~20개 출력}',
    type: Number,
  })
  @ApiOperation({
    summary: '여러 건 주문 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  findAll(@Query() { name, page }) {
    if (!!name) {
      return this.ordersService.findByName(name, page);
    }

    return this.ordersService.findAll(page);
  }

  @Get(':id')
  @ApiOperation({
    summary: '단건 주문 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 404,
    description: "${id} doesn't exist in orders",
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '주문 상태 업데이트 API',
    description: '구매확정시 endedAt 날짜가 서버 시간 기준으로 설정됨',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 404,
    description: "${id} doesn't exist in orders",
  })
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateOrderStatus(+id, updateOrderStatusDto);
  }
}
