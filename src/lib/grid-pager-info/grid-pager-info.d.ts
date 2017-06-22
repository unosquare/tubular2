import { OnInit } from '@angular/core';
import { GridComponent, GridPageInfo } from '../grid/index';
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
