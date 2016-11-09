"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//import {ReflectiveInjector} from '@angular/core'
var http_1 = require('@angular/http');
//import {TubularDataService} from './tubular-data.service';
//import { SETTINGS_PROVIDER } from './tubular-settings.service';
var HttpOptions = (function (_super) {
    __extends(HttpOptions, _super);
    function HttpOptions() {
        _super.apply(this, arguments);
        // constructor() {
        //     super();
        //     let injector = ReflectiveInjector.resolveAndCreate([TubularDataService, HttpModule]);
        //     let dataService = injector.get(TubularDataService);
        //     this.headers = new Headers({ 'Authorization': dataService.getToken() })
        // }
        //The is try to use Injector 
        this.headers = new http_1.Headers({ 'Authorization': JSON.parse(localStorage.getItem('auth_Header')) });
    }
    return HttpOptions;
}(http_1.BaseRequestOptions));
exports.HttpOptions = HttpOptions;
