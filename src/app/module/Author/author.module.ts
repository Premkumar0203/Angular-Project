import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorBookListComponent } from './author-book-list/author-book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AuthorGuardGuard } from 'src/app/author-guard.guard';

const routes:Routes = [
  { path: "login", component: LoginpageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "BookList", component: AuthorBookListComponent ,canActivate: [AuthorGuardGuard] },
  { path: "CreateBook", component: CreateBookComponent ,canActivate: [AuthorGuardGuard] },
  { path: "EditBook/:id", component: EditBookComponent , canActivate: [AuthorGuardGuard] }
]


@NgModule({
  declarations: [
    LoginpageComponent,
    RegisterpageComponent,
    AuthorBookListComponent,
    CreateBookComponent,
    EditBookComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthorModule { }

