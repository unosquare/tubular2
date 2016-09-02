import { Component, Input } from '@angular/core';

import { TbGrid }           from './tbGrid.component';

@Component({
    selector: 'tb-grid-pager',
    template: `
    <div class="btn-group">
        <button (click)="goTo(0)" class="btn btn-primary"
            [disabled]="currentPage == 0">
            <i class="fa fa-fast-backward"></i>
        </button>
        <button *ngFor="let page of pages" [hidden]="page < 0"
            (click)="goTo(page)" class="btn btn-secondary"
            [ngClass]="{active: page == currentPage}">
            {{page + 1}}
        </button>
        <button (click)="goTo(totalPages)" class="btn btn-primary"
            [disabled]="currentPage == (totalPages-1)">
            <i class="fa fa-fast-forward"></i>
        </button>
    </div>`
})
export class TbGridPager {
    totalPages = 0;
    totalRecords = 0;
    currentPage = 0;
    filteredRecordCount = 0;
    pages: number[];

    constructor(private tbGrid: TbGrid) { }

    ngOnInit() {
        this.tbGrid.totalPages.subscribe(pages => {
            this.totalPages = pages
            this.pages = Array(pages).fill(0).map((x, i) => i);
        });

        // live update properties
        this.tbGrid.totalRecordCount.subscribe(x => this.totalRecords = x);
        this.tbGrid.filteredRecordCount.subscribe(x => this.filteredRecordCount = x);
    }

    goTo(page: number) {
        this.currentPage = page;
        this.tbGrid.page.next(page);
    }
}