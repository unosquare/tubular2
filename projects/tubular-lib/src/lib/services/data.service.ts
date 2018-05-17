import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GridResponse } from '../grid/grid-response';

@Injectable()
export class DataService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
            return next.handle(req);
    }
}
