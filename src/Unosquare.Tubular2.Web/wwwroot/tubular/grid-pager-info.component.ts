import { Component, Input } from '@angular/core';

import { TubularGrid }      from './grid.component';

@Component({
    selector: 'grid-pager-info',
    template: `Total rows: {{totalRecords}} (Filtered records: {{filteredRecordCount}})`
})
export class GridPagerInfo {
    totalRecords = 0;
    filteredRecordCount = 0;
    
    constructor(private tbGrid: TubularGrid) { }

    ngOnInit() {
        // live update properties
        this.tbGrid.totalRecordCount.subscribe(x => this.totalRecords = x);
        this.tbGrid.filteredRecordCount.subscribe(x => this.filteredRecordCount = x);
    }
}