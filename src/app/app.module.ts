import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { MyErrorHandler } from "./error.handler";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";


const routes:Routes = [
  { path: 'Author', loadChildren: ()=>import("./module/Author/author.module")
              .then(module=>module.AuthorModule) },
  { path: 'Reader', loadChildren: ()=>import("./module/Reader/reader.module")
              .then(module=>module.ReaderModule) },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterPageComponent,
   
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    ReactiveFormsModule,RouterModule.forRoot(routes),
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ],
  exports: [ RouterModule ],
  providers: [CookieService,{provide: ErrorHandler, useClass: MyErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }