"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const index_1 = require("../grid/index");
class GridPagerInfoComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.pageInfo = new index_1.GridPageInfo();
        this.currentTop = 0;
        this.currentInitial = 0;
        this.filteredRecordCount = 0;
    }
    ngOnInit() {
        // live update properties
        this.tbGrid.pageInfo.subscribe((pageInfo) => {
            this.pageInfo = pageInfo;
            this.filtered = this.pageInfo.totalRecordCount !== this.pageInfo.filteredRecordCount;
        });
    }
}
GridPagerInfoComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-grid-pager-info',
                templateUrl: 'grid-pager-info.html',
                styleUrls: ['grid-pager-info.css']
            },] },
];
/** @nocollapse */
GridPagerInfoComponent.ctorParameters = () => [
    { type: index_1.GridComponent, },
];
exports.GridPagerInfoComponent = GridPagerInfoComponent;
//# sourceMappingURL=grid-pager-info.js.map