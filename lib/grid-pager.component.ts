import { Component, Input, OnInit } from '@angular/core';

import { GridComponent, GridPageInfo }      from './grid.component';

@Component({
    selector: 'tb-grid-pager',
    template:
    `<ngb-pagination 
            [collectionSize]="info.filteredRecordCount"
            [pageSize]="tbGrid._pageSize.value"
            [(page)]="info.currentPage"
            [boundaryLinks]="true"
            [maxSize]="5"
            (pageChange)="goTo($event)"
            [ellipses]="false"
            size="sm">
    </ngb-pagination>`
})
export class GridPagerComponent extends OnInit {
    public info = new GridPageInfo();

    constructor(public tbGrid: GridComponent) {
        super();
     }

    ngOnInit() {
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => this.info = x);
    }

    public goTo(page: number) {
        this.info.currentPage = page;
        this.tbGrid.goToPage(page - 1);
    }
}
