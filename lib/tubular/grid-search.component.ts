import { Component, Inject, Optional, OnInit } from '@angular/core';

import { GridComponent }           from './grid.component';
import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';

@Component({
    selector: 'tb-grid-search',
    template: 
    `<md-input-container>
        <input mdInput #toSearch type="text"
        [(ngModel)]="search"
        (ngModelChange)="setSearch($event)"
        placeholder="search . . ." />
    </md-input-container>`
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
