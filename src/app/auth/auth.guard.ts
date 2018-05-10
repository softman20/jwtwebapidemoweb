import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private router: Router, private authenticationService: AuthenticationService, private _userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isAuthenticated()) {
      let roles = next.data["roles"] as Array<string>;
      if (roles) {
        var match = this._userService.roleMatch(roles);
        if (match) return true;
        else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      } else
        return true;

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }



}
