 import { Component, Input, OnInit } from '@angular/core';

import { GridComponent, GridPageInfo } from '../grid/index';

@Component({
    selector: 'tb-grid-pager-info',
    templateUrl: 'grid-pager-info.html',
    styleUrls: [ 'grid-pager-info.css' ]
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
        this.tbGrid.pageInfo.subscribe((pageInfo: GridPageInfo) => {
            this.pageInfo = pageInfo;
            this.filtered = this.pageInfo.totalRecordCount !== this.pageInfo.filteredRecordCount;
        });
    }
}
