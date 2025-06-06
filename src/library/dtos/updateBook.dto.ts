export class UpdateBookDto {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  genre: string;
  status: 'available' | 'unavailabe' | 'borrowed';
}
