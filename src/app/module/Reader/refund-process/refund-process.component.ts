import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DigitalBookService } from '../../../digital-book.service';

@Component({
  selector: 'app-refund-process',
  templateUrl: './refund-process.component.html',
  styleUrls: ['./refund-process.component.scss']
})
export class RefundProcessComponent implements OnInit {

  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService)
  {
    this.myForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      bookId: new FormControl("",[Validators.required,Validators.pattern("[0-9]{1,5}")])
    });
  }

  ngOnInit() 
  {
  }

  RefundData:any = [];


  RefundProcess()
  {
    this.bookService.RefundProcess(this.myForm.value.email,this.myForm.value.bookId)
    .subscribe({
     next: (res:any)=>{
         console.log(res);
         this.RefundData = [];
         this.RefundData = res;
         this.errorMessage ="";
         console.log("this.paymentHistory.length == 0"+ (this.RefundData.length == 0))
         if(this.RefundData.length == 0 )
          { 
              this.errorMessage = "";
              console.log("errorMessage"+ (this.errorMessage))
              this.RefundData = [];
         }
         else
         {
          if(this.RefundData.message != null)
                      {
                        this.errorMessage = this.RefundData.message;
                        console.log("errorMessage"+ (this.errorMessage))
                        this.RefundData = [];
                      }
         }
     },
     error: (err:any)=>{
         console.log(err)
     }
 })
  }


}
