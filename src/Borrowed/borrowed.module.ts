import { Module } from '@nestjs/common';
import { BorrowedController } from '../borrowed.controller';
import { BorrowedService } from './borrowed.service';

@Module({
  controllers: [BorrowedController],
  providers: [BorrowedService]
})
export class BorrowedModule {}
