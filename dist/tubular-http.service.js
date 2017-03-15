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
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
// TODO: Add debounceTime?
const tubular_settings_service_1 = require("./tubular-settings.service");
const tubular_auth_service_1 = require("./tubular-auth.service");
let TubularHttpService = class TubularHttpService {
    constructor(settingsProvider, http, tbAuthService) {
        this.settingsProvider = settingsProvider;
        this.http = http;
        this.tbAuthService = tbAuthService;
    }
    get(url, requireAuthentication = false) {
        let requestArgs = {
            method: http_1.RequestMethod.Get,
            url,
            requireAuthentication
        };
        return this.request(requestArgs);
    }
    post(url, data, requireAuthentication = false) {
        let requestArgs = {
            method: http_1.RequestMethod.Post,
            body: data,
            url,
            requireAuthentication
        };
        return this.request(requestArgs);
    }
    put(url, data, requireAuthentication = false) {
        let requestArgs = {
            method: http_1.RequestMethod.Put,
            body: data,
            url,
            requireAuthentication
        };
        return this.request(requestArgs);
    }
    delete(url, data, requireAuthentication = false) {
        let requestArgs = {
            method: http_1.RequestMethod.Delete,
            body: data,
            url,
            requireAuthentication
        };
        return this.request(requestArgs);
    }
    request(request) {
        let ngRequest = new http_1.Request({
            url: request.url,
            method: request.method,
            search: request.search || '',
            headers: request.headers || null,
            body: request.body || null,
            withCredentials: request.withCredentials || false,
            responseType: request.responseType || http_1.ResponseContentType.Json
        });
        if (request.requireAuthentication) {
            if (this.tbAuthService.isValidSession()) {
                this.tbAuthService.addAuthHeaderToRequest(ngRequest);
            }
            else {
                if (this.tbAuthService.isAuthTokenExpired() &&
                    this.tbAuthService.isUsingRefreshTokens()) {
                    return this.handleRequestError({
                        message: 'Token expired',
                        status: '401',
                        statusText: 'Token expired'
                    }, ngRequest);
                }
            }
        }
        return this.http.request(ngRequest)
            .map(this.extractData)
            .catch((error) => this.handleRequestError(error, request));
    }
    save(url, row, method = http_1.RequestMethod.Post, requireAuthentication = true) {
        let requestArgs = {
            body: row,
            method,
            url,
            requireAuthentication
        };
        return this.request(requestArgs);
    }
    handleRequestError(error, request) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        if (error && error.status === 401 && this.tbAuthService.isUsingRefreshTokens() && request) {
            return this.tbAuthService.refreshSession()
                .mergeMap((response) => {
                if (this.tbAuthService.isValidSession()) {
                    return this.http.request(request)
                        .map(this.extractData)
                        .catch(this.handleRequestError);
                }
                else {
                    return Observable_1.Observable.throw(error);
                }
            })
                .catch(this.handleRequestError);
        }
        return Observable_1.Observable.throw(errMsg);
    }
    extractData(res) {
        return res.json() || {};
    }
};
TubularHttpService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, http_1.Http,
        tubular_auth_service_1.TubularAuthService])
], TubularHttpService);
exports.TubularHttpService = TubularHttpService;
