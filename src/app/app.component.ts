import { Component } from '@angular/core';
import { bindCallback } from "rxjs";
import { DigitalBookService } from './digital-book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
 {

  title = 'DigitalBooks';

  Books:any[] = [];

  constructor(private bookService:DigitalBookService){}

  ngOnInit(){
    this.findAllMovies();
}

findAllMovies(){
    this.bookService.findAll()
    .subscribe({
        next: (res:any)=>{
            console.log(res);
            this.Books = res;
        },
        error: (err:any)=>{
            console.log(err)
        }
    })
}

}
