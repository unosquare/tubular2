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
var grid_component_1 = require('./grid.component');
var GridSearch = (function () {
    function GridSearch(tbGrid) {
        this.tbGrid = tbGrid;
    }
    // TODO: Restore value from localstorage?
    GridSearch.prototype.clearInput = function () {
        this.tbGrid.freeTextSearch.next("");
        this.search = "";
    };
    GridSearch.prototype.setSearch = function (event) {
        this.tbGrid.freeTextSearch.next(event);
    };
    GridSearch = __decorate([
        core_1.Component({
            selector: 'grid-search',
            template: "<div>\n                    <div class=\"input-group input-group-sm\">\n                    <span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n                        <input #toSearch type=\"text\" class=\"form-control\" \n                        [ngModel]=\"search\"\n                        (ngModelChange)=\"setSearch($event)\"\n                        placeholder=\"search . . .\"  \n                        />\n                        <span class=\"input-group-btn\" [hidden]=\"!toSearch.value\">\n                            <button class=\"btn btn-default\" (click)=\"clearInput()\">\n                            <i class=\"fa fa-times-circle\"></i>\n                            </button>\n                        </span>\n                    </div>\n                </div>"
        }), 
        __metadata('design:paramtypes', [grid_component_1.TubularGrid])
    ], GridSearch);
    return GridSearch;
}());
exports.GridSearch = GridSearch;
