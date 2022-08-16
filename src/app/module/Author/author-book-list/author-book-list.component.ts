import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/author.service';
import { DigitalBookService } from 'src/app/digital-book.service';

@Component({
  selector: 'app-author-book-list',
  templateUrl: './author-book-list.component.html',
  styleUrls: ['./author-book-list.component.scss']
})
export class AuthorBookListComponent implements OnInit {

  constructor(private bookService:DigitalBookService,private service: CookieService,
    private router: Router,private userService:UserService) { }

  ngOnInit(): void
  {

    if(this.service.get('TokenId') != null)
      this.findAllBookBelongToAuthor();
    else
    this.router.navigateByUrl('/Author/login');

  }

  Books:any =[];
  token:any= "";

  findAllBookBelongToAuthor()
  {
    this.token = this.service.get('TokenId');
    if(this.service.get('TokenId') == null )
    {
      this.router.navigateByUrl('/Author/login');
    }
    this.bookService.findAllBookBelongToAuthor(this.token).subscribe({
            next: (res:any)=>{
                console.log(res);
                this.Books = res;
                for(let i=0;i<this.Books.length;i++)
                  {
                    let logo =  String(this.Books[i].logo); 
                    logo = logo.replace("c:/picture/","../../assets/")
                    logo = logo.replace("C:\\fakepath\\","../../assets/")
                    this.Books[i].logo =logo;
                  }
            },
            error: (err:any)=>{
                console.log(err)
            }
    })
}

  errorMessage ="";

  Logout()
  {
    this.service.delete('TokenId');
    this.userService.valid = false;
    this.router.navigateByUrl('/Author/login');
  }

  ChangeStatusButton(BookId:any,status:any)
  {
    this.token = this.service.get('TokenId');
    this.bookService.ChangeStatusButton(this.token,BookId,status).subscribe({
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
                  this.findAllBookBelongToAuthor();
                }
            },
            error: (err:any)=>{
                this.errorMessage = err.status;
                console.log(err.status)
            }
    })
  }

  CreateBook()
  {
    this.router.navigateByUrl('/Author/CreateBook');

  }


}
