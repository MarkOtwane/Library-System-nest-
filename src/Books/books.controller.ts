import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './Dto/create';
import { UpdateBooksDto } from './Dto/update';
import { Books } from './interface/books.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createBooksDto: CreateBooksDto): Books {
    return this.booksService.create(createBooksDto);
    // try {
    //   const book = this.booksService.create(data);
    //   return {
    //     success: true,
    //     message: 'Book added successfully',
    //     data: book,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Failed to add book',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }

  //get all
  @Get()
  findAll(): Books[] {
    return this.booksService.findAll();
  }

  @Get('book_number/:book_number')
  findByBookNumber(@Param('book_number') book_number: string): Books {
    return this.booksService.findOne(book_number);
    // try {
    //   const book = this.booksService.findByBookNumber(book_number);
    //   return {
    //     success: true,
    //     message: 'Book found',
    //     data: book,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Book with book_number not found',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }
  //  update books
  @Put('book_number:book_number')
  update(
    @Param('book_number') book_number: string,
    @Body() updateBooksDto: UpdateBooksDto,
  ): Books {
    return this.booksService.update(book_number, updateBooksDto);
    // try {
    //   const book = this.booksService.update(book_number, data);
    //   return {
    //     success: true,
    //     message: 'Book info updated successfully',
    //     data: book,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Book info failed to update',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }

  @Delete('delete/:book_number')
  delete(@Param('book_number') book_number: string): { message: string } {
    return this.booksService.delete(book_number);
    // try {
    //   this.booksService.delete(book_number);
    //   return {
    //     success: true,
    //     message: 'book removed successfully',
    //     data: null,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Failed to delete the book',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }
}
export { BooksService };
