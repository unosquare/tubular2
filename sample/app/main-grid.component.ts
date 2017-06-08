import { Component } from '@angular/core';
import { RequestOptions } from '@angular/http';


import { OrderComponent } from './order.component';

@Component({
    selector: 'my-tbGrid',
    templateUrl: '/app/main-grid.component.html'
})
export class MainGridComponent {
    public newOrderModalRef;

    constructor() {
    }

    errorHandler(error: any) {
        console.log(error);
    }

    openDialog(content: string) {
        // TODO: Change to Material
        //this.newOrderModalRef = this.modalService.open(content);
    }

    add() {
        // TODO: Change to Material
        //const modalRef = this.modalService.open(OrderComponent);
        //modalRef.componentInstance.name = 'Add new';
        //modalRef.componentInstance.isNew = true;
    }

    beforeRequest(requestOptions: RequestOptions) {
        // Do something before the request is sent
    }
}
