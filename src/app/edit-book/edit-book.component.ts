import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { DataService } from 'app/core/data.service';
import { LoggerService } from 'app/services/logger.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private loggerService: LoggerService) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID)
    .subscribe(
      (data: Book) => this.selectedBook = data,
      (error: any) => console.log(`This is an error`),
      () => console.log(`This is complete`),
    );

    this.dataService.getOldBookById(bookID)
      .subscribe(
        (data: OldBook) => console.log(`Old book title: ${data.bookTitle}`)
      )
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
    this.loggerService.log(`New most popular book: ${this.selectedBook.title}`)
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`${this.selectedBook.title} updated successfully`),
        (err: any) => console.log(err)
      )
  }
}
