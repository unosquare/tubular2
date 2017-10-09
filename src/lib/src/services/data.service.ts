import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GridResponse } from '../grid/grid-response';

@Injectable()
export class DataService {
    constructor(private http: Http) { }

    getData(ngRequest: Request): Observable<any> {
        return this.http.request(ngRequest)
            .map(r => r.json() as GridResponse)
            .catch(this._handleError);
    }

    private _handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return Observable.throw(errMsg);
    }
}
