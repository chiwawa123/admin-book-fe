import { Component } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Book, BookList } from '../../interfaces/book-interface';
import { BookModel } from '../../models/book-model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  books: Book[] = [];
  newBook: BookModel = new BookModel();  // Initialize with BookModel

  constructor(private bookService:BookServiceService){}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (res: Book[]) => {
        this.books = res; // Ensure API returns an array of books
        console.log('Books fetched:', this.books);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  addBook() {
    const formData = new FormData();
    formData.append('title', this.newBook.title);
    formData.append('author', this.newBook.author);
    formData.append('year', this.newBook.year);
    formData.append('description', this.newBook.description);
    formData.append('cover_image', this.newBook.cover_image);

    this.bookService.addBook(formData).subscribe(
        (res: BookModel) => {
            this.books.push(res); // Add the new book to the list
            this.resetForm(); // Reset the form fields
        },
        (error) => {
            console.error('Error adding book:', error);
        }
    );
}

  resetForm() {
    this.newBook = new BookModel();  // Reset the form to a new BookModel
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.newBook.cover_image = file; // Store the entire file
    }
}


}
