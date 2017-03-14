import { Component, Inject, Optional } from '@angular/core';

import { TubularGrid }           from './grid.component';
import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';

@Component({
    selector: 'grid-search',
    template: `<div>
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
export class GridSearchComponent {
    private search: string;

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private tbGrid: TubularGrid) { }

    private ngOnInit() {
        // TODO: Restore value from localstorage?
    }

    private clearInput() {
        this.tbGrid.freeTextSearch.next('');
        this.search = '';
    }

    private setSearch(event: any) {
        this.tbGrid.freeTextSearch.next(event);
    }
}
