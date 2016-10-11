import { Component, Input } from '@angular/core';

import { TubularGrid, GridPageInfo }      from './grid.component';

@Component({
    selector: 'grid-pager',
    template: `
    <div class="btn-group">
        <button (click)="goTo(0)" class="btn btn-primary"
            [disabled]="info.currentPage == 0">
            <i class="fa fa-fast-backward"></i>
        </button>
        <button *ngFor="let page of pages" [hidden]="page < 0"
            (click)="goTo(page)" class="btn btn-secondary"
            [ngClass]="{active: page == info.currentPage - 1}">
            {{page + 1}}
        </button>
        <button (click)="goTo(info.totalPages)" class="btn btn-primary"
            [disabled]="currentPage == (info.totalPages-1)">
            <i class="fa fa-fast-forward"></i>
        </button>
    </div>`
})
export class GridPager {
    info = new GridPageInfo();
    pages: number[];

    constructor(private tbGrid: TubularGrid) { }

    ngOnInit() {
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => {
            this.info = x;
            this.pages = Array(x.totalPages).fill(0).map((x, i) => i); 
        });
    }

    goTo(page: number) {
        this.info.currentPage = page;
        this.tbGrid.page.next(page);
    }
}