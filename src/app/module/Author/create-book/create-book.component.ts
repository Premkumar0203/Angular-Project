import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DigitalBookService } from 'src/app/digital-book.service';
import { FileUploadService } from 'src/app/file-upload.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  CategoryList = ["Fantasy","Sci-Fi","Mystery","Romance"];

  myForm : FormGroup;
  token:any= "";


  ngOnInit(): void {
  }

  errorMessage="";

  constructor(private bookService:DigitalBookService,
    private service: CookieService,private router: Router,
    private http: HttpClient)
  {
   
    this.myForm = new FormGroup({
      title: new FormControl("",[Validators.required]),
      genre: new FormControl("",[Validators.required]),
      price:new FormControl("0",[Validators.required]),
      // author: new FormControl("",[Validators.required]),
      publisher: new FormControl("",[Validators.required]),
      logo: new FormControl("",[Validators.required]),
      content: new FormControl("",[Validators.required]),
      status: new FormControl("1",[Validators.required]),
    });
  }

  selectedFile : any = null;

  onFileSelected(event:any){
    this.selectedFile = <File> event.target.files[0];
  }
	
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:4200/assets', fd)
      .subscribe(res => {
        console.log(res);
      });

  }

  Books:any = [];

  CreateBook()
  {
    this.onUpload();
    this.token = this.service.get('TokenId');
    const registerJson  = {
          "title": this.myForm.value.title,
          "category":this.myForm.value.genre,
          "price": this.myForm.value.price,
          // "author":this.myForm.value.author,
          "publisher": this.myForm.value.publisher,
          "logo":this.myForm.value.logo,
          "content": this.myForm.value.content,
          "status":parseInt(this.myForm.value.status),
   };
   console.log("Token :"+ this.token);
   if(this.token != "")
        this.router.navigateByUrl('/Author/login')

   console.log("Category :"+this.myForm.value.genre);
    this.bookService.CreateBook(this.token,registerJson).subscribe({
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
