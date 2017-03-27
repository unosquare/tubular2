import { Component, Inject, Optional, OnInit } from '@angular/core';

import { GridComponent }           from './grid.component';
import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';

@Component({
    selector: 'tb-grid-search',
    template: 
    `<div>
        <div class="input-group input-group-sm">
        <span class="input-group-addon"><i class="fa fa-search"></i></span>
            <input #toSearch type="text" class="form-control" 
            [(ngModel)]="search"
            (ngModelChange)="setSearch($event)"
            placeholder="search . . ." />
            <span class="input-group-btn" [hidden]="!toSearch.value">
                <button class="btn btn-default" (click)="clearInput()">
                <i class="fa fa-times-circle"></i>
                </button>
            </span>
        </div>
    </div>`
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
