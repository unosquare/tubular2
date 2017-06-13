import { Component } from '@angular/core';
import { RequestOptions } from '@angular/http';

import { MdDialog } from '@angular/material';

import { OrderComponent } from './order.component';

@Component({
    selector: 'my-tbGrid',
    templateUrl: '/app/main-grid.component.html'
})
export class MainGridComponent {
    public newOrderModalRef;

    public pagerShowEllipses = true;
    public pagerBoundaryLinks = false;

    constructor(public dialog: MdDialog) {
    }

    errorHandler(error: any) {
        console.log(error);
    }

    add() {
        const modalRef = this.dialog.open(OrderComponent);
        modalRef.componentInstance.name = 'Add new';
        modalRef.componentInstance.isNew = true;
    }

    beforeRequest(requestOptions: RequestOptions) {
        // Do something before the request is sent
    }
}
