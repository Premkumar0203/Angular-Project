import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DigitalBookService } from 'src/app/digital-book.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {

  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService)
  {
    this.myForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z]{5,15}")]),
      password1: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{5,15}")]),
      password2: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{5,15}")])
    });
  }
  ngOnInit(): void
   {
  }

  data:any = [];

  Register()
  {
    
    if(this.myForm.value.password1 != this.myForm.value.password2)
    {
      this.errorMessage = "The Password and Repeat Password must be Same";
    }else
    {
    const registerJson  = {"userName": this.myForm.value.name,
     "password":this.myForm.value.password1 };
    this.bookService.RegisterAuthor(registerJson)
    .subscribe({
     next: (res:any)=>{
         console.log("Response :"+res);
         this.data = [];
         this.data = res;
         this.errorMessage ="";
         console.log("Response :"+ JSON.stringify( this.data));
         console.log("this.paymentHistory.length == 0"+ (this.data.length == 0))
         if(this.data.length == 0 )
          { 
              this.errorMessage = "";
              console.log("errorMessage"+ (this.errorMessage))
              this.data = [];
         }
         else
         {
          if(this.data.message != null)
            {
                        this.errorMessage = this.data.message;
                        console.log("errorMessage"+ (this.errorMessage))
                        this.data = [];
             }
             if(this.data.userId > 0)
            {
                        this.errorMessage = "Author Creation Done";
                        console.log("errorMessage"+ (this.errorMessage))
                        this.data = [];
             }

         }
     },
     error: (err:any)=>{
         console.log(err)
     }
 })
  }
  }
}
