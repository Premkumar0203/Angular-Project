import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DigitalBookService } from '../../../digital-book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  optionList = ["Select","Payment Id","Book Id"]
  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService)
  {
    this.myForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      searchBy: new FormControl("",[Validators.required]),
      id: new FormControl("",[Validators.required,Validators.pattern("[0-9]{1,15}")])
    });
  }

  ngOnInit() 
  {
  }


  Books:any = [];

  fetchBook()
  {
       this.bookService.FetchBook(this.myForm.value.email,this.myForm.
        value.searchBy,this.myForm.value.id ) 
              .subscribe({
                next: (res:any)=>{
                    console.log(res);
                    this.Books = res ;
                    this.errorMessage = "";
                    if(this.Books.length == 0 )
                    { 
                        this.errorMessage = "No Book Found";
                        console.log("errorMessage"+ (this.errorMessage))
                        this.Books = [];
                    }
                    else
                    {
                      if(this.Books.message != null)
                      {
                        this.errorMessage = "No Book Found";
                        console.log("errorMessage"+ (this.errorMessage))
                        this.Books = [];
                      }

                      for(let i=0;i<this.Books.length;i++)
                      {
                        let logo =  String(this.Books[i].logo); 
                        console.log("Before Logo Changes :" +logo);
                        logo = logo.replace("c:/picture/","../../assets/")
                        logo = logo.replace("C:\\fakepath\\","../../assets/")
                        console.log("After Logo Changes :" +logo);
                        this.Books[i].logo =logo;
                      }
  
                    }
                },
                error: (err:any)=>{
                    console.log("error"+err)
                    this.errorMessage = "No Book Found";
                }
    })
  }

}
