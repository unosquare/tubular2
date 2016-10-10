import { Component, Input} from '@angular/core';

import { TubularGrid, GridTable, ColumnModel, ColumnFilterMode } from '../tubular';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html'
})

export class SampleGrid extends GridTable {

    constructor(public tbGrid: TubularGrid) {
        super(tbGrid);

        let orderIdColumn = new ColumnModel("OrderID", false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        let customerColumn = new ColumnModel("CustomerName");
        customerColumn.filterMode = ColumnFilterMode.String;

        let dateColumn = new ColumnModel("ShippedDate", false);
        dateColumn.filterMode = ColumnFilterMode.Date;

        let cityColumn = new ColumnModel("ShipperCity");
        cityColumn.filterMode = ColumnFilterMode.String;
        
        this.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            cityColumn
        ]);
    }
    
    onUpdate(row) {
        console.log("SampleGrid Update", row);
        this.tbGrid.onUpdate(row);
    }

    onDismiss(reason) {
        console.log("SampleGrid Dismiss", reason);
    }

}