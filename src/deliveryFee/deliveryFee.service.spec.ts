import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryFeeService } from './deliveryFee.service';

describe('DeliveryFeeService', () => {
  let service: DeliveryFeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryFeeService],
    }).compile();

    service = module.get<DeliveryFeeService>(DeliveryFeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
