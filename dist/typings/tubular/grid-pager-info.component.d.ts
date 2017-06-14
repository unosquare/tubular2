import { OnInit } from '@angular/core';
import { GridComponent } from './grid.component';
import { GridPageInfo } from './grid-page-info';
export declare class GridPagerInfoComponent implements OnInit {
    private tbGrid;
    pageInfo: GridPageInfo;
    filtered: boolean;
    private currentTop;
    private currentInitial;
    private filteredRecordCount;
    constructor(tbGrid: GridComponent);
    ngOnInit(): void;
}
