import { Component, Input} from '@angular/core';
import { TubularGrid } from './grid.component';

/**
 * @summary Interface for "saveAs" function.
 * @author  Cyril Schumacher
 * @version 1.0
 */
interface FileSaver {
    (
        /**
         * @summary Data.
         * @type {Blob}
         */
        data: Blob,

        /**
         * @summary File name.
         * @type {DOMString}
         */
        filename: string,

        /**
         * @summary Disable Unicode text encoding hints or not.
         * @type {boolean}
         */
        disableAutoBOM?: boolean
    ): void
}

declare var saveAs: FileSaver;

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
    @Input() fileName: string;

    constructor(private tbGrid: TubularGrid) { }
    
    private downloadCsv() {
        this.tbGrid.getCurrentPage(data => this.processCsv(data.Payload));
    }

    private downloadAllCsv() {
        this.tbGrid.getFullDataSource(data => this.processCsv(data));
    }

    private processCsv(data) {
        let headers = this.tbGrid.columns.getValue().reduce((a, b) => a + b.label + ',', '').slice(0, -1) + '\r\n';

        let rows = data.map(row => {
            if (typeof row === 'object') {
                return row.reduce((a, b) => a + '"' + b + '"' + ',', '').slice(0, -1) + '\r\n';
            }
        });

        let csv = rows.reduce((a, b) => a + b, headers);

        var blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, this.fileName);
    }
}