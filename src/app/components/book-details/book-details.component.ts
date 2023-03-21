import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  id:any;

 book:Book={}
//   {
//     ISBN: 0,
//     naziv: 're',
//     autor: 're',
//     broj_stranica: 0,
//     godina_izdavanja: 0,
//     izdavac: 'er',
//     zanr: 're'
// }
  constructor(private bookServis:BookService, private route:ActivatedRoute,
    private router:Router){}
  ngOnInit(): void {
   this.id= this.route.snapshot.paramMap.get("id")
   if(this.id){

   
   this.bookServis.get(this.id).subscribe(p => {
    this.book = p;
    console.log(this.book);  
  });
}
  }
  deleteBook(){
    let id = this.id as string;
    if(confirm("Da li ste sigurni?")){
      if(id){
    this.bookServis.delete(this.id);
    this.router.navigate(["/"])

    }
  }
}

}
