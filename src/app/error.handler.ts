import { ErrorHandler } from "@angular/core";

export class MyErrorHandler implements ErrorHandler{
    handleError(e: any): void {
       console.log(e.message)
       console.log(e)
       console.log(new Date())
    }
}