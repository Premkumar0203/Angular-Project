import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DigitalBookService } from 'src/app/digital-book.service';
import { FileUploadService } from 'src/app/file-upload.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  CategoryList = ["Fantasy","Sci-Fi","Mystery","Romance"];

  myForm : FormGroup;
  token:any= "";
  Books:any = [];
  errorMessage="";
  bookId: number = 0;

  constructor(private bookService:DigitalBookService,
    private service: CookieService,private router: Router,
    private fileService:FileUploadService,
    private _activatedRoute: ActivatedRoute,
    )
  {    

    this.bookId = this._activatedRoute.snapshot.params['id'];
    this.fetchBook();

    this.myForm = new FormGroup({
      id: new FormControl(this.bookId),   
      author: new FormControl(this.Books.author),
      title: new FormControl(""),
      category: new FormControl(this.Books.category),
      price:new FormControl("0"),
      publisher: new FormControl(this.Books.publisher),
      logo: new FormControl(this.Books.logo),
      content: new FormControl(this.Books.content)
      // status: new FormControl("1"),
    });
  }

  ngOnInit(): void 
  {
  this.fetchBook();
  }

   fetchBook()
   {
            this.token = this.service.get('TokenId');
            console.log("this.token != null): " + this.token != null);
            
            console.log("Edit Book Component -ngOnInit Method");
            let Books = this.bookService.getBooksDetails(this.token,this.bookId)
            .subscribe({
              next: (res:any)=>{
                  console.log(res);
                  this.Books = res;
              },
              error: (err:any)=>{
                  console.log(err)
              }
        });
   }

   EditBook()
  {
    console.log(this.Books);
    const registerJson  =
    {
      "price": this.myForm.value.price,
      "publisher": this.myForm.value.publisher,
      "logo":this.myForm.value.logo,
      "content": this.myForm.value.content
    };
    this.bookService.EditBook(this.token,registerJson,this.myForm.value.id).subscribe({
      next: (res:any)=>{
          console.log(res);
          this.Books = res;
          if(this.Books.message != null)
          {
            this.errorMessage = this.Books.message;
          }
          console.log("this.Books.id > 0)" +(this.Books.id > 0))
          if(this.Books.id > 0)
          {
            console.log("Before Navigation");
            this.router.navigateByUrl('/Author/BookList');
          }
      },
      error: (err:any)=>{
          console.log(err)
      }
})
  }

  

  

  
}
