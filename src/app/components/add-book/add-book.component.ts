import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor(private bookService:BookService,
    private router:Router
   ){}

  addBook(f:NgForm){
 
    // console.log(f.value)
 
    this.bookService.add(f.value)
   
    window.alert("Knjiga je dodata")
    this.router.navigate(['/'])
    
  }
}
