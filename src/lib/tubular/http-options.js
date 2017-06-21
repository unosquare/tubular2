"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {ReflectiveInjector} from '@angular/core'
const http_1 = require("@angular/http");
//import {TubularDataService} from './tubular-data.service';
//import { SETTINGS_PROVIDER } from './tubular-settings.service';
class HttpOptions extends http_1.BaseRequestOptions {
    constructor() {
        // constructor() {
        //     super();
        super(...arguments);
        //     let injector = ReflectiveInjector.resolveAndCreate([TubularDataService, HttpModule]);
        //     let dataService = injector.get(TubularDataService);
        //     this.headers = new Headers({ 'Authorization': dataService.getToken() })
        // }
        //The is try to use Injector 
        this.headers = new http_1.Headers({ 'Authorization': JSON.parse(localStorage.getItem('auth_Header')) });
    }
}
exports.HttpOptions = HttpOptions;
