import { Component, Input, Inject } from '@angular/core';
import { GridComponent } from './grid.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Component({
    selector: 'tb-grid-export',
    template: `<div ngbDropdown class="d-inline-block">
                <button ngbDropdownToggle class="btn btn-info btn-sm">
                <span class="fa fa-download"></span>&nbsp;Export CSV&nbsp;<span class="caret"></span>
               </button>
               <div class="dropdown-menu">
                <button class="dropdown-item" (click)="downloadCsv()">Current rows</button>
                <button class="dropdown-item" (click)="downloadAllCsv()">All rows</button>
               </div>
               </div>`
})
export class ExportButtonComponent {
    @Input() public fileName: string;

    constructor(private tbGrid: GridComponent) { }

    public downloadCsv() {
        this.tbGrid.getFullDataSource()
            .subscribe((data: any) => {
                this.processCsv(data.Payload);
            });
    }

    public downloadAllCsv() {
        this.tbGrid.getFullDataSource()
            .subscribe((data: any) => {
                this.processCsv(data.Payload);
            });
    }

    private processCsv(data) {
        let headers = this.tbGrid.columns.getValue().reduce((a, b) => a + b.label + ',', '').slice(0, -1) + '\r\n';
        let rows = data.map((row) => row.reduce((a, b) => a + '"' + b + '"' + ',', '').slice(0, -1) + '\r\n');
        let csv = rows.reduce((a, b) => a + b, headers);

        let blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        // TODO: Complete: http://stackoverflow.com/questions/34177221/angular2-how-to-inject-window-into-an-angular2-service
        //saveAs(blob, this.fileName);
    }
}
