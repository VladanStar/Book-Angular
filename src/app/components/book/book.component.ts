import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  books:Book[]=[];
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.bookService.getAll().subscribe(p=>this.books= p)
  }
}
