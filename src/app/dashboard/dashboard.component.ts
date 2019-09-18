import { Component, OnInit, Version, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { LoggerService } from 'app/services/logger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private route: ActivatedRoute,
              private loggerService: LoggerService) {
                this.loggerService.log('Now,using the verbose injector style')
              }

  ngOnInit() {
    // tslint:disable-next-line: prefer-const
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    } else {
      this.allBooks = resolvedData;
    }

    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Wesson Tracker ${VERSION.full}`);

    this.loggerService.log(`Done with dashboard initialization`);

    throw new Error('ugly technical error!')
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);

    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: void) => {
          // tslint:disable-next-line: prefer-const
          let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      )
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
