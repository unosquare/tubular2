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
let GridPagerComponent = class GridPagerComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.info = new grid_component_1.GridPageInfo();
    }
    ngOnInit() {
        this.tbGrid.pageInfo.subscribe((x) => this.info = x);
    }
    goTo(page) {
        this.info.currentPage = page;
        this.tbGrid.goToPage(page - 1);
    }
};
GridPagerComponent = __decorate([
    core_1.Component({
        selector: 'grid-pager',
        template: `<ngb-pagination 
            [collectionSize]="info.filteredRecordCount"
            [pageSize]="tbGrid._pageSize.value"
            [(page)]="info.currentPage"
            [boundaryLinks]="true"
            [maxSize]="5"
            (pageChange)="goTo($event)"
            [ellipses]="false"
            size="sm">
    </ngb-pagination>`
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], GridPagerComponent);
exports.GridPagerComponent = GridPagerComponent;
