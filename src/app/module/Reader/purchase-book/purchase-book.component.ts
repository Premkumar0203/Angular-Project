import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DigitalBookService } from '../../../digital-book.service';
import { FileUploadService } from '../../../file-upload.service';

@Component({
  selector: 'app-purchase-book',
  templateUrl: './purchase-book.component.html',
  styleUrls: ['./purchase-book.component.scss']
})
export class PurchaseBookComponent implements OnInit {

  myForm : FormGroup;
  token:any= "";
  errorMessage="";
  bookId: number = 0;
  
  constructor(private bookService:DigitalBookService,
    private service: CookieService,private router: Router,
    private fileService:FileUploadService,
    private _activatedRoute: ActivatedRoute,) {

      this.bookId = this._activatedRoute.snapshot.params['id'];

      this.myForm = new FormGroup(
        {
          id: new FormControl(this.bookId),   
          name: new FormControl("",[Validators.required]),
          emailId: new FormControl("",[Validators.required]),
      });

     }

  ngOnInit(): void {
  }

  purchaseBook:any =[];
  PurchaseBook()
  {
    const registerJson  =
    {
      "bookId": this.bookId,
      "name": this.myForm.value.name,
      "emailId":this.myForm.value.emailId
    };
    this.bookService.PurchaseBook(this.token,registerJson).subscribe({
      next: (res:any)=>{
          console.log(res);
          this.purchaseBook = res;
          console.log("this.Books.id > 0)" +(this.purchaseBook.id > 0))
          if(this.purchaseBook.paymentId != null )
          {
            this.errorMessage = "The Book Purchased Successfully";
          }
          else
          {
            if(this.purchaseBook.message != null)
            {
              this.errorMessage = this.purchaseBook.message;
            }
          }
      },
      error: (err:any)=>{
          console.log(err)
      }
})
  }

}
