import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBooksDto } from './Dto/create';
import { UpdateBooksDto } from './Dto/update';
import { Books } from './interface/books.interface';

@Injectable()
export class BooksService {
  private books: Books[] = [
    {
      title: 'Think and Grow Rich',
      book_number: 'TGR123',
      author: 'Napolean Hill',
      isbn: 'R1234',
      genre: 'Finance',
      publication_Date: new Date('12-12-2008'),
    },
    {
      title: 'Think and Grow Rich',
      book_number: 'TGR123',
      author: 'Napolean Hill',
      isbn: 'R1234',
      genre: 'Finance',
      publication_Date: new Date('12-12-2008'),
    },
    {
      title: 'Think and Grow Rich',
      book_number: 'TGR123',
      author: 'Napolean Hill',
      isbn: 'R1234',
      genre: 'Finance',
      publication_Date: new Date('12-12-2008'),
    },
  ];

  create(data: CreateBooksDto): Books {
    const availableBooks = this.books.find((book) => book.title === data.title);

    if (availableBooks) {
      throw new ConflictException(
        `book with this title ${data.title} already exists`,
      );
    }

    const newbook: Books = {
      title: data.title,
      book_number: data.book_number,
      author: data.author,
      isbn: data.isbn,
      genre: data.genre,
      publication_Date: data.publication_Date,
    };
    this.books.push(newbook);
    return newbook;
  }

  findAll(): Books[] {
    return this.books;
  }

  findOne(book_number: string): Books {
    const book = this.books.find((book) => book.book_number === book_number);
    if (!book) {
      throw new ConflictException(`book with number ${book_number} not found`);
    }
    return book;
  }

  findByAuthor(author: string): Books {
    const book = this.books.find((book) => book.author === author);
    if (!book) {
      throw new ConflictException(`book with author ${author} not found`);
    }
    return book;
  }

  findByBookNumber(book_number: string): Books {
    const book = this.books.find((b) => b.book_number === book_number);
    if (!book) {
      throw new NotFoundException(`Book with number ${book_number} not found`);
    }
    return book;
  }

  update(book_number: string, data: UpdateBooksDto): Books {
    const bookIndex = this.books.findIndex(
      (book) => book.book_number === book_number,
    );

    if (bookIndex === -1) {
      throw new NotFoundException(`book with number ${book_number} not found`);
    }

    if (data.book_number) {
      const existingbook = this.books.find(
        (book) => book.book_number === data.book_number,
      );

      if (existingbook) {
        throw new ConflictException('Another book with this number exists');
      }
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...data,
    };

    return this.books[bookIndex];
  }

  remove(book_number: string): { message: string } {
    const bookIndex = this.books.findIndex(
      (book) => book.book_number === book_number,
    );
    if (bookIndex === -1) {
      throw new NotFoundException(`book with id ${book_number} not found`);
    }

    return {
      message: `book ${this.books[bookIndex].title} checked out successfully`,
    };
  }

  delete(book_number: string): { message: string } {
    const bookIndex = this.books.findIndex(
      (book) => book.book_number === book_number,
    );
    if (bookIndex === -1) {
      throw new NotFoundException(`book with id ${book_number} not found`);
    }
    const deletebook = this.books.splice(bookIndex, 1)[0];

    return {
      message: `book ${deletebook.book_number} permanently deleted`,
    };
  }
}
