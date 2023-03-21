import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Book } from '../models/book';
import { Observable, map } from 'rxjs';
import { list } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private db: AngularFireDatabase) {}

  getAll(): Observable<Book[]> {
    return this.db
      .list<Book>('/books')
      .snapshotChanges()
      .pipe(
        map((x) =>
          x.map((y: any) => ({
            id: y.payload.key,
            ...(y.payload.val() as Book),
          }))
        )
      );
  }
  get(id: string): Observable<Book> {
    return this.db
      .object<Book>('/books/' + id)
      .snapshotChanges()
      .pipe(
        map((x: any) => ({ id: x.payload?.key, ...(x.payload.val() as Book) }))
      );
  }
  update(bookId: string, book: Book): void {
    this.db.object<Book>('/books/' + bookId).update(book);
  }
  add(book: Book) {
    this.db.list('/books').push(book);
  }
  delete(bookId:any) {
    this.db.object<Book>('/books/'+bookId).remove()
  }
}
