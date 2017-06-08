import { Component, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog } from '@angular/material';

import { GridComponent, GridTable, ColumnModel, ColumnFilterMode, DataType } from '@tubular2/tubular2';
import { OrderComponent } from './order.component';

@Component({
    selector: 'my-grid',
    templateUrl: '/app/sampleGrid.component.html'
})
export class SampleGrid extends GridTable {
    public editModalRef;

    constructor(public tbGrid: GridComponent, public dialog: MdDialog, private router: Router) {
        super(tbGrid);

        let orderIdColumn = new ColumnModel('OrderID', false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        let customerColumn = new ColumnModel('CustomerName');
        customerColumn.filterMode = ColumnFilterMode.String;

        let dateColumn = new ColumnModel('ShippedDate', false);
        dateColumn.filterMode = ColumnFilterMode.DateTime;
        dateColumn.dataType = DataType.DateTime;

        let creationDate = new ColumnModel('CreationDate', false);
        creationDate.filterMode = ColumnFilterMode.Date;
        creationDate.dataType = DataType.Date;

        let cityColumn = new ColumnModel('ShipperCity');
        cityColumn.filterMode = ColumnFilterMode.String;

        this.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }

    edit(row) {
        const modalRef = this.dialog.open(OrderComponent);
        modalRef.componentInstance.name = 'World';
        modalRef.componentInstance.model = row;
    }

    details(row) {
        this.router.navigate(['/form', row.OrderID]);
    }
}