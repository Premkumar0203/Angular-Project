import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { DigitalBookService } from '../../../digital-book.service';

@Component({
  selector: 'app-book-purchase',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  category = ["Fantasy","Sci-Fi","Mystery","Romance"];

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService,private logger: NGXLogger)
  {
    this.myForm = new FormGroup({
      category: new FormControl(""),
      author: new FormControl(""),
      publisher: new FormControl(""),
      price:new FormControl("0")
    });
  }

  ngOnInit(): void {
  }

  Books:any[] = [];
  errorMessage="";

  SearchBook()
  {

    this.bookService.SearchBook(this.myForm.value.category,this.myForm.
      value.author,this.myForm.value.publisher,this.myForm.value.price) 
            .subscribe({
              next: (res:any)=>{
                  this.logger.debug(res);
                  this.Books = res ;
                  this.errorMessage = "";
                  if(this.Books.length == 0 )
                  { 
                      this.errorMessage = "No Book Found";
                      this.logger.debug("errorMessage"+ (this.errorMessage))
                      this.Books = [];
                  }
                  else
                  {
                    
                    for(let i=0;i<this.Books.length;i++)
                    {
                      let logo =  String(this.Books[i].logo); 
                      logo = logo.replace("c:/picture","../../assets/")
                      logo = logo.replace("C:\\fakepath\\","../../assets/")
                      this.Books[i].logo =logo;
                    }

                  }
              },
              error: (err:any)=>{
                  this.logger.debug("error"+err)
                  this.errorMessage = "No Book Found";
              }
  })
  }

}
