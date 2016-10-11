import { Component, Input } from '@angular/core';

import { TubularGrid, GridPageInfo }      from './grid.component';

@Component({
    selector: 'grid-pager',
    template: 
    `<div>
    <ngb-pagination 
    [collectionSize]="info.filteredRecordCount"
    [(page)]="info.currentPage"
    [boundaryLinks]="true"
    (pageChange)="goTo($event)"
    ></ngb-pagination>
    </div>`
})
export class GridPager {
    info = new GridPageInfo();

    constructor(private tbGrid: TubularGrid) { }

    ngOnInit() {
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => {
            this.info = x;
        });
    }

    goTo(page: number) {
        this.info.currentPage = page;
        this.tbGrid.page.next(page-1);
    }
}