import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators'

import { LoggerService } from './logger.service';
import { allReaders, allBooks } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError'

@Injectable()
export class DataService {

  constructor(private loggerService: LoggerService,
              private http: HttpClient) { }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers')
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    // tslint:disable-next-line: prefer-const
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  // setMostPopularBook(popularBook: Book): void {
  //   this.mostPopularBook = popularBook;
  // }
}
