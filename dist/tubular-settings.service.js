"use strict";
var core_1 = require("@angular/core");
exports.SETTINGS_PROVIDER = new core_1.OpaqueToken('tubular-settings.service');
var TubularLocalStorageService = (function () {
    function TubularLocalStorageService() {
        this.existLocalStorage = true;
        if (!window.localStorage) {
            this.existLocalStorage = false;
            console.log("Browser does not support localStorage");
        }
    }
    TubularLocalStorageService.prototype.put = function (id, value) {
        if (this.existLocalStorage)
            localStorage.setItem(id, JSON.stringify(value));
        else
            this._data[id] = String(value);
    };
    TubularLocalStorageService.prototype.get = function (key) {
        if (this.existLocalStorage)
            return JSON.parse(localStorage.getItem(key)) || false;
        else
            return this._data.hasOwnProperty(key) ? this._data[key] : false;
    };
    TubularLocalStorageService.prototype.delete = function (key) {
        if (this.existLocalStorage)
            localStorage.removeItem(key);
        else
            return delete this._data[key];
    };
    return TubularLocalStorageService;
}());
exports.TubularLocalStorageService = TubularLocalStorageService;
