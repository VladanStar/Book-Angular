import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import * as Papa from 'papaparse';
import { AuthService } from 'src/app/services/auth.service';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  // @ViewChild('elementToPrint') elementToPrint: ElementRef | undefined;
  totalLength: any;
  page: number = 1;
  p: any;
  filteredBooks: Book[] = [];
  documentDefinition: any;
  searchText: any;
  searchAuthor: string = '';
  searchGenre: string = '';

  books: Book[] = [];
  // elementToPrint: any = [];
  constructor(private bookService: BookService, 
    private auth:AuthService,
    private renderer: Renderer2) {
    this.auth.updateLoginStatus(false);
  }
  ngOnInit(): void {
    this.bookService
      .getAll()
      .subscribe((p) => (this.filteredBooks = this.books = p));
  }
  filter(value: any) {
    this.filteredBooks = value
      ? this.books.filter((p) =>
          p.naziv?.toLowerCase().includes(value.toLowerCase())
        )
      : this.books;
  }


  sortNaziv(): void {
    this.books.sort((a: Book, b: Book): number => {
      if (a.naziv && b.naziv) {
        return a.naziv.localeCompare(b.naziv);
      } else {
        return 0;
      }
    });
  }
  sortZanr(): void {
    this.books.sort((a: Book, b: Book): number => {
      if (a.zanr && b.zanr) {
        return a.zanr.localeCompare(b.zanr);
      } else {
        return 0;
      }
    });
  }
  sortAutor(): void {
    this.books.sort((a: Book, b: Book): number => {
      if (a.autor && b.autor) {
        return a.autor.localeCompare(b.autor);
      } else {
        return 0;
      }
    });
  }
  sortGodina() {
    this.books.sort((a: Book, b: Book): number => {
      if (a.godina_izdavanja && b.godina_izdavanja) {
        return a.godina_izdavanja - b.godina_izdavanja;
      } else {
        return 0;
      }
    });
  }
  exportToCsv() {
    const csv = Papa.unparse(this.filteredBooks);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'books.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // exportToPdf() {
  //   const doc = new jsPDF();

  //   const element = this.elementToPrint?.nativeElement;
  //   // this.renderer.setStyle(element);

  //   doc.html(element, {
  //     callback: () => {
  //       doc.save('book.pdf');
  //     },
  //   });
  // }


}
