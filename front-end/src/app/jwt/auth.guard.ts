import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user:any
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   this.user= JSON.parse(window.localStorage.getItem('User'));
   //this.user= window.localStorage.getItem('User');

    console.log(this.user)
    if (this.user) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
   
  }

  
  
}
