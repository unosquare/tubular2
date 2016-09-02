import { Component, Input } from '@angular/core';

import { TbGrid }           from './tbGrid.component';

@Component({
    selector: 'tb-grid-pager-info',
    template: `Total rows: {{totalRecords}} (Filtered records: {{filteredRecordCount}})`
})
export class TbGridPagerInfo {
    // todo: probably extend normal to pager?
    totalRecords = 0;
    filteredRecordCount = 0;
    
    constructor(private tbGrid: TbGrid) { }

    ngOnInit() {
        // live update properties
        this.tbGrid.totalRecordCount.subscribe(x => this.totalRecords = x);
        this.tbGrid.filteredRecordCount.subscribe(x => this.filteredRecordCount = x);
    }
}