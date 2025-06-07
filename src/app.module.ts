import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './Authors/authors.module';
import { MembersModule } from './Members/members.module';
import { BooksModule } from './Books/books.module';
@Module({
  imports: [AuthorsModule, MembersModule, BooksModule], //✅
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
