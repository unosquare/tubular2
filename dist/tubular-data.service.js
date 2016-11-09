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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
// TODO: Add debounceTime?
var tubular_settings_service_1 = require('./tubular-settings.service');
var TubularDataService = (function () {
    function TubularDataService(settingsProvider, http) {
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
        this.authHeader = null;
        this.requireAuthentication = true;
        this.refreshTokenUrl = this.tokenUrl = '/api/token';
    }
    TubularDataService.prototype.retrieveData = function (url, req) {
        req.columns.forEach(this.transformSortDirection);
        return this.http.post(url, req)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TubularDataService.prototype.save = function (url, row, method) {
        if (method === void 0) { method = http_1.RequestMethod.Post; }
        return this.http.request(new http_1.Request({
            method: method,
            url: url,
            body: row
        }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    TubularDataService.prototype.transformSortDirection = function (column) {
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
    };
    TubularDataService.prototype.extractData = function (res) {
        return res.json() || {};
    };
    TubularDataService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    TubularDataService.prototype.authenticate = function (username, password, succesCallback, errorCallback, userDataCallback) {
        var _this = this;
        this.removeAuthentication();
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.tokenUrl, 'grant_type=password&username=' + username + '&password=' + password, options)
            .subscribe(function (data) {
            _this.handleSuccesCallback(data, succesCallback, userDataCallback);
        }, function (err) {
            var error = {
                errorBody: JSON.parse(err._body),
                status: err.status
            };
            if (typeof errorCallback != null)
                errorCallback(error);
        });
    };
    TubularDataService.prototype.handleSuccesCallback = function (data, succesCallback, userDataCallback) {
        data = JSON.parse(data._body);
        this.userData.isAuthenticated = true;
        this.userData.username = data.userName;
        this.userData.bearerToken = data.access_token;
        this.userData.expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
        this.userData.role = data.role;
        this.userData.refreshToken = data.refresh_token;
        if (this.settingsProvider)
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
        this.setHttpAuthHeader();
        if (typeof userDataCallback === 'function') {
            userDataCallback(data);
        }
        if (typeof succesCallback === 'function') {
            succesCallback();
        }
    };
    TubularDataService.prototype.isAuthenticated = function () {
        if (!this.userData.isAuthenticated || this.isAuthenticationExpired(this.userData.expirationDate)) {
            try {
                this.retriveSaveData();
            }
            catch (e) {
                return false;
            }
        }
        return true;
    };
    TubularDataService.prototype.retriveSaveData = function () {
        var savedData = this.settingsProvider ? this.settingsProvider.get('auth_data') : null;
        if (typeof savedData === 'undefined' || savedData == null) {
            throw 'No authentication exist';
        }
        else if (this.isAuthenticationExpired(savedData.expirationDate)) {
            throw 'Authentication token has already expired';
        }
        else {
            this.userData = savedData;
            this.setHttpAuthHeader();
        }
    };
    TubularDataService.prototype.isAuthenticationExpired = function (expirationDate) {
        var now = new Date();
        var expiration = new Date(expirationDate);
        return expiration.valueOf() - now.valueOf() <= 0;
    };
    TubularDataService.prototype.removeAuthentication = function () {
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
    TubularDataService.prototype.setHttpAuthHeader = function () {
        this.authHeader = 'Bearer ' + this.userData.bearerToken;
        this.settingsProvider.put('auth_Header', this.authHeader);
    };
    TubularDataService.prototype.getData = function (url) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TubularDataService.prototype.getToken = function () {
        return this.authHeader;
    };
    TubularDataService.prototype.setTokenUrl = function (val) {
        this.tokenUrl = val;
    };
    TubularDataService.prototype.setRequireAuthentication = function (val) {
        this.requireAuthentication = val;
    };
    TubularDataService.prototype.refreshSession = function (errorCallback) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.tokenUrl, 'grant_type=refresh_token&refresh_token=' + this.userData.refreshToken, options)
            .subscribe(function (data) {
            _this.handleSuccesCallback(data, null, null);
        }, function (err) {
            if (typeof errorCallback != null)
                errorCallback(err);
        });
    };
    TubularDataService.prototype.getExpirationDate = function () {
        var date = new Date();
        var minutes = 5;
        return new Date(date.getTime() + minutes * 60000);
    };
    TubularDataService.prototype.addTimeZoneToUrl = function (url) {
        var separator = url.indexOf('?') === -1 ? '?' : '&';
        return url + separator + 'timezoneOffset=' + new Date().getTimezoneOffset();
    };
    TubularDataService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)), 
        __metadata('design:paramtypes', [Object, http_1.Http])
    ], TubularDataService);
    return TubularDataService;
}());
exports.TubularDataService = TubularDataService;
