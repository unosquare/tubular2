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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
// TODO: Add debounceTime?
var tubular_settings_service_1 = require("./tubular-settings.service");
var tubular_auth_service_1 = require("./tubular-auth.service");
var TubularHttpService = (function () {
    function TubularHttpService(settingsProvider, http, tbAuthService) {
        this.settingsProvider = settingsProvider;
        this.http = http;
        this.tbAuthService = tbAuthService;
    }
    TubularHttpService.prototype.get = function (url, requireAuthentication) {
        if (requireAuthentication === void 0) { requireAuthentication = false; }
        var requestArgs = {
            method: http_1.RequestMethod.Get,
            url: url,
            requireAuthentication: requireAuthentication
        };
        return this.request(requestArgs);
    };
    TubularHttpService.prototype.post = function (url, data, requireAuthentication) {
        if (requireAuthentication === void 0) { requireAuthentication = false; }
        var requestArgs = {
            method: http_1.RequestMethod.Post,
            url: url,
            body: data,
            requireAuthentication: requireAuthentication
        };
        return this.request(requestArgs);
    };
    TubularHttpService.prototype.put = function (url, data, requireAuthentication) {
        if (requireAuthentication === void 0) { requireAuthentication = false; }
        var requestArgs = {
            method: http_1.RequestMethod.Put,
            url: url,
            body: data,
            requireAuthentication: requireAuthentication
        };
        return this.request(requestArgs);
    };
    TubularHttpService.prototype.delete = function (url, data, requireAuthentication) {
        if (requireAuthentication === void 0) { requireAuthentication = false; }
        var requestArgs = {
            method: http_1.RequestMethod.Delete,
            url: url,
            body: data,
            requireAuthentication: requireAuthentication
        };
        return this.request(requestArgs);
    };
    TubularHttpService.prototype.retrieveGridData = function (url, req) {
        req.columns.forEach(this.transformSortDirection);
        console.log("retrieveGridData");
        return this.post(url, req)
            .map(this.extractData)
            .catch(this.handleRequestError);
    };
    TubularHttpService.prototype.request = function (request) {
        var _this = this;
        var ngRequest = new http_1.Request({
            url: request.url,
            method: request.method,
            search: request.search || '',
            headers: request.headers || null,
            body: request.body || null,
            withCredentials: request.withCredentials || false,
            responseType: request.responseType || http_1.ResponseContentType.Json
        });
        console.log("HttpService => ", ngRequest);
        if (request.requireAuthentication) {
            if (this.tbAuthService.isValidSession()) {
                this.tbAuthService.addAuthHeaderToRequest(ngRequest);
            }
            else {
                if (this.tbAuthService.isAuthTokenExpired() && this.tbAuthService.isUsingRefreshTokens()) {
                    return this.handleRequestError({ message: 'Token expired', status: '401', statusText: 'Token expired' }, ngRequest);
                }
            }
        }
        return this.http.request(ngRequest)
            .map(this.extractData)
            .catch(function (error) { return _this.handleRequestError(error, request); });
    };
    TubularHttpService.prototype.handleRequestError = function (error, request) {
        var _this = this;
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        if (error && error.status === 401 && this.tbAuthService.isUsingRefreshTokens() && request) {
            return this.tbAuthService.refreshSession()
                .mergeMap(function (response) {
                if (_this.tbAuthService.isValidSession()) {
                    return _this.http.request(request)
                        .map(_this.extractData)
                        .catch(_this.handleRequestError);
                }
                else {
                    return Observable_1.Observable.throw(error);
                }
            })
                .catch(this.handleRequestError);
        }
        return Observable_1.Observable.throw(errMsg);
    };
    TubularHttpService.prototype.retrieveData = function (url, req) {
        req.columns.forEach(this.transformSortDirection);
        return this.post(url, req)
            .map(this.extractData)
            .catch(this.handleRequestError);
    };
    TubularHttpService.prototype.save = function (url, row, method, requireAuthentication) {
        if (method === void 0) { method = http_1.RequestMethod.Post; }
        if (requireAuthentication === void 0) { requireAuthentication = true; }
        var requestArgs = {
            method: method,
            url: url,
            body: row,
            requireAuthentication: requireAuthentication
        };
        return this.request(requestArgs);
    };
    TubularHttpService.prototype.transformSortDirection = function (column) {
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
    TubularHttpService.prototype.extractData = function (res) {
        return res.json() || {};
    };
    return TubularHttpService;
}());
TubularHttpService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, http_1.Http, tubular_auth_service_1.TubularAuthService])
], TubularHttpService);
exports.TubularHttpService = TubularHttpService;
