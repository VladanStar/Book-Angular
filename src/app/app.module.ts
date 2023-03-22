import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import {AngularFireModule} from "@angular/fire/compat";
import { FormsModule } from '@angular/forms';
import { BookComponent } from './components/book/book.component';
import { NavComponent } from './components/nav/nav.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';







@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    NavComponent,
    BookDetailsComponent,
    EditBookComponent,
    AddBookComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
   
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase)
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
