import { Component, Input} from '@angular/core';

import { TubularGrid, GridTable, ColumnModel, ColumnFilterMode } from '../tubular';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html'
})

export class SampleGrid extends GridTable {

    constructor(private tbGrid: TubularGrid) {
        super(tbGrid);
        let orderIdColumn = new ColumnModel("OrderID");
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        let customerColumn = new ColumnModel("CustomerName");
        customerColumn.filterMode = ColumnFilterMode.String;

        let dateColumn = new ColumnModel("ShippedDate");
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
}