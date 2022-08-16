import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { BookSearchComponent } from './Book-Search/book-search.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PurchaseBookComponent } from './purchase-book/purchase-book.component';
import { RefundProcessComponent } from './refund-process/refund-process.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ReaderHomeComponent } from './reader-home/reader-home.component';


const routes:Routes = [
  { path: "ReaderHomePage", component: ReaderHomeComponent },
  { path: "BookList", component: BookListComponent },
  { path: "BookSearch", component: BookSearchComponent },
  { path: "BookPurchase/:id", component: PurchaseBookComponent },
  { path: "Refundbook", component: RefundProcessComponent },
  { path: "ViewInvoice", component: ViewInvoiceComponent },
  { path: "ViewPaymentHistory", component: PaymentHistoryComponent },
  { path: "ViewBook", component: ViewBookComponent }
]


@NgModule({
  declarations: [
    BookSearchComponent,
    BookListComponent,
    PaymentHistoryComponent,
    ViewBookComponent,
    ViewInvoiceComponent,
    RefundProcessComponent,
    PurchaseBookComponent,
    ReaderHomeComponent,
  ],
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ReaderModule { }

