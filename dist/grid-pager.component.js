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
var core_1 = require("@angular/core");
var grid_component_1 = require("./grid.component");
var GridPager = (function () {
    function GridPager(tbGrid) {
        this.tbGrid = tbGrid;
        this.info = new grid_component_1.GridPageInfo();
    }
    GridPager.prototype.ngOnInit = function () {
        var _this = this;
        this.tbGrid.pageInfo.subscribe(function (x) { return _this.info = x; });
    };
    GridPager.prototype.goTo = function (page) {
        this.info.currentPage = page;
        this.tbGrid.page.next(page - 1);
    };
    return GridPager;
}());
GridPager = __decorate([
    core_1.Component({
        selector: 'grid-pager',
        template: "<ngb-pagination \n            [collectionSize]=\"info.filteredRecordCount\"\n            [pageSize]=\"tbGrid._pageSize.value\"\n            [(page)]=\"info.currentPage\"\n            [boundaryLinks]=\"true\"\n            [maxSize]=\"5\"\n            (pageChange)=\"goTo($event)\"\n            [ellipses]=\"false\"\n            size=\"sm\">\n    </ngb-pagination>"
    }),
    __metadata("design:paramtypes", [grid_component_1.TubularGrid])
], GridPager);
exports.GridPager = GridPager;
