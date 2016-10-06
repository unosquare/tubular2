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
                var tableHtml = '<table class="table table-bprdered table-striped"><thead><tr>'
                    + this.tbGrid.columns.forEach(c => { return '<th>' + c.values.name + '</th>' })
                    + '</tr></thead>'
                    + data.map(row => {
                        if (typeof (row) === 'object') {
                            row = Object.keys(row).map(key => { return row.key });
                        }
                        return '<tr>' + row.map(function (cell, index) {
                        })
                    });
                var popup = window.open("about:blank", "Print", "menubar=0,location=0,height=500,width=800");
                popup.document.write('<link rel="stylesheet" href="scripts/lib/bootstrap/css/bootstrap.min.css" />');
                popup.document.write('<body onload="window.print();">');
                popup.document.write(tableHtml);
                popup.document.write('</body>');
                popup.document.close();
            });
    }
}