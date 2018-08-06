import { Component, ContentChild, ViewChild, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { OrderComponent } from './order.component';

import { GridComponent, ColumnFilterMode, ColumnDataType, ColumnModel } from 'tubular2';

@Component({
    selector: 'app-grid',
    templateUrl: './main-grid.component.html'
})
export class MainGridComponent implements OnInit {

    public newOrderModalRef;

    @ViewChild('grid') tbGrid: GridComponent;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
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

        this.tbGrid.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }

    errorHandler(error: any) {
        console.log(error);
    }

    add() {
        const modalRef = this.dialog.open(OrderComponent);
        modalRef.componentInstance.name = 'Add new';
        modalRef.componentInstance.isNew = true;
    }
}
