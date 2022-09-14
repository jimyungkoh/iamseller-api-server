import { OrderStatus } from '../entities/order.status';
import { ApiProperty } from '@nestjs/swagger';

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export class UpdateOrderStatusDto {
  @ApiProperty({
    default: OrderStatus.구매확정,
    description: '주문 상태',
    enum: OrderStatus,
  })
  readonly status: OrderStatus;
}
