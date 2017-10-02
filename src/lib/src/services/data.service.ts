import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GridResponse } from '../grid/grid-response';

@Injectable()
export class DataService {
    constructor(private http: Http) { }

    getData(ngRequest: Request): Observable<GridResponse> {
        return this.http.request(ngRequest).map(r => r.json() as GridResponse);
    }
}
