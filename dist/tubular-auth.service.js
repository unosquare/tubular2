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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var tubular_settings_service_1 = require("./tubular-settings.service");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var TubularAuthService = (function () {
    function TubularAuthService(settingsProvider, http) {
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
    TubularAuthService.prototype.enableRefreshTokens = function () {
        this.useRefreshTokens = true;
    };
    TubularAuthService.prototype.isUsingRefreshTokens = function () {
        return this.useRefreshTokens;
    };
    TubularAuthService.prototype.getRefreshTokenUrl = function () {
        return this.refreshTokenUrl;
    };
    TubularAuthService.prototype.authenticate = function (username, password, succesCallback, errorCallback) {
        var _this = this;
        this.removeAuthentication();
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.tokenUrl, 'grant_type=password&username=' + username + '&password=' + password, options)
            .subscribe(function (data) {
            _this.handleSuccesCallback(data);
        }, function (err) {
            var error = {
                errorBody: JSON.parse(err._body),
                status: err.status
            };
            if (typeof errorCallback != null)
                errorCallback(error);
        });
    };
    TubularAuthService.prototype.removeAuthentication = function () {
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
    };
    TubularAuthService.prototype.handleSuccesCallback = function (data) {
        data = JSON.parse(data._body);
        this.userData.isAuthenticated = true;
        this.userData.username = data.userName;
        this.userData.bearerToken = data.access_token;
        this.userData.expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
        this.userData.role = data.role;
        this.userData.refreshToken = data.refresh_token;
        if (this.settingsProvider)
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
    };
    TubularAuthService.prototype.isValidSession = function () {
        if (!this.userData.isAuthenticated || this.isDateExpired(this.userData.expirationDate)) {
            try {
                this.retriveSaveData();
            }
            catch (e) {
                return false;
            }
        }
        return true;
    };
    TubularAuthService.prototype.retriveSaveData = function () {
        var savedData = this.settingsProvider.get('auth_data') ? JSON.parse(this.settingsProvider.get('auth_data')) : null;
        if (typeof savedData === 'undefined' || savedData == null) {
            throw 'No authentication exist';
        }
        else if (this.isDateExpired(savedData.expirationDate)) {
            throw 'Authentication token has already expired';
        }
    };
    TubularAuthService.prototype.isDateExpired = function (expirationDate) {
        var now = new Date();
        var expiration = new Date(expirationDate);
        return expiration.valueOf() - now.valueOf() <= 0;
    };
    TubularAuthService.prototype.isAuthTokenExpired = function () {
        return this.isDateExpired(this.userData.expirationDate);
    };
    TubularAuthService.prototype.addAuthHeaderToRequest = function (request) {
        if (request.headers = null) {
            request.headers = new http_1.Headers();
        }
        if (request.headers.has('Authorization')) {
            request.headers.delete('Authorization');
        }
        request.headers.append('Authorization', 'Bearer ' + this.userData.bearerToken);
    };
    TubularAuthService.prototype.refreshSession = function () {
        var _this = this;
        var refreshToken = this.userData.refreshToken;
        this.removeAuthentication();
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getRefreshTokenUrl(), 'grant_type=refresh_token&refresh_token=' + refreshToken, options)
            .mergeMap(function (response) {
            _this.handleSuccesCallback(response);
            if (_this.isValidSession()) {
                return Rx_1.Observable.create(true);
            }
            else {
                return Rx_1.Observable.throw("error");
            }
        })
            .map(function () { return true; });
    };
    return TubularAuthService;
}());
TubularAuthService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, http_1.Http])
], TubularAuthService);
exports.TubularAuthService = TubularAuthService;
