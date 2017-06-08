import { Component, Input, Inject } from '@angular/core';
import { GridComponent } from './grid.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Component({
    selector: 'tb-grid-export',
    template: `
    <div>
        <button md-button [mdMenuTriggerFor]="menu">
            <md-icon>file_download</md-icon>&nbsp;Export CSV
        </button>
        <md-menu #menu="mdMenu">
            <button md-menu-item (click)="downloadCsv()">Current rows</button>
            <button md-menu-item (click)="downloadAllCsv()">All rows</button>
        </md-menu>
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
