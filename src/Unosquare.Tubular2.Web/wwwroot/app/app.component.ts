import { Component, ViewChild } from '@angular/core';
import { TubularGrid } from '@tubular2/tubular2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html'
})
export class AppComponent {
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