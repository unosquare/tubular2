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
var grid_component_1 = require("./grid.component");
var tubular_settings_service_1 = require("./tubular-settings.service");
var GridSearch = (function () {
    function GridSearch(settingsProvider, tbGrid) {
        this.settingsProvider = settingsProvider;
        this.tbGrid = tbGrid;
    }
    GridSearch.prototype.ngOnInit = function () {
        // TODO: Restore value from localstorage?
    };
    GridSearch.prototype.clearInput = function () {
        this.tbGrid.freeTextSearch.next("");
        this.search = "";
    };
    GridSearch.prototype.setSearch = function (event) {
        this.tbGrid.freeTextSearch.next(event);
    };
    return GridSearch;
}());
GridSearch = __decorate([
    core_1.Component({
        selector: 'grid-search',
        template: "<div>\n                    <div class=\"input-group input-group-sm\">\n                    <span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n                        <input #toSearch type=\"text\" class=\"form-control\" \n                        [(ngModel)]=\"search\"\n                        (ngModelChange)=\"setSearch($event)\"\n                        placeholder=\"search . . .\" />\n                        <span class=\"input-group-btn\" [hidden]=\"!toSearch.value\">\n                            <button class=\"btn btn-default\" (click)=\"clearInput()\">\n                            <i class=\"fa fa-times-circle\"></i>\n                            </button>\n                        </span>\n                    </div>\n                </div>"
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, grid_component_1.TubularGrid])
], GridSearch);
exports.GridSearch = GridSearch;
