import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog } from '@angular/material';

import { GridComponent, GridTable, ColumnModel, ColumnFilterMode, ColumnDataType, TubularDataSource } from '@tubular2/tubular2';
import { OrderComponent } from './order.component';

@Component({
    selector: 'my-grid',
    templateUrl: '/app/sampleGrid.component.html'
})
export class SampleGrid extends GridTable {
    public editModalRef;

    constructor(public tbGrid: GridComponent, public dialog: MdDialog, private router: Router) {
        super(tbGrid);

        const orderIdColumn = new ColumnModel('OrderID', false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        const customerColumn = new ColumnModel('CustomerName');
        customerColumn.filterMode = ColumnFilterMode.String;

        const dateColumn = new ColumnModel('ShippedDate', false);
        dateColumn.filterMode = ColumnFilterMode.DateTime;
        dateColumn.dataType = ColumnDataType.DateTime;

        const creationDate = new ColumnModel('CreationDate', false);
        creationDate.filterMode = ColumnFilterMode.Date;
        creationDate.dataType = ColumnDataType.Date;

        const cityColumn = new ColumnModel('ShipperCity');
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
