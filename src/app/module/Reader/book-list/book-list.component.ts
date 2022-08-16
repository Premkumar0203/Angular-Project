import { Component, OnInit } from '@angular/core';
import { DigitalBookService } from '../../../digital-book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  category = ["Fantasy","Sci-Fi","Mystery","Romance"];

  SearchBook()
  {

  }


  Books:any[] = [];

  constructor(private bookService:DigitalBookService){}

  ngOnInit(){
    this.findAllMovies();
}

findAllMovies(){
    this.bookService.findAll()
    .subscribe({
        next: (res:any)=>{
            console.log(res);
            this.Books = res;
            for(let i=0;i<this.Books.length;i++)
            {
              let logo =  String(this.Books[i].logo); 
              console.log("Before Logo Changes :" +logo);
              logo = logo.replace("c:/picture/","../../assets/");
              logo = logo.replace("C:\\fakepath\\","../../assets/")
              console.log("After Logo Changes :" +logo);
              this.Books[i].logo =logo;
            }
        },
        error: (err:any)=>{
            console.log(err)
        }
    })
}


}
