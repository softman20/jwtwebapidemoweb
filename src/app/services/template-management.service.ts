import { Injectable } from '@angular/core';
 
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TemplateControl } from '../models/template-control';
import { Observable } from 'rxjs/Observable';
import { TemplateSelectionRule } from '../models/template-selection-rule';

@Injectable()
export class TemplateManagementService {

  constructor(private _http :HttpClient) { }

  getTemplateControls(templateSelectionRule:TemplateSelectionRule):Observable<TemplateControl[]>{
    return this._http.post<TemplateControl[]>(environment.API_ENDPOINT+'/api/TemplateManagement/',templateSelectionRule);
  }

}
