import { Component } from '@angular/core';
import { TubularGrid } from './grid.component';

@Component({
    selector: 'grid-print',
    template: `<button class="btn btn-info btn-sm" (click)="printGrid()">
                <span class="fa fa-print"></span>&nbsp;PRINT</button>`
})
export class PrintButton {
    constructor(private tbGrid: TubularGrid) { }

    printGrid() {
        this.tbGrid.getFullDataSource(
            data => {
                // TODO: Change map to reduce
                let headers = this.tbGrid.columns.getValue().map(c => { return '<th>' + c.name + '</th>' });
                let rows = data.map(row => {
                    if (typeof (row) === 'object') {
                        return '<tr>' + row.map(function (cell, index) {
                            return '<td>' + row[index] + '</td>'
                        });
                    }
                });

                let tableHtml = '<table class="table table-bprdered table-striped"><thead><tr>'
                    + headers.join('')
                    + '</tr></thead><tbody>'
                    + rows.join('');
                    + '</tbody></table>'

                var popup = window.open("", "", "menubar=0,location=0,height=500,width=800");
                popup.document.write('<link rel="stylesheet" href="scripts/lib/bootstrap/css/bootstrap.min.css" />');
                popup.document.write('<body onload="window.print();">');
                popup.document.write(tableHtml);
                popup.document.write('</body>');
                popup.document.close();
            });
    }
}