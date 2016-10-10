import { Component } from '@angular/core';
import { TubularGrid } from './grid.component';

@Component({
    selector: 'grid-print',
    template: `<button class="btn btn-info btn-sm" (click)="print()">
                <span class="fa fa-print"></span>&nbsp;PRINT</button>`
})
export class PrintButton {
    constructor(private tbGrid: TubularGrid) { }

    print() {
        this.tbGrid.getFullDataSource(
            data => {
                let headers = this.tbGrid.columns.getValue().reduce((a, b) => {
                    return a + '<th>' + b.label + '</th>'
                }, '');
                let rows = data.map(row => {
                    if (typeof (row) === 'object') {
                        return '<tr>' + row.reduce((a, b) => {
                            return a + '<td>' + b + '</td>'
                        }, '') + '</tr>';
                    }
                });

                let tableHtml = '<table class="table table-bprdered table-striped"><thead><tr>'
                    + headers
                    + '</tr></thead><tbody>'
                    + rows.join("")
                    + '</tbody></table>'

                var popup = window.open("", "", "menubar=0,location=0,height=500,width=800");
                popup.document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
                popup.document.write('<body onload="window.print();">');
                popup.document.write(tableHtml);
                popup.document.write('</body>');
                popup.document.close();
            });
    }
}