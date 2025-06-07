import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from 'src/api-response/api-response.interface';
import { BooksService } from './books.service';
import { CreateBooksDto } from './Dto/create';
import { UpdateBooksDto } from './Dto/update';
import { Books } from './interface/books.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateBooksDto): ApiResponse<Books> {
    try {
      const book = this.booksService.create(data);
      return {
        success: true,
        message: 'Book added successfully',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add book',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }

  @Get('book_number/:book_number')
  findByBookNumber(
    @Param('book_number') book_number: string,
  ): ApiResponse<Books> {
    try {
      const book = this.booksService.findByBookNumber(book_number);
      return {
        success: true,
        message: 'Book found',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Book with book_number not found',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }

  @Patch(':book_number')
  update(
    @Param('book_number') book_number: string,
    @Body() data: UpdateBooksDto,
  ): ApiResponse<Books> {
    try {
      const book = this.booksService.update(book_number, data);
      return {
        success: true,
        message: 'Book info updated successfully',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Book info failed to update',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }

  @Delete(':book_number')
  remove(@Param('book_number') book_number: string): ApiResponse<null> {
    try {
      const result = this.booksService.remove(book_number);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete the book',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }
}
