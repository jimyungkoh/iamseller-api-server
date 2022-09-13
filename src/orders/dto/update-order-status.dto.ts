import { OrderStatus } from '../entities/order.status';

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export class UpdateOrderStatusDto {
  readonly status: OrderStatus;
}
