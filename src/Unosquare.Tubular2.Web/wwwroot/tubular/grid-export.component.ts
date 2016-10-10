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
                let headers = this.tbGrid.columns.getValue().reduce((a, b) => {
                    return a + b.label + ','
                }, '');
                headers = headers.slice(0, -1) + ',\n';

                let rows = data.Payload.map(row => {
                    if (typeof (row) === 'object') {
                        return row.reduce((a, b) => {
                            return a + b + ','
                        }, '') + row.slice(0, -1) + ',\n';
                    }
                });
                if (headers.length > 0) {
                    this.processCsv(headers, rows);
                }
            }
        );
    }

    downloadAllCsv() {
        this.tbGrid.getFullDataSource(
            data => {
                let headers = this.tbGrid.columns.getValue().reduce((a, b) => {
                    return a + b.label + ','
                }, '');
                headers = headers.slice(0, -1) + ',\n';

                let rows = data.map(row => {
                    if (typeof (row) === 'object') {
                        return row.reduce((a, b) => {
                            return a + b + ','
                        }, '') + row.slice(0,-1)+',\n';
                    }
                });
                if (headers.length > 0) {
                    this.processCsv(headers, rows);
                }

            });
    }

    processCsv(headers, rows) {
        var csv = headers;
        for (var i = 0; i < rows.length; i++){
            csv += rows[i];
        }
        console.log(csv);
        var blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    }
    }