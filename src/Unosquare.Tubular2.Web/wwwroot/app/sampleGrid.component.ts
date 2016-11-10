import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TubularGrid, GridTable, ColumnModel, ColumnFilterMode, DataType } from '@tubular2/tubular2';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html'
})
export class SampleGrid extends GridTable {
    public editModalRef;

    constructor(public tbGrid: TubularGrid, private modalService: NgbModal, private router: Router) {
        super(tbGrid);

        let orderIdColumn = new ColumnModel("OrderID", false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        let customerColumn = new ColumnModel("CustomerName");
        customerColumn.filterMode = ColumnFilterMode.String;

        let dateColumn = new ColumnModel("ShippedDate", false);
        dateColumn.filterMode = ColumnFilterMode.Date;
        dateColumn.dataType = DataType.Date;

        let creationDate = new ColumnModel("CreationDate", false);
        creationDate.filterMode = ColumnFilterMode.DateTime;
        creationDate.dataType = DataType.Date;

        let cityColumn = new ColumnModel("ShipperCity");
        cityColumn.filterMode = ColumnFilterMode.String;

        this.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }

    editRow(content) {
        this.editModalRef = this.modalService.open(content);
    }

    details(row) {
        this.router.navigate(['/form', row.OrderID ]);
    }
}