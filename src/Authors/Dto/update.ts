export class UpdateAuthorDto {
  name: string;
  biography: string;
  dateOfBirth: Date;
  booksWritten: {
    title: string;
    book_number: string;
    isbn: string;
    genre: string;
    publication_Date: Date;
  };
}
