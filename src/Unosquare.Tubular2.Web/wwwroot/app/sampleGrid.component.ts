import { Component, Input } from '@angular/core';

import { TubularGrid, GridTable, ColumnModel, ColumnFilterMode } from '../tubular';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html'
})
export class SampleGrid extends GridTable {
    constructor(private tbGrid: TubularGrid) {
        super(tbGrid);
        
        let customerColumn = new ColumnModel("CustomerName");
        customerColumn.filterMode = ColumnFilterMode.String;

        let cityColumn = new ColumnModel("ShipperCity");
        cityColumn.filterMode = ColumnFilterMode.String;

        this.addColumns([
            new ColumnModel("OrderID", false, true),
            customerColumn,
            new ColumnModel("ShippedDate", false, false ),
            cityColumn
        ]);
    }
}