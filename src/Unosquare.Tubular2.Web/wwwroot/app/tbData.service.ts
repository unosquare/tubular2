import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TbDataService {
    constructor(private http: Http) { }

    retrieveData(url: string, req: any): Observable<any> {
        let extraDataWithRequest = res => this.extractData(res, req);

        return this.http.post(url, req)
            .map(extraDataWithRequest)
            .catch(this.handleError);
    }

    private transformToObj(columns: any, data: any) {
        let obj = {};

        columns.forEach((column, key) => obj[column.Name] = data[key] || data[column.Name]);

        return obj;
    }

    private extractData(res: Response, req: any) {
        let body = res.json();
        let transform = data => this.transformToObj(req.Columns, data);

        return (body.Payload || {}).map(transform);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        return Observable.throw(errMsg);
    }
}