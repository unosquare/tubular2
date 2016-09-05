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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
// TODO: Add debounceTime?
var TbDataService = (function () {
    function TbDataService(http) {
        this.http = http;
    }
    TbDataService.prototype.retrieveData = function (url, req) {
        req.columns.forEach(this.transformSortDirection);
        return this.http.post(url, req)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TbDataService.prototype.transformSortDirection = function (column) {
        switch (column.direction) {
            case 1:
                column.sortDirection = "Ascending";
                break;
            case 2:
                column.sortDirection = "Descending";
                break;
            default:
                column.sortDirection = "None";
        }
    };
    TbDataService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    TbDataService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    TbDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TbDataService);
    return TbDataService;
}());
exports.TbDataService = TbDataService;
//# sourceMappingURL=tbData.service.js.map