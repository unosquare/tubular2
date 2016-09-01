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
var tbGrid_component_1 = require('./tbGrid.component');
var TbGridPager = (function () {
    function TbGridPager(tbGrid) {
        this.tbGrid = tbGrid;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.filteredRecordCount = 0;
    }
    TbGridPager.prototype.ngOnInit = function () {
        var _this = this;
        this.tbGrid.totalPages.subscribe(function (pages) {
            _this.totalPages = pages;
            _this.pages = Array(pages).fill(0).map(function (x, i) { return i; });
        });
        // live update properties
        this.tbGrid.totalRecordCount.subscribe(function (x) { return _this.totalRecords = x; });
        this.tbGrid.filteredRecordCount.subscribe(function (x) { return _this.filteredRecordCount = x; });
    };
    TbGridPager.prototype.goTo = function (page) {
        this.tbGrid.page.next(page);
    };
    TbGridPager = __decorate([
        core_1.Component({
            selector: 'tb-grid-pager',
            template: "\n    <ul>\n        <li *ngFor=\"let page of pages\" [hidden]=\"page < 0\"><button (click)=\"goTo(page)\">{{page + 1}}</button></li>\n        <li>Total rows: {{totalRecords}} (Filtered records: {{filteredRecordCount}})</li>\n    </ul>",
            styles: [
                'li { display: inline; } '
            ]
        }), 
        __metadata('design:paramtypes', [tbGrid_component_1.TbGrid])
    ], TbGridPager);
    return TbGridPager;
}());
exports.TbGridPager = TbGridPager;
//# sourceMappingURL=tbGridPager.component.js.map