import { Component, ContentChild, ViewChild, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { OrderComponent } from './order.component';

import {  ColumnDataType, ColumnModel } from 'tubular-common';
import { GridComponent, ColumnFilter } from 'tubular2';

@Component({
    selector: 'my-tbGrid',
    templateUrl: './main-grid.component.html'
})
export class MainGridComponent implements OnInit {

    public newOrderModalRef;

    @ViewChild('grid') tbGrid: GridComponent;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
        console.log('on init');
        const orderIdColumn = new ColumnModel('OrderID');
        orderIdColumn.Filter = new ColumnFilter();

        const customerColumn = new ColumnModel('CustomerName');
        customerColumn.Filter = new ColumnFilter();

        const dateColumn = new ColumnModel('ShippedDate');
        dateColumn.Filter = new ColumnFilter();
        dateColumn.DataType = ColumnDataType.DATE_TIME;

        const creationDate = new ColumnModel('CreationDate');
        creationDate.Filter = new ColumnFilter();
        creationDate.DataType = ColumnDataType.DATE;

        const cityColumn = new ColumnModel('ShipperCity');
        cityColumn.Filter = new ColumnFilter();

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
