import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedController } from './borrowed.controller';

describe('BorrowedController', () => {
  let controller: BorrowedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowedController],
    }).compile();

    controller = module.get<BorrowedController>(BorrowedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
