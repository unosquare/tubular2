import { Component } from '@angular/core';

import { TubularGrid }           from './grid.component';

@Component({
    selector: 'grid-search',
    template: `<input type="text" [ngModel]="search" (ngModelChange)="setSearch($event)" 
                    class="form-control"
                    placeholder="search . . ."  />`
})
export class GridSearch {
    search: string;

    constructor(private tbGrid: TubularGrid) { }

    // TODO: Restore value from localstorage?

    setSearch(event: any) {
        this.tbGrid.freeTextSearch.next(event);
    }
}