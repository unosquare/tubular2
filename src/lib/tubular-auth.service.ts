import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response, RequestMethod, Request, Headers, RequestOptions } from '@angular/http';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TubularAuthService {

    private userData = {
        isAuthenticated: false,
        username: '',
        bearerToken: '',
        expirationDate: null,
        role: '',
        refreshToken: ''
    }

    private useRefreshTokens = false;
    private tokenUrl;
    private authHeader = null;
    private requireAuthentication = true;
    private refreshTokenUrl = this.tokenUrl = '/api/token';

    constructor( @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider, private http: Http) { }

    setTokenUrl(url: string): void {
        this.tokenUrl = url;
    }

    setRefreshTokenUrl(url: string): void {
        this.refreshTokenUrl = url;
    }

    enableRefreshTokens(): void {
        this.useRefreshTokens = true;
    }

    isUsingRefreshTokens(): boolean {
        return this.useRefreshTokens;
    }

    getRefreshTokenUrl(): string {
        return this.refreshTokenUrl;
    }

    setAccessTokenAsExpired(): void {
        this.userData.expirationDate = new Date(new Date().getTime() - 10 * 1000);
        this.saveAuthData();
    }

    removeAuthData(): void {
        this.settingsProvider.delete('auth_data');
    }

    saveAuthData(): void {
        this.removeAuthData();

        if (this.settingsProvider)
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
    }

    authenticate(username: string, password: string, successCallback?, errorCallback?) {
        this.removeAuthentication();
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.tokenUrl, 'grant_type=password&username=' + username + '&password=' + password, options)
            .map(data => this.handleSuccessCallback(data))
            .catch((err: Error) => this.handleAuthError(err, errorCallback));
    }

    handleAuthError(err: any, errorCallback) {
        let error = {
            errorBody: JSON.parse(err._body),
            status: err.status
        };

        if (typeof errorCallback != null)
            errorCallback(error);

        return Observable.throw(error);
    }

    removeAuthentication() {
        if (this.settingsProvider)
            this.settingsProvider.delete('auth_data');

        this.userData.isAuthenticated = false;
        this.userData.username = '';
        this.userData.bearerToken = '';
        this.userData.expirationDate = null;
        this.userData.role = '';
        this.userData.refreshToken = '';

        if (this.settingsProvider)
            this.settingsProvider.delete('auth_Header');
    }

    private handleSuccessCallback(data) {
        data = JSON.parse(data._body);
        this.userData.isAuthenticated = true;
        this.userData.username = data.userName;
        this.userData.bearerToken = data.access_token;
        this.userData.expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
        this.userData.role = data.role;
        this.userData.refreshToken = data.refresh_token;

        if (this.settingsProvider)
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
    }

    isValidSession() {
        if (!this.userData.isAuthenticated || this.isDateExpired(this.userData.expirationDate)) {
            try {
                this.retriveSaveData();
            } catch (e) {
                return false;
            }
        }

        return true;
    }

    private retriveSaveData() {
        let savedData = this.settingsProvider.get('auth_data') ? JSON.parse(this.settingsProvider.get('auth_data')) : null;
        if (typeof savedData === 'undefined' || savedData == null) {
            throw 'No authentication exist';
        } else if (this.isDateExpired(savedData.expirationDate)) {
            throw 'Authentication token has already expired';
        }
    }

    private isDateExpired(expirationDate) {
        let now = new Date();
        let expiration = new Date(expirationDate);

        return expiration.valueOf() - now.valueOf() <= 0;
    }

    isAuthTokenExpired() {
        return this.isDateExpired(this.userData.expirationDate);
    }

    addAuthHeaderToRequest(request: Request) {
        if (request.headers = null) {
            request.headers = new Headers();
        }

        if (request.headers.has('Authorization')) {
            request.headers.delete('Authorization');
        }

        request.headers.append('Authorization', 'Bearer ' + this.userData.bearerToken);
    }


    refreshSession(): Observable<any> {
        let refreshToken = this.userData.refreshToken;
        this.removeAuthentication();

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.getRefreshTokenUrl(), 'grant_type=refresh_token&refresh_token=' + refreshToken, options)
            .mergeMap((response) => {
                this.handleSuccessCallback(response);
                if (this.isValidSession()) {
                    return Observable.create(true);
                }
                else {
                    return Observable.throw("error");
                }
            })
            .map(() => { return true; });
    }
}