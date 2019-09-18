import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddBookComponent } from './add-book/add-book.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { CoreModule } from './core/core.module';
import { LoggerService } from './services/logger.service';
import { DataService } from './services/data.service';
import { PlainLoggerService } from './services/plain-logger.service';
import { dataServiceFactory } from './services/data.service.factory';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookComponent,
    EditReaderComponent,
    EditBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    DataService,
    LoggerService
    // { provide: LoggerService, useClass: PlainLoggerService },
    // {provide: LoggerService, useValue: {
    //   log: (message) => console.log(`MESSAGE: ${message}`),
    //   err: (err) => console.log(`PROBLEM: ${err}`)
    // }},
    // { provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
