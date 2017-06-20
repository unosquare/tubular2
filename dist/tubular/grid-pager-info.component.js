;(function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const grid_component_1 = require("./grid.component");
const grid_page_info_1 = require("./grid-page-info");
let GridPagerInfoComponent = class GridPagerInfoComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.pageInfo = new grid_page_info_1.GridPageInfo();
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
};
GridPagerInfoComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-pager-info',
        template: `<div>
        Showing {{this.pageInfo.currentInitial}} to {{this.pageInfo.currentTop}} of {{pageInfo.filteredRecordCount}} records 
        <span [hidden]="!filtered">(Filtered from {{pageInfo.totalRecordCount}} total records)</span>
    </div>`,
        styles: [
            ':host /deep/ div { font-size: 12px; }',
        ]
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], GridPagerInfoComponent);
exports.GridPagerInfoComponent = GridPagerInfoComponent;

this.tubular2 = gridpagerinfo_component;
}).call(this);
