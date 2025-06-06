import { Test, TestingModule } from '@nestjs/testing';
import { LibManagementController } from './lib-management.controller';

describe('LibManagementController', () => {
  let controller: LibManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibManagementController],
    }).compile();

    controller = module.get<LibManagementController>(LibManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
