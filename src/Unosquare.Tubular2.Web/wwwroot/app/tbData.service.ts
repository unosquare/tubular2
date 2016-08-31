import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// TODO: Add debounceTime?

@Injectable()
export class TbDataService {
    constructor(private http: Http) { }

    retrieveData(url: string, req: any): Observable<any> {
        return this.http.post(url, req)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();

        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        return Observable.throw(errMsg);
    }
}