import { Injectable, Inject }     from '@angular/core';
import { Http, Response, RequestMethod, Request, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// TODO: Add debounceTime?

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';

@Injectable()
export class TubularDataService {
    private userData = {
        isAuthenticated: false,
        username: '',
        bearerToken: '',
        expirationDate: null,
        role: '',
        refreshToken: ''
    }

    constructor(@Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider, private http: Http) { }
    
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

    authenticate(url: string, username: string, password: string, succesCallback?, errorCallback?, userDataCallback?) {
        this.removeAuthentication();
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers })
        return this.http.post(url, 'grant_type=password&username=' + username + '&password=' + password, options)
            .subscribe(data => {
                this.handleSuccesCallback(data, succesCallback, userDataCallback);
            }, err => {
                let error = {
                    errorBody: JSON.parse(err._body),
                    status: err.status
                };
                if (typeof errorCallback === 'function') {
                    errorCallback(error);
                }
            });
    }

    private handleSuccesCallback(data, succesCallback, userDataCallback) {
        data = JSON.parse(data._body);
        this.userData.isAuthenticated = true;
        this.userData.username = data.userName;
        this.userData.bearerToken = data.access_token;
        this.userData.expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
        this.userData.role = data.role;
        this.userData.refreshToken = data.refresh_token;

        this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
        
        if (typeof userDataCallback === 'function') {
            userDataCallback(data);
        }

        if (typeof succesCallback === 'function') {
            succesCallback();
        }
    }

     isAuthenticated() {
        if (!this.userData.isAuthenticated || this.isAuthenticationExpired(this.userData.expirationDate)) {
            try {
                this.retriveSaveData();
            } catch (e) {
                return false;
            }
        }

        return true;
    }

    private retriveSaveData() {
        let savedData = this.settingsProvider.get('auth_data');
        if (typeof savedData === 'undefined' || savedData == null) {
            throw 'No authentication exist';
        } else if (this.isAuthenticationExpired(savedData.expirationDate)) {
            throw 'Authentication token has already expired';
        } else {
            this.userData = savedData;
            this.setHttpAuthHeader();
        }
    }

    private isAuthenticationExpired(expirationDate) {
        let now = new Date();
        let expiration = new Date(expirationDate);

        return expiration.valueOf() - now.valueOf() <= 0;
    }

    private removeAuthentication() {
        this.settingsProvider.delete('auth_data');
        this.userData.isAuthenticated = false;
        this.userData.username = '';
        this.userData.bearerToken = '';
        this.userData.expirationDate = null;
        this.userData.role = '';
        this.userData.refreshToken = '';
    }

    private setHttpAuthHeader() {
        new Headers({ 'Authorization': 'Bearer ' + this.userData.bearerToken })
    }

    getData(url: string): Observable<any> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
}