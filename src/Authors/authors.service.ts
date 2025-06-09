import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './Dto/create';
import { UpdateAuthorDto } from './Dto/update';
import { Authors } from './interfaces/authors.interface'; // ← Fix this import path as per your project

@Injectable()
export class AuthorsService {
  private authors: Authors[] = [
    {
      name: 'Mark Otwane',
      biography: 'A poet a full stack web developer and designer',
      dateOfBirth: new Date('2003-10-03'),
      booksWritten: {
        title: '7 japanese ways to overcome laziness',
        book_number: '1234RE',
        isbn: '123-456-789',
        genre: 'Development',
        publication_Date: new Date('3-10-2023'),
      },
    },
    {
      name: 'Mark Otwane',
      biography: 'A poet a full stack web developer and designer',
      dateOfBirth: new Date('2006-10-03'),
      booksWritten: {
        title: '7 japanese ways to overcome laziness',
        book_number: '1234RE',
        isbn: '123-456-789',
        genre: 'Development',
        publication_Date: new Date('3-10-2023'),
      },
    },
    {
      name: 'JOHN DOE',
      biography: 'A full stack web developer and designer',
      dateOfBirth: new Date('2006-9-03'),
      booksWritten: {
        title: 'japanese ways to overcome laziness',
        book_number: '12K34RE',
        isbn: '127-456-789',
        genre: 'Development',
        publication_Date: new Date('3-10-2026'),
      },
    },
  ];

  create(data: CreateAuthorDto): Authors {
    const availableAuthor = this.authors.find(
      (author) => author.name === data.name,
    );

    if (availableAuthor) {
      throw new ConflictException(
        `Author with this name ${data.name} already exists`,
      );
    }

    const newAuthor: Authors = {
      name: data.name,
      biography: data.biography,
      dateOfBirth: data.dateOfBirth,
      booksWritten: data.booksWritten,
    };

    this.authors.push(newAuthor);
    return newAuthor;
  }

  findAll(): Authors[] {
    return this.authors;
  }

  findOne(name: string): Authors {
    const author = this.authors.find((author) => author.name === name);
    if (!author) {
      throw new ConflictException(`Author ${name} not found`);
    }
    return author;
  }

  findByname(name: string): Authors {
    const author = this.authors.find((author) => author.name === name);
    if (!author) {
      throw new ConflictException(`Author with name ${name} not found`);
    }
    return author;
  }

  update(name: string, data: UpdateAuthorDto): Authors {
    const authorIndex = this.authors.findIndex(
      (author) => author.name === name,
    );

    if (authorIndex === -1) {
      throw new NotFoundException(`Author ${name} not found`);
    }

    if (data.name) {
      const existingAuthor = this.authors.find(
        (author) => author.name === data.name,
      );

      if (existingAuthor) {
        throw new ConflictException('Another author with this name exists');
      }
    }

    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...data,
    };

    return this.authors[authorIndex];
  }

  // remove(name: string): { message: string } {
  //   const authorIndex = this.authors.findIndex(
  //     (author) => author.name === name,
  //   );

  //   if (authorIndex === -1) {
  //     throw new NotFoundException(`Author ${name} not found`);
  //   }

  //   this.authors.splice(authorIndex, 1); // Actually removes it

  //   return {
  //     message: `Author ${name} deleted successfully`,
  //   };
  // }

  delete(name: string): { message: string } {
    const authorIndex = this.authors.findIndex(
      (author) => author.name === name,
    );

    if (authorIndex === -1) {
      throw new NotFoundException(`Author ${name} not found`);
    }

    const deletedAuthor = this.authors.splice(authorIndex, 1)[0];

    return {
      message: `Author ${deletedAuthor.name} permanently deleted`,
    };
  }
}
