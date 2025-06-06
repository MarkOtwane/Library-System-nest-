import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibManagementController } from './library/lib-management.controller';
import { LibManagementService } from './library/lib-management.service';

@Module({
  imports: [],
  controllers: [AppController, LibManagementController],
  providers: [AppService, LibManagementService],
})
export class AppModule {}
