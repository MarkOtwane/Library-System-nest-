import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedService } from './borrowed.service';

describe('BorrowedService', () => {
  let service: BorrowedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowedService],
    }).compile();

    service = module.get<BorrowedService>(BorrowedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
