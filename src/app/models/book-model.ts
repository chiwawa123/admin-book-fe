import { Book } from "../interfaces/book-interface";

export class BookModel implements Book {
  book_id!: number;
  title!: string;
  author!: string;
  year!: string;
  description!: string;
  cover_image!: string;
}
