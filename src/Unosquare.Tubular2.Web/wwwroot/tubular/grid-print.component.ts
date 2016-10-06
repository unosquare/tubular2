import { Component } from '@angular/core';
import { TubularGrid } from './grid.component';

@Component({
    selector: 'grid-print',
    template: `<button class="btn btn-info btn sm" (click)="printGrid()">
                <span class="fa fa-print"></span>&nbsp;PRINT</button>`
})
export class GridPrint {
    constructor(private tbGrid: TubularGrid) { }

    printGrid() {
        this.tbGrid.getFullDataRequest();
    }
}