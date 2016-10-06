import { Component} from '@angular/core';
import { TubularGrid } from './grid.component';

@Component({
    selector: 'tbExportButton',
    template: `<div ngbDropdown class="d-inline-block">
                <button ngbDropdownToggle class="btn btn-outline-primary" id="dropdownExport">
                <span class="fa fa-download"></span>&nbsp;EXPORT CSV&nbsp;<span class="caret"></span>
               </button>
               <div class="dropdown-menu" aria-labelledby="dropdownExport">
                <button class="dropdown-item" (click)="downloadCsv()">Current rows</button>
                <button class="dropdown-item" (click)="downloadAllCsv()">All rows</button>
               </div>
               </div>`
})
export class tbExportButton {
    constructor(private tbGrid: TubularGrid) { }

    downloadCsv() {
        //this.tbGrid...
    }

    downloadAllCsv() {
        //this.tbGrid...
    }

}