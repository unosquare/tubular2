 import { Component, Inject, Optional, OnInit } from '@angular/core';

import { GridComponent }           from '../grid/index';
import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '../core/tubular-local-storage-service';

@Component({
    selector: 'tb-grid-search',
    templateUrl: './grid-search.html',
    styleUrls: [ './grid-search.css' ]
})
export class GridSearchComponent implements OnInit {
    public search: string;

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private tbGrid: GridComponent) {
        }

    public ngOnInit() {
        // TODO: Restore value from localstorage?
    }

    public clearInput() {
        this.tbGrid.freeTextSearch.next('');
        this.search = '';
    }

    public setSearch(event: any) {
        this.tbGrid.freeTextSearch.next(event);
    }
}
