import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BusinessUnit } from '../models/business-unit';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class BusinessUnitService {

 
  constructor(private _httpClient :HttpClient,private _authenticationService:AuthenticationService) {

   }

getUserBU(){
//this._authenticationService.goToSSO
}

listByIds(ids: number[] | string[]): Observable<Array<BusinessUnit>> {
  if(!ids || ids.length===0){
    return Observable.empty<Array<BusinessUnit>>();
  }

  let idsQueryString = '';
    for (let i = 0; i < ids.length; i++) {
      if (i > 0) {
        idsQueryString += '&';
      }

      idsQueryString += 'ids=' + ids[i];
    }

    const url = environment.API_ENDPOINT +'/api/BusinessUnitByIds'+ `?${idsQueryString}`;

    return this._httpClient.get<Array<BusinessUnit>>(url);
}

}
