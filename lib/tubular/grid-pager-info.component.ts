﻿import { Component, Input, OnInit } from '@angular/core';

import { GridComponent, GridPageInfo } from './grid.component';

@Component({
    selector: 'tb-grid-pager-info',
    template:
    `<div>
        Showing {{this.pageInfo.currentInitial}} to {{this.pageInfo.currentTop}} of {{pageInfo.filteredRecordCount}} records 
        <span [hidden]="!filtered">(Filtered from {{pageInfo.totalRecordCount}} total records)</span>
    </div>`
})
export class GridPagerInfoComponent implements OnInit {
    public pageInfo = new GridPageInfo();
    public filtered: boolean;

    private currentTop = 0;
    private currentInitial = 0;
    private filteredRecordCount = 0;

    constructor(private tbGrid: GridComponent) { }

    public ngOnInit() {
        // live update properties
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => {
            this.pageInfo = x;
            this.filtered = this.pageInfo.totalRecordCount !== this.pageInfo.filteredRecordCount;
        });
    }
}
