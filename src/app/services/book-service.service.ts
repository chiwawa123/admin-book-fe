import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDetails } from '../configs/server-details';
import { Book, BookList } from '../interfaces/book-interface';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
    private baseUrl = ServerDetails.serverIP;

  constructor(private http:HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  
addBook(book: FormData): Observable<BookModel> {
  return this.http.post<BookModel>(`${this.baseUrl}/books`, book);
}
  
}
