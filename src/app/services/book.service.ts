import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database"
import { Book } from '../models/book';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private db:AngularFireDatabase) { }

  getAll():Observable<Book[]>{
   return  this.db.list<Book>('/books')
   .snapshotChanges()
   .pipe(
      map(x=>x.map((y:any) =>({id: y.payload.key, ...y.payload.val() as Book})))
    )
  }
  get(id:string):Observable<Book>{
   return this.db.object<Book>('books/i')
    .snapshotChanges()
    .pipe(
      map((x:any)=>({id:x.payload?.key, ...x.payload.val() as Book}))
    )

  }
}
