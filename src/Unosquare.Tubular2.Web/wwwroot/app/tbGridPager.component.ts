import { Component, Input } from '@angular/core';

import { TbGrid }           from './tbGrid.component';

@Component({
    selector: 'tb-grid-pager',
    template: `
    <ul>
        <li *ngFor="let page of pages" [hidden]="page < 0"><button (click)="goTo(page)">{{page + 1}}</button></li>
        <li>Total rows: {{totalRecords}} (Filtered records: {{filteredRecordCount}})</li>
    </ul>`,
    styles: [
        'li { display: inline; } '
    ]
})
export class TbGridPager {
    totalPages = 0;
    totalRecords = 0;
    filteredRecordCount = 0;
    pages: number[];

    constructor(private tbGrid: TbGrid) { }

    ngOnInit() {
        this.tbGrid.totalPages.subscribe(pages => {
            this.totalPages = pages
            this.pages = Array<number>(pages).fill().map((x, i) => i);
        });
        this.tbGrid.totalRecordCount.subscribe(x => this.totalRecords = x);
        this.tbGrid.filteredRecordCount.subscribe(x => this.filteredRecordCount = x);
    }

    goTo(page: number) {
        this.tbGrid.page.next(page);
    }
}