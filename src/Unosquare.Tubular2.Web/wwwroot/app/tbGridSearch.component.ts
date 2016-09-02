import { Component, Input, SimpleChange } from '@angular/core';

import { TbGrid }           from './tbGrid.component';

@Component({
    selector: 'tb-grid-search',
    template: `<input type="text" [ngModel]="search" (ngModelChange)="setSearch($event)" 
                    class="form-control"
                    placeholder="search . . ."  />`
})
export class TbGridSearch {
    search: string;

    constructor(private tbGrid: TbGrid) { }

    // TODO: Restore value from localstorage?

    setSearch(event: any) {
        this.tbGrid.freeTextSearch.next(event);
    }
}