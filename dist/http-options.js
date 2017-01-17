"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//import {ReflectiveInjector} from '@angular/core'
var http_1 = require("@angular/http");
//import {TubularDataService} from './tubular-data.service';
//import { SETTINGS_PROVIDER } from './tubular-settings.service';
var HttpOptions = (function (_super) {
    __extends(HttpOptions, _super);
    function HttpOptions() {
        // constructor() {
        //     super();
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //     let injector = ReflectiveInjector.resolveAndCreate([TubularDataService, HttpModule]);
        //     let dataService = injector.get(TubularDataService);
        //     this.headers = new Headers({ 'Authorization': dataService.getToken() })
        // }
        //The is try to use Injector 
        _this.headers = new http_1.Headers({ 'Authorization': JSON.parse(localStorage.getItem('auth_Header')) });
        return _this;
    }
    return HttpOptions;
}(http_1.BaseRequestOptions));
exports.HttpOptions = HttpOptions;
