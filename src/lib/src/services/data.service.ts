import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
    constructor(private http: Http) { }

    getData(ngRequest: Request): Observable<Response> {
        return this.http.request(ngRequest);
    }
}
