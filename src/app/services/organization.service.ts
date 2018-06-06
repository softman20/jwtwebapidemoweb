import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Master } from '../models/master';
import { environment } from '../../environments/environment';

@Injectable()
export class OrganizationService {

  constructor(private _http:HttpClient) {

   }

   getOrganizations(businessUnitId:number, processTypeId:number):Observable<Master[]>{
    return this._http.get<Master[]>(environment.API_ENDPOINT+'/api/Organization/'+businessUnitId+'/'+processTypeId);
   }

}
