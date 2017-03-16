import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
}
