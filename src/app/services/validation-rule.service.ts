import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ValidationRule } from '../models/validation-rule';
import { ValidationRuleUserRole } from '../models/validation-rule-user-role';

@Injectable()
export class ValidationRuleService {

  constructor(private _http: HttpClient) { }

  getValidationRulePotentielUsers(validationRule: ValidationRule): Observable<User[]> {
    return this._http.post<User[]>(environment.API_ENDPOINT + '/api/ValidationRule/GetUsers', validationRule);
  }

  addValidationRule(validationRule: ValidationRule) {
    return this._http.post(environment.API_ENDPOINT + '/api/ValidationRule/', validationRule);
  }

  getValidationRuleUserRoles(validationRule: ValidationRule): Observable<ValidationRuleUserRole[]> {
    return this._http.post<ValidationRuleUserRole[]>(environment.API_ENDPOINT + '/api/ValidationRule/GetValidationRuleUserRoles', validationRule);
  }

}
