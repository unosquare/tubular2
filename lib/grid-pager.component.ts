import { Component, Input } from '@angular/core';

import { GridComponent, GridPageInfo }      from './grid.component';

@Component({
    selector: 'grid-pager',
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
export class GridPagerComponent {
    private info = new GridPageInfo();

    constructor(private tbGrid: GridComponent) { }

    private ngOnInit() {
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => this.info = x);
    }

    private goTo(page: number) {
        this.info.currentPage = page;
        this.tbGrid.goToPage(page - 1);
    }
}
