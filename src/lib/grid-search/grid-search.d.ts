import { OnInit } from '@angular/core';
import { GridComponent } from '../grid/index';
import { ITubularSettingsProvider } from '../core/tubular-local-storage-service';
export declare class GridSearchComponent implements OnInit {
    private settingsProvider;
    private tbGrid;
    search: string;
    constructor(settingsProvider: ITubularSettingsProvider, tbGrid: GridComponent);
    ngOnInit(): void;
    clearInput(): void;
    setSearch(event: any): void;
}
