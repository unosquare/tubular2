import { Component, Input } from '@angular/core';

import { TubularGrid, GridPageInfo }      from './grid.component';

@Component({
    selector: 'grid-pager-info',
    template: `Showing {{this.pageInfo.currentInitial}} to {{this.pageInfo.currentTop}} of {{pageInfo.filteredRecordCount}} records 
                <span [hidden]="!filtered">(Filtered from {{pageInfo.totalRecordCount}} total records)</span>`
})
export class GridPagerInfo {
    pageInfo = new GridPageInfo();
    currentTop = 0;
    currentInitial = 0;
    filteredRecordCount = 0;
    filtered: boolean;
    
    constructor(private tbGrid: TubularGrid) { }

    ngOnInit() {
        // live update properties
        this.tbGrid.pageInfo.subscribe((x : GridPageInfo) => {
            this.pageInfo = x;
            this.filtered = this.pageInfo.totalRecordCount != this.pageInfo.filteredRecordCount;
        });
    }
}