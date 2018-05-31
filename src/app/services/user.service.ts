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
import { BusinessUnitService } from './business-unit.service';
import { Subject } from 'rxjs';

@Injectable()
export class UserService extends BaseService {

  private _currentUser: { token: string, object: User };
  private _currentUserBusinessUnit: BusinessUnit;
  private _allUsers: Observable<User[]>;
  private USER_BUSINESSUNIT_KEY: string = '_user_businessunit';

  public onBusinessUnitChanged$: Subject<BusinessUnit>;

  constructor(private businessUnitService: BusinessUnitService, private _http: HttpClient, private authenticationService: AuthenticationService) {
    super();
    this.onBusinessUnitChanged$ = new Subject();
  }


  getBusinessUnit(): BusinessUnit {
    if (this._currentUserBusinessUnit) {
      return this._currentUserBusinessUnit;
    }

    if (!this._currentUser || !this._currentUser.object || !this._currentUser.object.BusinessUnits || this._currentUser.object.BusinessUnits.length === 0) {
      return null;
    }

    let cacheBusinessUnitId = +localStorage.getItem(this.USER_BUSINESSUNIT_KEY);
    if (cacheBusinessUnitId) {
      this._currentUserBusinessUnit = _.find(this._currentUser.object.BusinessUnits, (o) => {
        return o.Id === cacheBusinessUnitId;
      });
      this.setBusinessUnit(this._currentUserBusinessUnit.Id);
      return this._currentUserBusinessUnit;
    } else {
      let currentBu = this._currentUser.object.BusinessUnits[0];
      this.setBusinessUnit(currentBu.Id);
      return currentBu;
    }
  }

  getAllUsers(): Observable<User[]> {
    if (this._allUsers)
      return this._allUsers;

    return this.getUsers();
  }

  public setBusinessUnit(id: number) {
    if (id) {
      let businessUnit = _.find(this._currentUser.object.BusinessUnits, (o) => {
        // tslint:disable-next-line:triple-equals
        return o.Id == id;
      });
      this._currentUserBusinessUnit = businessUnit;
      localStorage.setItem(this.USER_BUSINESSUNIT_KEY, String(id));
      this.onBusinessUnitChanged$.next(businessUnit);
    }
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

  public get(): Observable<User> {
    if (!this.authenticationService.isAuthenticated) {
      return Observable.empty<User>();
    }

    return new Observable((observer) => {
      let token = this.authenticationService.getToken();

      if (!this._currentUser || this._currentUser.token !== token) {

        let obj = this._parseJwt(token);
        let user: User = new User();
        user.Email = obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        user.LastName = obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        user.FirstName = obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
        user.SgId = obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        user.Gender = obj['gender'];
        user.ValidAvatar=obj['validAvatar']=='True';
        user.IsSuperAdmin=obj['isSuperAdmin']=='True';
        if (user.LastName.indexOf(",") > 0)
          user.LastName = user.LastName.substring(0, user.LastName.indexOf(","));
        //user.userName = obj['sgid'];
        let BusinessUnits: string[] = _.compact(_.split(obj['businessUnits'], ','));

        if (BusinessUnits && BusinessUnits.length > 0) {
          this.businessUnitService.listByIds(BusinessUnits).subscribe(response => {
            user.BusinessUnits = response;
            this._currentUser = { token: token, object: user };
            observer.next(user);
            observer.complete();
          });
        } else {
          this._currentUser = { token: token, object: user };
          observer.next(user);
          observer.complete();
        }
      } else {
        observer.next(this._currentUser.object);
        observer.complete();
      }
    });
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(environment.API_ENDPOINT + '/api/Users/');
  }
  getUser(id: string): Observable<User> {
    return this._http.get<User>(environment.API_ENDPOINT + '/api/Users/' + id);
  }

  getUserFromLDAP(sgid: string): Observable<LdapUser> {
    let urlTOCall: string = `${environment.LDAP_API_ENDPOINT}${sgid}?KeyID=${environment.LDAP_API_KEY}&_fields=cn,mail,preferredGivenName,preferredName,givenName,sn,personalTitle`;
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
  getAllBusinessUnits(): Observable<BusinessUnit[]> {
    return this._http.get<BusinessUnit[]>(environment.API_ENDPOINT + '/api/businessunit/');
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    let userRoles: string[] = this.getBusinessUnit().Roles;
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
