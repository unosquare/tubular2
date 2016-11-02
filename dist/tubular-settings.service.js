"use strict";
var core_1 = require('@angular/core');
exports.SETTINGS_PROVIDER = new core_1.OpaqueToken('tubular-settings.service');
var TubularLocalStorageService = (function () {
    function TubularLocalStorageService() {
    }
    // TODO: Add Check if localStorage exists at constructor
    TubularLocalStorageService.prototype.put = function (id, value) {
        localStorage.setItem(id, JSON.stringify(value));
    };
    TubularLocalStorageService.prototype.get = function (key) {
        return JSON.parse(localStorage.getItem(key)) || false;
    };
    TubularLocalStorageService.prototype.delete = function (key) {
        localStorage.removeItem(key);
    };
    return TubularLocalStorageService;
}());
exports.TubularLocalStorageService = TubularLocalStorageService;
