export interface Borrowed {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: Date;
  returnDate?: Date; // optional if not yet returned
}
