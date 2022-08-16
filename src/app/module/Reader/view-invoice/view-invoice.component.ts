import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DigitalBookService } from '../../../digital-book.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private bookService:DigitalBookService)
  {
    this.myForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      paymentId: new FormControl("",[Validators.required,Validators.pattern("[0-9]{1,15}")])
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild('htmlData') htmlData!: ElementRef;
  paymentHistory:any[] = [];

  // DownloadInvoice()
  // {
  //   this.bookService.DownloadInvoice(this.myForm.value.email,this.myForm.value.paymentId) 
  //               .subscribe({
  //                 next: (res:any)=>{
  //                     console.log(res);
  //                     this.paymentHistory = res ;
  //                     this.errorMessage = "";
  //                     if(this.paymentHistory.length == 0 )
  //                     { 
  //                         this.errorMessage = "No invoice Found";
  //                         console.log("errorMessage"+ (this.errorMessage))
  //                         this.paymentHistory = [];
  //                     }
  //                     console.log(this.paymentHistory);
  
  //                 },
  //                 error: (err:any)=>{
  //                     console.log("error"+err)
  //                     this.errorMessage = "No Book Found";
  //                 }
  //     })
  // }

  Books:any[] = [];
  bookId:any = 0;

  fetchInvoice()
  {
       this.bookService.fetchInvoice(this.myForm.value.email,this.myForm.value.paymentId) 
              .subscribe({
                next: (res:any)=>{
                    console.log(res);
                    this.paymentHistory = res ;
                    this.errorMessage = "";
                    this.Books = [];
                    if(this.paymentHistory.length == 0 )
                    { 
                        this.errorMessage = "No invoice Found";
                        console.log("errorMessage"+ (this.errorMessage))
                        this.paymentHistory = [];
                    }
                    else
                    {
                      if(res.message != null)
                      {
                        this.errorMessage = "No Book Found";
                        console.log("errorMessage"+ (this.errorMessage))
                        this.Books = [];
                      }

                      for(let i=0;i<this.paymentHistory.length;i++)
                      {
                        console.log("Book Id "+this.paymentHistory[i].bookId);
                         this.bookId =  parseInt(this.paymentHistory[i].bookId); 
                         this.bookService.FetchBook1(this.myForm.value.email,this.bookId ) 
                         .subscribe({
                           next: (res:any)=>{
                               console.log(res);
                               this.Books = res ;
                               this.errorMessage = "";
                               if(this.Books.length == 0 )
                               { 
                                   this.errorMessage = "No Book Found";
                                   console.log("errorMessage"+ (this.errorMessage))
                                   this.Books = [];
                               }
                               else
                               {
                                 
                                 for(let i=0;i<this.Books.length;i++)
                                 {
                                   let logo =  String(this.Books[i].logo); 
                                   console.log("Before Logo Changes :" +logo);
                                   logo = logo.replace("c:/picture/","../../assets/")
                                   logo = logo.replace("C:\\fakepath\\","../../assets/")
                                   console.log("After Logo Changes :" +logo);
                                   this.Books[i].logo =logo;
                                 }
             
                               }
                           },
                           error: (err:any)=>{
                               console.log("error"+err)
                               this.errorMessage = "No Book Found";
                           }
               })
                      }

                    }
              
                    console.log(this.paymentHistory);

                },
                error: (err:any)=>{
                    console.log("error"+err)
                    this.errorMessage = "No Book Found";
                }
    })
   

  }

 

  public DownloadInvoice(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.myForm.value.email+'.pdf');
    });
  }

}
