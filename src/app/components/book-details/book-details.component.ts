import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  id:any;

  book: Book={}
//   {
//     ISBN: 0,
//     naziv: '',
//     autor: '',
//     broj_stranica: 0,
//     godina_izdavanja: 0,
//     izdavac: '',
//     zanr: ''
// }
  constructor(private bookServis:BookService, private route:ActivatedRoute){}
  ngOnInit(): void {
   this.id= this.route.snapshot.paramMap.get("id")
   if(this.id){

   }
    this.bookServis.get(this.id).subscribe(p=> 
    
      this.book= p
      )
  }

}
