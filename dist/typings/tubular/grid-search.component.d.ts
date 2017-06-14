import { OnInit } from '@angular/core';
import { GridComponent } from './grid.component';
import { ITubularSettingsProvider } from './tubular-settings.service';
export declare class GridSearchComponent implements OnInit {
    private settingsProvider;
    private tbGrid;
    search: string;
    constructor(settingsProvider: ITubularSettingsProvider, tbGrid: GridComponent);
    ngOnInit(): void;
    clearInput(): void;
    setSearch(event: any): void;
}
