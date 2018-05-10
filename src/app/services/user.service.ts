import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { filter, map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import * as _ from "lodash";
import { LdapUser } from '../models/ldapUser.model';
import { BaseService } from './base.service';
import { BusinessUnit } from '../models/business-unit';

@Injectable()
export class UserService extends BaseService {




  
  constructor(private _http: HttpClient, private authenticationService: AuthenticationService) {
    super();
  }

  getUserRoles(): string[] {
    let roles: string[];
    let token = this.authenticationService.getToken();
    if (token) {
      var obj = this._parseJwt(token);
      roles = _.compact(_.split(obj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], ","));
    }

    return roles;
  }
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(environment.API_ENDPOINT + '/api/Users/');
  }
  getUser(id: string): Observable<User> {
    return this._http.get<User>(environment.API_ENDPOINT + '/api/Users/' + id);
  }

  getUserFromLDAP(sgid:string):Observable<LdapUser>{
    let urlTOCall:string = `${environment.LDAP_API_ENDPOINT}${sgid}?KeyID=${environment.LDAP_API_KEY}&_fields=cn,mail,preferredGivenName,preferredName,givenName,sn`; 
    return this._http.get<LdapUser>(urlTOCall);
  }

  registerUser(user: User) {
  
    return this._http.post(environment.API_ENDPOINT + '/api/Users/', user)
  ;
  }
  updateUser(user: User, id: string) {
  
    return this._http.put(environment.API_ENDPOINT + '/api/Users/' + id, user);
  }

  deleteUser(sgid: string) {
    return this._http.delete(environment.API_ENDPOINT + '/api/Users/' + sgid);
  }
  getAllRoles() {
    return this._http.get(environment.API_ENDPOINT + '/api/role/');
  }
  getAllBusinessUnits():Observable<BusinessUnit[]> {
    return this._http.get<BusinessUnit[]>(environment.API_ENDPOINT + '/api/businessunit/');
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    let userRoles:string[]= this.getUserRoles();
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }

    });
    return isMatch;
  }

  private _parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
