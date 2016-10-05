import { Component} from '@angular/core';
import { TubularGrid } from './grid.component';

@Component({
    selector: 'tbExportButton',
    template: `<div class="btn-group" uib-dropdown>
                <button class="btn btn-info btn sm" uib-dropdown-toggle>
                <span class="fa fa-download"></span>&nbsp;EXPORT CSV&nbsp;<span class="caret"></span>
               </button>
                <ul class="dropdown-menu" uib-dropdown-menu>
                    <li><a  href="javascript:void(0)" (click)="downloadCsv()">Current rows</a></li>
                    <li><a  href="javascript:void(0)" (click)="downloadAllCsv()">All rows</a></li>
                </ul>
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