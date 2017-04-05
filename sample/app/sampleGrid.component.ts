import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent, GridTable, ColumnModel, ColumnFilterMode, DataType } from '@tubular2/tubular2';
import { OrderComponent } from './order.component';

@Component({
    selector: 'my-grid',
    templateUrl: '/app/sampleGrid.component.html'
})
export class SampleGrid extends GridTable {
    public editModalRef;

    constructor(public tbGrid: GridComponent, private modalService: NgbModal, private router: Router) {
        super(tbGrid);

        let orderIdColumn = new ColumnModel('OrderID', false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        let customerColumn = new ColumnModel('CustomerName');
        customerColumn.filterMode = ColumnFilterMode.String;

        let dateColumn = new ColumnModel('ShippedDate', false);
        dateColumn.filterMode = ColumnFilterMode.DateTime;
        dateColumn.dataType = DataType.DateTime;

        let creationDate = new ColumnModel('CreationDate', false);
        creationDate.filterMode = ColumnFilterMode.Date;
        creationDate.dataType = DataType.Date;

        let cityColumn = new ColumnModel('ShipperCity');
        cityColumn.filterMode = ColumnFilterMode.String;

        this.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }

    closeResult: string;

    // open(content) {
    //     this.modalService.open(content).result.then((result) => {
    //         this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    // }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }

    edit(row) {
        const modalRef = this.modalService.open(OrderComponent);
        modalRef.componentInstance.name = 'World';
        modalRef.componentInstance.model = row;
    }

    details(row) {
        this.router.navigate(['/form', row.OrderID]);
    }
}
