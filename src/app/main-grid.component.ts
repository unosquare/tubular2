import { Component, EventEmitter, Input, Output, ContentChild, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrderComponent } from './order.component';
import { ColumnModel } from 'tubular-common';
import { GridComponent } from '../../projects/tubular2/src/public_api';

@Component({
    selector: 'app-grid',
    templateUrl: './main-grid.component.html'
})
export class MainGridComponent implements OnInit {

    public newOrderModalRef: any;
    public orderFilterDialogOpen: boolean;
    public customerFilterDialogOpen: boolean;

    @ViewChild('grid') tbGrid: GridComponent;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.orderFilterDialogOpen = false;
        this.customerFilterDialogOpen = false;

        this.tbGrid.addColumns([
            new ColumnModel('OrderID'),
            new ColumnModel('CustomerName'),
            new ColumnModel('ShippedDate'),
            new ColumnModel('CreationDate'),
            new ColumnModel('ShipperCity')
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
