import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GridResponse } from '../grid/grid-response';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    getData(ngRequest: HttpRequest<any>) {
        return this.http.request<GridResponse>(ngRequest);
    }
}
