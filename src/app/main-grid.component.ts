import { Component, EventEmitter, Input, Output, ContentChild, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrderComponent } from './order.component';
import { ColumnDataType, ColumnModel } from 'tubular-common';
import { GridComponent } from 'tubular2';

@Component({
    selector: 'app-grid',
    templateUrl: './main-grid.component.html'
})
export class MainGridComponent implements OnInit {

    public newOrderModalRef;
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

    // Change the state of the popovers - OMIT
    togglePopovers(control: number) {
        switch (control) {
            case 0: {
                this.orderFilterDialogOpen = true;
                this.customerFilterDialogOpen = false;
                console.log(
                    `Turned on order's filter
                Turned off customer's filter.`
                );
                break;
            }

            case 1: {
                this.orderFilterDialogOpen = false;
                this.customerFilterDialogOpen = true;
                console.log(
                    `Turned on customer's filter
                Turned off order's filter.`
                );
                break;
            }

            default: {
                this.orderFilterDialogOpen = false;
                this.customerFilterDialogOpen = false;
                break;
            }
        }
    }
}
