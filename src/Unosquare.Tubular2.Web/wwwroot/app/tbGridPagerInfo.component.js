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
var TbGridPagerInfo = (function () {
    function TbGridPagerInfo(tbGrid) {
        this.tbGrid = tbGrid;
        // todo: probably extend normal to pager?
        this.totalRecords = 0;
        this.filteredRecordCount = 0;
    }
    TbGridPagerInfo.prototype.ngOnInit = function () {
        var _this = this;
        // live update properties
        this.tbGrid.totalRecordCount.subscribe(function (x) { return _this.totalRecords = x; });
        this.tbGrid.filteredRecordCount.subscribe(function (x) { return _this.filteredRecordCount = x; });
    };
    TbGridPagerInfo = __decorate([
        core_1.Component({
            selector: 'tb-grid-pager-info',
            template: "Total rows: {{totalRecords}} (Filtered records: {{filteredRecordCount}})"
        }), 
        __metadata('design:paramtypes', [tbGrid_component_1.TbGrid])
    ], TbGridPagerInfo);
    return TbGridPagerInfo;
}());
exports.TbGridPagerInfo = TbGridPagerInfo;
//# sourceMappingURL=tbGridPagerInfo.component.js.map