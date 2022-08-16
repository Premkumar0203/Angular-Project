import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './author.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuardGuard implements CanActivate 
{
  constructor(private userService:UserService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree
    {
      if(!this.userService.valid )
      {
        alert('You are not allowed to view this page. You are redirected to login Page'); 
        this.router.navigate(["/Author/login"]);
        return false;
      }
      return true;
  }

  
}
