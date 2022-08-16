import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/author.service';
import { DigitalBookService } from 'src/app/digital-book.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService, private service: CookieService,
    private router: Router, private userService:UserService)
  {
    
    this.myForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z]{5,15}")]),
      password: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{5,15}")]),
    });
  }
  ngOnInit(): void
   {
  }

  data:any = [];

  Login()
  {
 
    this.userService.name= this.myForm.value.name;
    const registerJson  = { "username": this.myForm.value.name,
     "password":this.myForm.value.password };
    this.bookService.Login(registerJson)
    .subscribe({
     next: (res:any)=>{
         this.data = [];
         this.data = res;
         this.errorMessage ="";
         if(this.data.length == 0 )
          { 
              this.errorMessage = "";
              console.log("errorMessage"+ (this.errorMessage))
              this.data = [];
         }
         else
         {
          if(this.data.token != null)
            {
              this.service.set("TokenId", this.data.token);
              this.errorMessage = this.data.message;
              console.log("errorMessage"+ (this.data.token))
              this.data = [];
              this.userService.valid = true;
              this.router.navigateByUrl('/Author/BookList');

            }

         }
     },
     error: (err:any)=>{
         console.log(err)
     }
 })

  }

}
