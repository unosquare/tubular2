import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GridComponent } from './grid.component';

import 'rxjs/add/operator/map';

@Component({
    selector: 'tb-grid-print',
    template:
    `<button class="btn btn-info btn-sm" (click)="print()">
        <span class="fa fa-print"></span>&nbsp;Print
    </button>`
})
export class PrintButtonComponent {
    constructor(private tbGrid: GridComponent) { }

    public print() {
        this.tbGrid.getFullDataSource()
            .subscribe((data: any) => {
                let headers = this.tbGrid.columns.getValue().reduce(
                    (a, b) => a + '<th>' + b.label + '</th>', '');
                let rows = data.Payload.reduce(
                    (prev, row) => prev + '<tr>' +
                        row.reduce((a, b) => a + '<td>' + b + '</td>', '') + '</tr>', '');

                let tableHtml =
                    `<table class="table table-sm table-striped">
                    <thead><tr>${headers}</tr></thead><tbody>${rows}</tbody>
                </table>`;

                let popup = window.open('', '', 'menubar=0,location=0,height=500,width=800');
                popup.document.write('<link rel="stylesheet" ' +
                    'href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
                popup.document.write('<body onload="window.print();">');
                popup.document.write(tableHtml);
                popup.document.write('</body>');
                popup.document.close();
            });
    }
}
