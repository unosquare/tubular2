;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
exports.SETTINGS_PROVIDER = new core_1.OpaqueToken('tubular-settings.service');
class TubularLocalStorageService {
    constructor() {
        this.existLocalStorage = true;
        if (!window.localStorage) {
            this.existLocalStorage = false;
            console.log('Browser does not support localStorage');
        }
    }
    put(id, value) {
        if (this.existLocalStorage) {
            localStorage.setItem(id, JSON.stringify(value));
        }
        else {
            this._data[id] = String(value);
        }
    }
    get(key) {
        if (this.existLocalStorage) {
            return JSON.parse(localStorage.getItem(key)) || false;
        }
        return this._data.hasOwnProperty(key) ? this._data[key] : false;
    }
    delete(key) {
        if (this.existLocalStorage) {
            localStorage.removeItem(key);
        }
        else {
            delete this._data[key];
        }
    }
}
exports.TubularLocalStorageService = TubularLocalStorageService;

this.tubular2 = tubularsettings_service;
}).call(this);
