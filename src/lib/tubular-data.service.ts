import { Injectable }     from '@angular/core';
import { Http, Response, RequestMethod, Request, Headers } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// TODO: Add debounceTime?

@Injectable()
export class TubularDataService {
    constructor(private http: Http) { }
    
    retrieveData(url: string, req: any) : Observable<any> {
        req.columns.forEach(this.transformSortDirection);

        return this.http.post(url, req)
            .map(this.extractData)
            .catch(this.handleError);
    }

    save(url: string, row: any, method: RequestMethod = RequestMethod.Post): Observable<any> {
        return this.http.request(new Request({
            method: method,
            url: url,
            body : row
        }))
            .map(this.extractData)
            .catch(this.handleError); 
    }

    private transformSortDirection(column) {
        switch (column.direction) {
            case 1:
                column.sortDirection = 'Ascending';
                break;
            case 2:
                column.sortDirection = 'Descending';
                break;
            default:
                column.sortDirection = 'None';
        }
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        return Observable.throw(errMsg);
    }

    private authenticate(url: string, username: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, 'grant_type=password&username=' + username + '&password=' + password, { headers })
            .map((data: Response) => {
                localStorage.setItem('auth_data', JSON.stringify(data));
            })
            .catch(this.handleError);
    }
}