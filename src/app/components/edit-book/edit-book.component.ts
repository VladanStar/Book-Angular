
import { Component, OnInit } from '@angular/core';
import { update } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{

  id:any;
  book:Book = {
    naziv: '',
    autor: '',
    zanr: '',
    izdavac: '',
    broj_stranica: 0,
    godina_izdavanja: 0,
    ISBN:0
};
// book:Book={}
//   {
//     ISBN: 0,
//     naziv: 're',
//     autor: 're',
//     broj_stranica: 0,
//     godina_izdavanja: 0,
//     izdavac: 'er',
//     zanr: 're'
// }
  constructor(private bookServis:BookService,
    private route:ActivatedRoute,
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
  updateBook(f:NgForm){
// console.log(f.value)
 let id =this.id as string;
this.bookServis.update(id, f.value);
window.alert('Knjiga je editovana')
this.router.navigate(["/f"])
// f.reset();
  }

}





