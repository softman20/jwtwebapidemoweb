import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeGuard implements CanActivate {
  /**
   *
   */
  constructor(private router:Router) {
    
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let returnUrl = route.queryParams["returnurl"];
      let token = route.queryParams["token"];
      if(token){
          this.router.navigate(['/oauth-completed'], { queryParams: { 'token': token, 'returnurl': returnUrl }});
          return false;
      }
      return true;
  }
}
