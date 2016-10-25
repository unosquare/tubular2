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
var ExportButton = (function () {
    function ExportButton(tbGrid) {
        this.tbGrid = tbGrid;
    }
    ExportButton.prototype.downloadCsv = function () {
        var _this = this;
        this.tbGrid.getCurrentPage(function (data) { return _this.processCsv(data.Payload); });
    };
    ExportButton.prototype.downloadAllCsv = function () {
        var _this = this;
        this.tbGrid.getFullDataSource(function (data) { return _this.processCsv(data); });
    };
    ExportButton.prototype.processCsv = function (data) {
        var headers = this.tbGrid.columns.getValue().reduce(function (a, b) { return a + b.label + ','; }, '').slice(0, -1) + '\r\n';
        var rows = data.map(function (row) {
            if (typeof row === 'object') {
                return row.reduce(function (a, b) { return a + '"' + b + '"' + ','; }, '').slice(0, -1) + '\r\n';
            }
        });
        var csv = rows.reduce(function (a, b) { return a + b; }, headers);
        var blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, this.fileName);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ExportButton.prototype, "fileName");
    ExportButton = __decorate([
        core_1.Component({
            selector: 'grid-export',
            template: "<div ngbDropdown class=\"d-inline-block\">\n                <button ngbDropdownToggle class=\"btn btn-outline-primary btn-sm\">\n                <span class=\"fa fa-download\"></span>&nbsp;Export CSV&nbsp;<span class=\"caret\"></span>\n               </button>\n               <div class=\"dropdown-menu\">\n                <button class=\"dropdown-item\" (click)=\"downloadCsv()\">Current rows</button>\n                <button class=\"dropdown-item\" (click)=\"downloadAllCsv()\">All rows</button>\n               </div>\n               </div>"
        }), 
        __metadata('design:paramtypes', [grid_component_1.TubularGrid])
    ], ExportButton);
    return ExportButton;
}());
exports.ExportButton = ExportButton;
