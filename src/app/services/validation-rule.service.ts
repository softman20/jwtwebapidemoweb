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

  addValidationRule(validationRule: ValidationRule): Observable<number> {
    return this._http.post<number>(environment.API_ENDPOINT + '/api/ValidationRule/', validationRule);
  }
  addValidationRuleFromCopy(validationRule: ValidationRule,validationRuleCopy: ValidationRule): Observable<number> {
const body={ValidationRule:validationRule,ValidationRuleCopyFrom:validationRuleCopy};
    return this._http.post<number>(environment.API_ENDPOINT + '/api/ValidationRule/AddFromCopy', body);
  }
  

  getValidationRuleUserRoles(validationRule: ValidationRule): Observable<ValidationRuleUserRole[]> {
    return this._http.post<ValidationRuleUserRole[]>(environment.API_ENDPOINT + '/api/ValidationRule/GetValidationRuleUserRoles', validationRule);
  }

  deleteValidationRule(id:number){
    return this._http.delete(environment.API_ENDPOINT+'/api/ValidationRule/'+id);
  }

}
