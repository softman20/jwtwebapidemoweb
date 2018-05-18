import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class CompanyService {

  constructor(private _http :HttpClient) { }

  getCompanies(businessUnitId:number, processTypeId:string):Observable<Array<any>>{
    return this._http.get<Array<any>>(environment.API_ENDPOINT+`/api/company/${businessUnitId}/${processTypeId}`);
  }

  getCompaniesByBU(businessUnitId:number):Observable<Array<any>>{
    return this._http.get<Array<any>>(environment.API_ENDPOINT+`/api/company/GetByBU/${businessUnitId}`);
  }
}
