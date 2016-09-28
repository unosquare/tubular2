import { Component } from '@angular/core';

import { TubularGrid }           from './grid.component';

@Component({
    selector: 'grid-search',
    template: `<div>
                    <div class="input-group input-group-sm">
                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        <input #toSearch type="text" class="form-control" 
                        [ngModel]="search"
                        (ngModelChange)="setSearch($event)"
                        placeholder="search . . ."  
                        />
                        <span class="input-group-btn" >
                            <button class="btn btn-default" (click)="clearInput()">
                            <i class="fa fa-times-circle"></i>
                            </button>
                        </span>
                    </div>
                </div>`
})
export class GridSearch {
    search: string;

    constructor(private tbGrid: TubularGrid) { }

    // TODO: Restore value from localstorage?

    clearInput() {
        this.tbGrid.freeTextSearch.next("");
        this.search = "";
    }

    setSearch(event: any) {
        this.tbGrid.freeTextSearch.next(event);
    }
}