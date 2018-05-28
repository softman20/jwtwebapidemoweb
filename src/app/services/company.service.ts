import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Master } from '../models/master';

@Injectable()
export class CompanyService {

  constructor(private _http :HttpClient) { }

  getCompanies(businessUnitId:number, processTypeId:number):Observable<Array<Master>>{
    return this._http.get<Array<any>>(environment.API_ENDPOINT+`/api/company/${businessUnitId}/${processTypeId}`);
  }

  getAccountGroups(businessUnitId:number, processTypeId:number):Observable<Array<Master>>{
    return this._http.get<Array<any>>(environment.API_ENDPOINT+`/api/AccountGroup/${businessUnitId}/${processTypeId}`);
  }

  getCompaniesByBU(businessUnitId:number):Observable<Array<Master>>{
    return this._http.get<Array<any>>(environment.API_ENDPOINT+`/api/company/GetByBU/${businessUnitId}`);
  }
}
