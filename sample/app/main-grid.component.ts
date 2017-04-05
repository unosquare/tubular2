import { Component } from '@angular/core';
import { OrderComponent } from './order.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-tbGrid',
    templateUrl: '/app/main-grid.component.html'
})
export class MainGridComponent {
    public newOrderModalRef;

    constructor(private modalService: NgbModal) {
    }

    errorHandler(error: any) {
        console.log(error);
    }

    openDialog(content: string) {
        this.newOrderModalRef = this.modalService.open(content);
    }

    add() {
        const modalRef = this.modalService.open(OrderComponent);
        modalRef.componentInstance.name = 'Add new';
        modalRef.componentInstance.isNew = true;
    }
}
