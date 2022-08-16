import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigitalBookService {
 
  
  constructor(private http:HttpClient) { }

  private host:string = "http://localhost:9070/api/v1/digitalbooks/author/books/";

  findAll()
  {
    return this.http.get(this.host);
  }

  FetchPaymentHistory(emailId :String)
  {
    let url = "http://localhost:9070/api/v1/digitalbooks/readers?emailId="
    return this.http.get(url+emailId); 
  }

  FetchBook(emailId :String,searchBy:String,id :String)
  {
    let url = "http://localhost:9070/api/v1/digitalbooks/readers/"+emailId;
    if( String(searchBy) == "Book Id" )
    {
      url = url + "/books/" + parseInt(String(id))
      console.log(url);
      return this.http.get(url); 

    }
    else 
    {
      url = url + "/book?PaymentId=" + id
      console.log(url);
      return this.http.get(url); 
    }
    
  }

  SearchBook(category:string,author:string,publisher:string,price:String)
  {
    let url = "http://localhost:9070/api/v1/digitalbooks/books/search?category="
          +category + "&author="+author+ "&price="+price +"&publisher="+publisher;
    console.log(url);
    return this.http.get(url); 
  }

  fetchInvoice(email: string, paymentId: string)
   {
    let url = "http://localhost:9070/api/v1/digitalbooks/readers/"
          +email + "/invoice?PaymentId="+String(paymentId);
    console.log(url);
    return this.http.get(url); 
  }

  DownloadInvoice(email: string, paymentId: string): Observable<Blob>
  {
    let url = "http://localhost:9070/api/v1/digitalbooks/readers/"
    +email + "/DocumentInvoice?PaymentId="+String(paymentId);
    console.log(url);
    //return this.http.get(url); 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                  responseType : 'blob'});  
   return this.http.get<Blob>(url, { headers : headers,responseType : 
                    'blob' as 'json'});
  }

  FetchBook1(emailId :String,id :String)
  {
    let url = "http://localhost:9070/api/v1/digitalbooks/readers/"+emailId; 
    url = url + "/books/" + parseInt(String(id))
    console.log(url);
    return this.http.get(url);     
  }

  RefundProcess(email: String, bookId: String) 
  {
    let url = "http://localhost:9070/api/v1/digitalbooks/readers/"+email; 
    url = url + "/books/" + parseInt(String(bookId))+"/refund"
    console.log(url);
    return this.http.get(url); 
  }

  RegisterAuthor(registerJson: { userName: String; password: String; })
    {
   let url = "http://localhost:9070/api/v1/digitalbooks/author/signup"; 
   console.log(url);
   const headers = { 'content-type': 'application/json'}  
   const body=JSON.stringify(registerJson);
   console.log(body)
   return this.http.post(url,body,{'headers':headers});
    }

Login(registerJson: { username: any; password: any; })
    {
        let url = "http://localhost:9070/api/v1/digitalbooks/author/authenicate"; 
        console.log(url);
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(registerJson);
        console.log(body)
        return this.http.post(url,body,{'headers':headers});
    }

    findAllBookBelongToAuthor(token:String)
    {

      let url = "http://localhost:9070/api/v1/digitalbooks/author/GetBooks"; 
      console.log(url);
      console.log("Token:"+token);
      return this.http.get(url, {headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )});

    }

    CreateBook(token: any, 
      registerJson: { title: any; category: any; price:
         any;  publisher: any; logo: any; 
         content: any; status: any; })
    {
       let url = "http://localhost:9070/api/v1/digitalbooks/author/books"; 
        console.log(url);
       // const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(registerJson);
        console.log(body)
        return this.http.post(url,body,{headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}` )
          .set('content-type','application/json')} );
    }

    ChangeStatusButton(token: any, BookId: any,status:any)
    {
      let url = "http://localhost:9070/api/v1/digitalbooks/author/books/"+parseInt(BookId)
      +"/status/"; 
      if(parseInt(status) == 1)
          url += 2;
      if(parseInt(status) == 2)
         url += 1;
      console.log(url);
      console.log("Token:"+token);
      return this.http.get(url, {headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )});
    }

    getBooksDetails(token: any, bookId: number) 
    {
      let url = "http://localhost:9070/api/v1/digitalbooks/author/BookId/" +bookId; 
      console.log(url);
      return this.http.get(url, {headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )});
    }


    EditBook(token: any, registerJson: { price: any;publisher: any;logo: any;content: any; }, 
                        id:any)
    {
       let url = "http://localhost:9070/api/v1/digitalbooks/author/books/"
                             +parseInt(id); 
        console.log(url);
        const body=JSON.stringify(registerJson);
        console.log(body)
        return this.http.post(url,body,{headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}` )
          .set('content-type','application/json')} );
    }


    PurchaseBook(token: any, registerJson: { bookId: number; name: any; emailId: any; })
     {

      let url = "http://localhost:9070/api/v1/digitalbooks/books/buy"; 
      console.log(url);
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(registerJson);
      console.log(body)
      return this.http.post(url,body,{'headers':headers});
    }

  
    errorHandler=(e:any)=>{
      throw e;
  }


}
