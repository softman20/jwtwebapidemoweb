import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ValidationRule } from '../models/validation-rule';

@Injectable()
export class ValidationRuleService {

  constructor(private _http: HttpClient) { }

  getValidationRuleProviders(validationRule:ValidationRule):Observable<User[]> {
    return this._http.post<User[]>(environment.API_ENDPOINT+'/api/ValidationRule/GetUsers',validationRule);
      }

}
