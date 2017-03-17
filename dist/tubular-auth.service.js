"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const tubular_settings_service_1 = require("./tubular-settings.service");
const Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
let TubularAuthService = class TubularAuthService {
    constructor(settingsProvider, http) {
        this.settingsProvider = settingsProvider;
        this.http = http;
        this.userData = {
            isAuthenticated: false,
            username: '',
            bearerToken: '',
            expirationDate: null,
            role: '',
            refreshToken: ''
        };
        this.useRefreshTokens = false;
        this.authHeader = null;
        this.requireAuthentication = true;
        this.refreshTokenUrl = this.tokenUrl = '/api/token';
    }
    setTokenUrl(url) {
        this.tokenUrl = url;
    }
    setRefreshTokenUrl(url) {
        this.refreshTokenUrl = url;
    }
    enableRefreshTokens() {
        this.useRefreshTokens = true;
    }
    isUsingRefreshTokens() {
        return this.useRefreshTokens;
    }
    getRefreshTokenUrl() {
        return this.refreshTokenUrl;
    }
    setAccessTokenAsExpired() {
        this.userData.expirationDate = new Date(new Date().getTime() - 10 * 1000);
        this.saveAuthData();
    }
    authenticate(username, password) {
        this.removeAuthentication();
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new http_1.RequestOptions({ headers });
        return this.http.post(this.tokenUrl, `grant_type=password&username=${username}&password=${password}`, options)
            .map((data) => this.handleSuccessCallback(data));
    }
    removeAuthentication() {
        if (this.settingsProvider) {
            this.settingsProvider.delete('auth_data');
        }
        this.userData.isAuthenticated = false;
        this.userData.username = '';
        this.userData.bearerToken = '';
        this.userData.expirationDate = null;
        this.userData.role = '';
        this.userData.refreshToken = '';
        if (this.settingsProvider) {
            this.settingsProvider.delete('auth_Header');
        }
    }
    isValidSession() {
        if (!this.userData.isAuthenticated || this.isDateExpired(this.userData.expirationDate)) {
            try {
                this.retriveSaveData();
            }
            catch (e) {
                return false;
            }
        }
        return true;
    }
    refreshSession() {
        let refreshToken = this.userData.refreshToken;
        this.removeAuthentication();
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new http_1.RequestOptions({ headers });
        return this.http.post(this.getRefreshTokenUrl(), `grant_type=refresh_token&refresh_token=${refreshToken}`, options)
            .mergeMap((response) => {
            this.handleSuccessCallback(response);
            if (this.isValidSession()) {
                return Rx_1.Observable.create(true);
            }
            else {
                return Rx_1.Observable.throw('error');
            }
        })
            .map(() => true);
    }
    removeAuthData() {
        this.settingsProvider.delete('auth_data');
    }
    saveAuthData() {
        this.removeAuthData();
        if (this.settingsProvider) {
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
        }
    }
    handleSuccessCallback(data) {
        data = JSON.parse(data._body);
        this.userData.isAuthenticated = true;
        this.userData.username = data.userName;
        this.userData.bearerToken = data.access_token;
        this.userData.expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
        this.userData.role = data.role;
        this.userData.refreshToken = data.refresh_token;
        if (this.settingsProvider) {
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
        }
    }
    retriveSaveData() {
        const savedData = this.settingsProvider.get('auth_data') ?
            JSON.parse(this.settingsProvider.get('auth_data')) :
            null;
        if (typeof savedData === 'undefined' || savedData == null) {
            throw 'No authentication exist';
        }
        else if (this.isDateExpired(savedData.expirationDate)) {
            throw 'Authentication token has already expired';
        }
    }
    isDateExpired(expirationDate) {
        const now = new Date();
        let expiration = new Date(expirationDate);
        return expiration.valueOf() - now.valueOf() <= 0;
    }
    isAuthTokenExpired() {
        return this.isDateExpired(this.userData.expirationDate);
    }
    addAuthHeaderToRequest(request) {
        if (request.headers == null) {
            request.headers = new http_1.Headers();
        }
        if (request.headers.has('Authorization')) {
            request.headers.delete('Authorization');
        }
        request.headers.append('Authorization', `Bearer ${this.userData.bearerToken}`);
    }
};
TubularAuthService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, http_1.Http])
], TubularAuthService);
exports.TubularAuthService = TubularAuthService;
