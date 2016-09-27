import { Component } from '@angular/core';

import { TubularGrid }           from './grid.component';

@Component({
    selector: 'grid-search',
    template: `<div>
                    <div class="input-group input-group-sm">
                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control" 
                        [ngModel]="search"
                        (ngModelChange)="setSearch($event)"
                        placeholder="search . . ."  
                        />
                        <span class="input-group-btn" 
                        ng-show="">
                            <button class="btn btn-default" uib-tooltip="" 
                            ng-click="">
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

    setSearch(event: any) {
        this.tbGrid.freeTextSearch.next(event);
    }
}