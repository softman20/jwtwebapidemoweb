import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, ResponseType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

  private TOKEN_KEY: string = '_token';
  private USER_BUSINESSUNIT_KEY: string = '_user_businessunit';
  constructor(private http: HttpClient) { }

  /**
  * Login user by sso
  * It will redirect user to the cas server login page
  * Returns
  */
  public goToLogin(){
    this.deleteToken();
    let originUrl = window.location.origin;
    window.location.href = `${originUrl}/login`;
  }

  /**
  * Login user by sso
  * It will redirect user to the SSO server login page
  * Returns
  */
  public goToSSO(){
    this.deleteToken();
    let loginUrl = environment.API_ENDPOINT + '/login';
    let originUrl = window.location.origin;
    window.location.href = `${loginUrl}?returnUrl=${originUrl}`;
  }

  /**
  * logout user
  * Returns
  */
  public logout() {
    this.deleteToken();
    this.goToLogin();
    // let url = environment.API_ENDPOINT + "/logout";
    // return this.http.get(url)
    // .do(response => {
    //   this.deleteToken();
    // });
  }

  /**
  * Refresh token
  * Returns {Observable<string>}
  */
  public refreshToken() : Observable<string> {
    let token =( this.getToken());
    let url = environment.API_ENDPOINT + `/refreshToken?token=${token}`;    
    return this.http.get(url,{responseType:'text'});  
  } 

  /**
  * Check if user client is authenticated
  * Returns {boolean}
  */
  public isAuthenticated(){
    return Boolean(this.getToken());
  }

  /**
  * Get authentication token.
  * Returns {string} token
  */
  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
  * Set authentication token.
  * Returns {void}
  *@param {string} token
  */
  public setToken(value: string) {
    if(value){
      localStorage.setItem(this.TOKEN_KEY, value);
    }
  }

  /**
  * Remove token.
  * Returns {void}
  */
  public deleteToken() {
    var currentToken = localStorage.getItem(this.TOKEN_KEY);
    if (currentToken) {
        localStorage.removeItem(this.TOKEN_KEY);
    }
    var currentBU = localStorage.getItem(this.USER_BUSINESSUNIT_KEY);
    if (currentBU) {
        localStorage.removeItem(this.USER_BUSINESSUNIT_KEY);
    }    
  }

  private handleError(error: Response): Observable<any> {
    if(error)
    {
        var errorJson = error.json();
        if (errorJson) {
            return Observable.throw(errorJson.message || error);
        }
    }
    
    return Observable.throw(error);
  }

  private httpParamSerializer(obj: any): URLSearchParams {
      let params: URLSearchParams = new URLSearchParams();

      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              var element = obj[key];
              params.set(key, element);
          }
      }

      return params;
  }
}
