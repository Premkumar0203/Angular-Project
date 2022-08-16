import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DigitalBookService } from '../../../digital-book.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  paymentHistory:any[] = [];

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService){
    this.myForm = new FormGroup(
      {
        emailId: new FormControl("",[Validators.required]),
    });
  }


  fetchPaymentHistory()
  {
       this.bookService.FetchPaymentHistory(this.myForm.value.emailId)
       .subscribe({
        next: (res:any)=>{
            console.log(res);
            this.paymentHistory = res;
            this.errorMessage ="";
            console.log("this.paymentHistory.length == 0"+ (this.paymentHistory.length == 0))
            if(this.paymentHistory.length == 0 )
             { 
                 this.errorMessage = "No Payment History Found";
                 console.log("errorMessage"+ (this.errorMessage))
                 this.paymentHistory = [];
            }
        },
        error: (err:any)=>{
            console.log(err)
            this.errorMessage = "No Payment History Found";
        }
    })
  }

  errorMessage: string = "";


 

  ngOnInit()
  {

  }




}
