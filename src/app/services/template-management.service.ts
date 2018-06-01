import { Injectable } from '@angular/core';
 
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TemplateControl } from '../models/template-control';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TemplateManagementService {

  constructor(private _http :HttpClient) { }

  getTemplateControls():Observable<TemplateControl[]>{
    return this._http.get<TemplateControl[]>(environment.API_ENDPOINT+'/api/TemplateManagement/');
  }

}
