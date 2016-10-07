import { Component, Input} from '@angular/core';
import { TubularGrid } from './grid.component';

@Component({
    selector: 'grid-export',
    template: `<div ngbDropdown class="d-inline-block">
                <button ngbDropdownToggle class="btn btn-outline-primary btn-sm">
                <span class="fa fa-download"></span>&nbsp;EXPORT CSV&nbsp;<span class="caret"></span>
               </button>
               <div class="dropdown-menu">
                <button class="dropdown-item" (click)="downloadCsv()">Current rows</button>
                <button class="dropdown-item" (click)="downloadAllCsv()">All rows</button>
               </div>
               </div>`
})
export class ExportButton {
    constructor(private tbGrid: TubularGrid) { }
    @Input() fileName: string;

    downloadCsv() {
        this.tbGrid.getCurrentPage(
            data => {
                var csvFile = '';

            }
        );
    }

    downloadAllCsv() {
        this.tbGrid.getFullDataSource(
            data => {

            }
        );
    }

}