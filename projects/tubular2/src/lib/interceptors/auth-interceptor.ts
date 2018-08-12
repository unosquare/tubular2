import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authData = JSON.parse(localStorage.getItem('auth_data'));

        if (authData) {
            const headers = req.headers;
            headers.append('Authorization', authData.bearerToken);
            const authReq = req.clone({ headers: headers });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
