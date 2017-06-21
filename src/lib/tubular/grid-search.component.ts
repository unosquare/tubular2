import { Component, Inject, Optional, OnInit } from '@angular/core';

import { GridComponent }           from './grid.component';
import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';

@Component({
    selector: 'tb-grid-search',
    template: 
    `<div fxLayout="row" class="search-container">
        <md-icon (click)="inputField.focus()" class="icon-gray">search</md-icon>
        <input type="text" 
            [(ngModel)]="search"
            (ngModelChange)="setSearch($event)"
            #inputField
            fxFlex
            placeholder="Search..." />
        <md-icon *ngIf="search" (click)="clearInput()" class="icon-gray">close</md-icon>
    </div>`,
    styles: [
        ':host /deep/ input { border-width: 0; background-color: transparent; }',
        ':host /deep/ input:focus { outline:none; }',
        ':host /deep/ .search-container { border: 1px solid #CCC; padding: 6px;     box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); position: relative; display: inline-flex; }',
        ':host /deep/ .icon-gray { cursor: pointer; color: #CCC; }'
    ]
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
