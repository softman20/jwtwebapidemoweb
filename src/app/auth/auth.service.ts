import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';
import { error } from 'util';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService implements HttpInterceptor {

  refreshing: boolean = false;
 // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector, private _authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes(environment.API_ENDPOINT)) {
     
      if (!this._authenticationService.isAuthenticated()) {
        this._authenticationService.goToLogin();
      }
      return next.handle(this.setAuthorization(req,this._authenticationService.getToken())).catch(x=>this.handleErrors(x,req,next));
     
    }

    return next.handle(req);
  }
  private handleErrors(err: HttpErrorResponse,req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if (err instanceof HttpErrorResponse) {
              switch (err.status) {
                case 400:
                case 401:              
                  return this.refreshToken(req, next);
                  case 0:{
                    this._authenticationService.logout();
                  }
              }
            } else {
             // return Observable.throw(error);
            }
    // handle your auth error or rethrow
  //  return Observable.throw(err);
}
  private setAuthorization(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }
    return req;
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshing) {
      this.refreshing = true;
   
      return this._authenticationService.refreshToken()
      .switchMap((newToken: string) => {
          if (newToken) {
            this._authenticationService.deleteToken();
            this._authenticationService.setToken(newToken);
            return next.handle(this.setAuthorization(req, newToken));
          }
      })
      .catch(error => {
          return Observable.throw(error);
      })
      .finally(() => {
          this.refreshing = false;
      });

    }else return Observable.throw(error);
  //  return next.handle(req);
   // return Observable.throw(error);
  }
}

