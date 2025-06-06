import { Test, TestingModule } from '@nestjs/testing';
import { LibManagementService } from './lib-management.service';

describe('LibManagementService', () => {
  let service: LibManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibManagementService],
    }).compile();

    service = module.get<LibManagementService>(LibManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
