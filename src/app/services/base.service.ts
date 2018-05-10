import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export abstract class BaseService {

  constructor() { }
  protected handleError(error: HttpErrorResponse): Observable<any> {
    if (error) {
        return Observable.throw(error);
    }

    return Observable.throw(error);
}

protected httpParamSerializer(obj: any): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var element = obj[key];
            params.set(key, element);
        }
    }

    return params;
}
}
