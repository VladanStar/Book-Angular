import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import * as Papa from 'papaparse';
// import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  totalLength: any;
  page: number = 1;
  p: any;
  filteredBooks: Book[] = [];

  books: Book[] = [];
  constructor(private bookService: BookService) {}
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
  exportToPdf() {
    const doc = new jsPDF();
    const columns = ['Naziv', 'Autor', 'Godina izdavanja', 'Žanr'];
    const rows = this.filteredBooks.map((book) => [
      book.naziv,
      book.autor,
      book.godina_izdavanja,
      book.zanr,
    ]);
    // doc.autoTable({
    //   head: [columns],
    //   body: rows,
    // });

    doc.save('books.pdf');
  }
  // exportToPdf(): void {
  //   const columns = ['Naziv', 'Autor', 'Godina izdavanja', 'Žanr'];
  //   const rows = this.filteredBooks.map((book) => [
  //     book.naziv,
  //     book.autor,
  //     book.godina_izdavanja,
  //     book.zanr,
  //   ]);

  //   // create a new pdf document
  //   const doc = new jsPDF({
  //     orientation: 'landscape',
  //     unit: 'pt',
  //     format: 'a4',
  //     putOnlyUsedFonts: true,
  //     floatPrecision: 16, // increase to improve precision
  //   });

  //   // calculate width of each column
  //   const pageWidth = doc.internal.pageSize.width;
  //   const columnWidth = pageWidth / columns.length;

  //   // add table header
  //   doc.setFontSize(14);
  //   doc.setFontStyle('bold');
  //   doc.text('Spisak Knjiga', pageWidth / 2, 40, { align: 'center' });
  //   doc.autoTable({
  //     head: [columns],
  //     startY: 60,
  //     columnStyles: {
  //       0: { cellWidth: columnWidth * 2 },
  //       1: { cellWidth: columnWidth },
  //       2: { cellWidth: columnWidth },
  //       3: { cellWidth: columnWidth * 1.5 },
  //     },
  //   });

  //   // add table body
  //   doc.setFontSize(12);
  //   doc.setFontStyle('normal');
  //   doc.autoTable({
  //     body: rows,
  //     startY: doc.autoTable.previous.finalY + 5,
  //     columnStyles: {
  //       0: { cellWidth: columnWidth * 2 },
  //       1: { cellWidth: columnWidth },
  //       2: { cellWidth: columnWidth },
  //       3: { cellWidth: columnWidth * 1.5 },
  //     },
  //   });

  //   // save the document
  //   doc.save('books.pdf');
  // }
}
